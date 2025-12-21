package monster

import (
	"context"
	"errors"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

type Repository interface {
	Create(ctx context.Context, monsters []*Monster) error
	GetAll(ctx context.Context) ([]*Monster, error)
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

	return nil
}

func (r *mongoRepository) GetAll(ctx context.Context) ([]*Monster, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()

	cur, err := r.db.Find(ctx, bson.D{})
	if err != nil {
		return nil, err
	}
	defer cur.Close(ctx)

	monsters := []*Monster{}
	for cur.Next(ctx) {
		var result *Monster
		err := cur.Decode(&result)
		if err != nil {

		}

		monsters = append(monsters, result)
	}

	return monsters, nil
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
