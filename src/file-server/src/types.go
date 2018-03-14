// Copyright (c) 2018 Robert Reyna. All rights reserved.
// License BSD 3-Clause https://github.com/robscodebase/eventplanner/blob/master/LICENSE.md
// types.go contains most of the structs and types encountered in the program including.
package main

import (
	"net/http"
)

type User struct {
	ID            int64
	Username      string
	Secret        []byte
}

type PageData struct {
	Route
	User
}

type Route struct {
	ID          int64
	Stops []RouteStops
	Technician
}

type Technician struct {
	ID int64
	Name string
}

type RouteStops struct {
	ID int64
	Name string
	Address string
	Lng float64
	Lat float64
}

type Point struct {
	Lng float64
	Lat float64
}

type Bounds struct {
	Points []Point
}
