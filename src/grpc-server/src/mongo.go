// Copyright (c) 2018 Robert Reyna. All rights reserved.
// License BSD 3-Clause https://github.com/robscodebase/technicianrouteplanner/blob/master/LICENSE.md

package main

import (
	"log"

	mgo "gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
)

type DB struct {
	Server   string
	Database string
}

var db *mgo.Database


// Establish a connection to database
func (m *DB) newMongoDB() {
	session, err := mgo.Dial(m.Server)
	if err != nil {
		log.Fatal(err)
	}
	db = session.DB(m.Database)
}

// listPoints from database.
func (m *DB) listPoints() ([]Point, error) {
	var points []Point
	err := db.C("points").Find(bson.M{}).All(&points)
	return points, err
}


// Insert a point into database.
func (m *DB) insertPoint(point Point) error {
	err := db.C("points").Insert(&point)
	return err
}
