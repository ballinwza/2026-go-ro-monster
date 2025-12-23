package monster

import (
	"context"
	"errors"
	"net/http"
	"strconv"

	"strings"

	"github.com/PuerkitoBio/goquery"
)

type Service interface {
	Scrapping() ([]*Monster, error)
	GetAll(ctx context.Context, page, limit int, name *string, sortBy *MonsterSortField, order *int) ([]*Monster, int64, error)
}

type monsterService struct {
	repo Repository
}

func NewService(r Repository) Service {
	return &monsterService{
		repo: r,
	}
}

func (s *monsterService) Scrapping() ([]*Monster, error) {

	res, err := http.Get("https://roc.gnjoy.in.th/monster/details/")
	if err != nil {
		return nil, errors.New("Failed connected!")
	}
	defer res.Body.Close()

	doc, err := goquery.NewDocumentFromReader(res.Body)
	if err != nil {
		return nil, errors.New("Failed collecting data!")
	}

	var newList []*Monster

	doc.Find(".entry-content > div").Each(func(i int, s *goquery.Selection) {
		monster := Monster{}

		monster.Name = strings.TrimSpace(s.Find("figcaption").Text())
		if monster.Name == "" {
			return
		}

		image := s.Find("img").AttrOr("src", "")
		monster.Image = &image

		tds := s.Find("td")

		level, _ := strconv.Atoi(tds.Eq(0).Text())
		monster.Level = &level

		hp, _ := strconv.Atoi(tds.Eq(1).Text())
		monster.HitPoint = &hp

		exp, _ := strconv.Atoi(tds.Eq(2).Text())
		monster.Experiance = &exp

		jobExp, _ := strconv.Atoi(tds.Eq(3).Text())
		monster.JobExperiance = &jobExp

		flee, _ := strconv.Atoi(tds.Eq(4).Text())
		monster.Flee = &flee

		hit, _ := strconv.Atoi(tds.Eq(5).Text())
		monster.Hit = &hit

		race := tds.Eq(6).Text()
		monster.Race = &race

		property := tds.Eq(7).Text()
		monster.Property = &property

		size := tds.Eq(8).Text()
		monster.Size = &size

		atkRange := tds.Eq(9).Text()
		atks := strings.Split(atkRange, " – ")
		if len(atks) == 2 {
			minAtk, _ := strconv.Atoi(strings.TrimSpace(atks[0]))
			maxAtk, _ := strconv.Atoi(strings.TrimSpace(atks[1]))

			monster.MinAtk = &minAtk
			monster.MaxAtk = &maxAtk
		}

		def, _ := strconv.Atoi(tds.Eq(10).Text())
		monster.Def = &def

		mdef, _ := strconv.Atoi(tds.Eq(11).Text())
		monster.Mdef = &mdef

		newList = append(newList, &monster)
	})

	err = s.repo.Create(context.Background(), newList)
	if err != nil {
		return nil, err
	}

	return newList, nil
}

func (s *monsterService) GetAll(ctx context.Context, page, limit int, name *string, sortBy *MonsterSortField, order *int) ([]*Monster, int64, error) {
	finalSortBy := MonsterSortField("level")
	if sortBy != nil {
		switch *sortBy {
		case Name, Level, Size, Experiance, JobExperiance, Race, Property:
			finalSortBy = *sortBy
		default:
			finalSortBy = MonsterSortField("level")
		}
	}
	if order == nil || (*order != 1 && *order != -1) {
		defaultOrder := 1
		order = &defaultOrder
	}

	monsters, total, err := s.repo.GetAll(ctx, page, limit, *order, finalSortBy, name)
	if err != nil {
		return nil, 0, err
	}
	return monsters, total, nil
}
