// Copyright (c) 2018 Robert Reyna. All rights reserved.
// License BSD 3-Clause https://github.com/robscodebase/eventplanner/blob/master/LICENSE.md

package main

import (
	"database/sql"
	"fmt"
	_ "github.com/go-sql-driver/mysql"
	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	"log"
	"net/http"
	"os"
	"strconv"
	"time"
)

// dbLogin contains the credentials and connection data
// for the mysql db.
// db is the global db variable.
var dbLogIn = "root:insecure@(mysql-event-planner:3306)/mysql"
var db *sql.DB
var testingSession bool

func main() {
	// Activate routing handlers and serve http.
	log.Println("Listening on port 8081")
	log.Fatal(http.ListenAndServe(":8081", runHandlers()))
}

// Template page variables viewEvents, addEvent, editEvent
// login and register link the html module for that pages
// body and returns a complete html page with header and footer.
var (
	viewEvents = compileTemplate("home.html")
)

// runHandlers() activates routing handlers for each page
// and actions completed on each page and form.
func runHandlers() http.Handler {
	sLog("main.go: main(): runHandlers(): running handlers.")
	r := mux.NewRouter()
	r.Handle("/", http.RedirectHandler("/home", http.StatusFound))

	// Get methods.
	r.Methods("GET").Path("/home").
		Handler(errorCheck(homeHandler))

	// set different server path for development testing.
	FileServerPath := "/go/src/eventplanner/src/server/templates"
	//FileServerPath := "/home/robert/gocode/src/robert/eventplanner/src/server/templates"
	r.PathPrefix("/").Handler(http.FileServer(http.Dir(FileServerPath)))

	http.Handle("/", handlers.CombinedLoggingHandler(os.Stderr, r))

	return r
}


// ServeHTTP() ensures there are no errors before serving the HTML data.
func (errCheck errorCheck) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	if errcheck := errCheck(w, r); errcheck != nil {
		sLog(fmt.Sprintf("main.go: ServeHTTP(): error: status code: %d, message: %s, error: %#v", errcheck.Code, errcheck.Message, errcheck.Error))
		http.Error(w, errcheck.Message, errcheck.Code)
	}
}
