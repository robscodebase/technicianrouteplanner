// Copyright (c) 2018 Robert Reyna. All rights reserved.
// License BSD 3-Clause https://github.com/robscodebase/eventplanner/blob/master/LICENSE.md

package main

import (
	"database/sql"
	"html/template"
	"log"
	"net/http"

	_ "github.com/go-sql-driver/mysql"
	"github.com/gorilla/mux"
)

// dbLogin contains the credentials and connection data
// for the mysql db.
// db is the global db variable.
var dbLogIn = "root:insecure@(mysql-event-planner:3306)/mysql"
var db *sql.DB
var testingSession bool

func main() {
	// Activate routing handlers and serve http.
	log.Println("Listening on port 8080")
	log.Fatal(http.ListenAndServe(":8080", runHandlers()))
}

// runHandlers() activates routing handlers for each page
// and actions completed on each page and form.
func runHandlers() http.Handler {
	sLog("main.go: main(): runHandlers()")
	r := mux.NewRouter()
	r.Handle("/", http.RedirectHandler("/home", http.StatusFound))

	// Get methods.
	r.HandleFunc("/home", technicianRoutePageHandler)

	// set different server path for development testing.
	//FileServerPath := "/go/src/technicianrouteplanner/src/file-server/templates"
	FileServerPath := "/home/robert/gocode/src/robert/technicianrouteplanner/src/file-server/templates"
	r.PathPrefix("/").Handler(http.FileServer(http.Dir(FileServerPath)))

	return r
}

func technicianRoutePageHandler(w http.ResponseWriter, r *http.Request) {
	t, err := template.New("foo").Parse(`{{define "T"}}<title>Technician Route Planner</title>Hello, {{.}}!{{end}}`)
	err = t.ExecuteTemplate(w, "T", "Technician")
	if err != nil {
		log.Fatalf("main.go: technicianRoutePageHandler(): ExecuteTemplate(): error: %v", err)
	}
}
