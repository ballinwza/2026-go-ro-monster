package monster

type Monster struct {
	Name          string  `json:"name"`
	Image         *string `json:"image,omitempty" bson:"image,omitempty"`
	Level         *int    `json:"level,omitempty" bson:"level,omitempty"`
	HitPoint      *int    `json:"hitPoint,omitempty" bson:"hitPoint,omitempty"`
	JobExperiance *int    `json:"jobExperiance,omitempty" bson:"jobExperiance,omitempty"`
	Experiance    *int    `json:"experiance,omitempty" bson:"experiance,omitempty"`
	Flee          *int    `json:"flee,omitempty" bson:"flee,omitempty"`
	Hit           *int    `json:"hit,omitempty" bson:"hit,omitempty"`
	Race          *string `json:"race,omitempty" bson:"race,omitempty"`
	Property      *string `json:"property,omitempty" bson:"property,omitempty"`
	Size          *string `json:"size,omitempty" bson:"size,omitempty"`
	MinAtk        *int    `json:"minAtk,omitempty" bson:"minAtk,omitempty"`
	MaxAtk        *int    `json:"maxAtk,omitempty" bson:"maxAtk,omitempty"`
	Def           *int    `json:"def,omitempty" bson:"def,omitempty"`
	Mdef          *int    `json:"mdef,omitempty" bson:"mdef,omitempty"`
}

type MonsterSortField string

const (
	Name          MonsterSortField = "name"
	Level         MonsterSortField = "level"
	Size          MonsterSortField = "size"
	Experiance    MonsterSortField = "experiance"
	JobExperiance MonsterSortField = "jobExperiance"
	Race          MonsterSortField = "race"
	Property      MonsterSortField = "property"
)
