package monster

import (
	"context"
	"errors"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type Repository interface {
	Create(ctx context.Context, monsters []*Monster) error
	GetAll(ctx context.Context, page, limit int, name *string) ([]*Monster, int64, error)
}

type mongoRepository struct {
	db *mongo.Collection
}

func NewRepository(db *mongo.Database) Repository {
	return &mongoRepository{
		db: db.Collection("monsters"),
	}
}

func (r *mongoRepository) Create(ctx context.Context, monsters []*Monster) error {
	if len(monsters) == 0 {
		return errors.New("Can't inserting empty monster")
	}

	docs := checkingEmpty(monsters)
	if len(docs) == 0 {
		return errors.New("Can't inserting empty monster")
	}

	_, err := r.db.InsertMany(ctx, docs)
	if err != nil {
		return err
	}

	indexModel := mongo.IndexModel{Keys: bson.D{{Key: "name", Value: 1}}}
	r.db.Indexes().CreateOne(ctx, indexModel)

	return nil
}

func (r *mongoRepository) GetAll(ctx context.Context, page, limit int, name *string) ([]*Monster, int64, error) {
	skip := int64((page - 1) * limit)
	l := int64(limit)
	filter := bson.D{}

	if name != nil && *name != "" {
		filter = bson.D{{Key: "name", Value: bson.M{"$regex": &name, "$options": "i"}}}
	}

	opts := options.Find().SetLimit(l).SetSkip(skip).SetSort(bson.D{{Key: "level", Value: 1}, {Key: "hitPoint", Value: 1}})
	cur, err := r.db.Find(ctx, filter, opts)
	if err != nil {
		return nil, 0, err
	}
	defer cur.Close(ctx)

	monsters := []*Monster{}
	if err := cur.All(ctx, &monsters); err != nil {
		return nil, 0, err
	}

	total, err := r.db.CountDocuments(ctx, filter)
	if err != nil {
		return nil, 0, err
	}
	return monsters, total, nil
}

func checkingEmpty(monsters []*Monster) []interface{} {
	var docs []interface{}
	for _, m := range monsters {
		if m != nil {
			docs = append(docs, m)
		}
	}
	return docs
}
