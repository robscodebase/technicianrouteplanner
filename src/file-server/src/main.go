// Copyright (c) 2018 Robert Reyna. All rights reserved.
// License BSD 3-Clause https://github.com/robscodebase/eventplanner/blob/master/LICENSE.md

package main

import (
	"database/sql"
	"fmt"
	"html/template"
	"io/ioutil"
	"log"
	"net/http"

	_ "github.com/go-sql-driver/mysql"
	"github.com/gorilla/mux"
)

// dbLogin contains the credentials and connection data
// for the mysql db.
// db is the global db variable.
var dbLogIn = "root:insecure@(mysql-technician-route-planner:3306)/mysql"
var db *sql.DB
var testingSession bool

func main() {
	sLog("main.go: main()")
	//session, err := initMongo()
	//defer session.Close()
	//session.SetMode(mgo.Monotonic, true)
	//if err = ensureIndex(session); err != nil {
	//log.Fatalf("main.go: main(): ensureIndex(): error: %v", err)
	//}
	// Activate routing handlers and serve http.
	log.Println("Listening on port 8080")
	log.Fatal(http.ListenAndServe(":8080", runHandlers()))
}

//func initMongo() (*mgo.Session, error) {
//sLog("main.go: initMongo()")
//mongo, err := mgo.Dial("localhost")
//if err != nil {
//return nil, fmt.Errorf("main.go: initMongo(): error: %v", err)
//}
//return mongo, nil
//}

// runHandlers() activates routing handlers for each page
// and actions completed on each page and form.
func runHandlers() http.Handler {
	sLog("main.go: runHandlers()")
	r := mux.NewRouter()

	// Get methods.
	r.HandleFunc("/home", home)
	r.HandleFunc("/grpc-build", serveGRPC)
	//r.HandleFunc("/home", technicianRoutePageHandler)

	// set different server path for development testing.
	fileServerPath := "/go/src/technicianrouteplanner/src/templates"
	r.PathPrefix("/").Handler(http.FileServer(http.Dir(fileServerPath)))
	return r
}

func serveGRPC(w http.ResponseWriter, r *http.Request) {
	grpcFilePath := "/go/src/technicianrouteplanner/src/grpc-build/grpc-client.js"
	grpcClient, err := ioutil.ReadFile(grpcFilePath)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Fprintf(w, "%s", string(grpcClient))
}

func home(w http.ResponseWriter, r *http.Request) {
	sLog("main.go: home()")
	t, err := template.New("foo").Parse(`{{define "T"}}Hello, {{.}}!{{end}}`)
	err = t.ExecuteTemplate(w, "T", "you have been pwned")
	if err != nil {
		log.Println("main.go: home(): error:", err)
	}
}

//
//type Book struct{}
//
//func technicianRoutePageHandler(w http.ResponseWriter, r *http.Request) {
//session := s.Copy()
//defer session.Close()
//
//c := session.DB("store").C("books")
//
//var books []Book
//err := c.Find(bson.M{}).All(&books)
//if err != nil {
//ErrorWithJSON(w, "Database error", http.StatusInternalServerError)
//log.Println("Failed get all books: ", err)
//return
//}
//
//respBody, err := json.MarshalIndent(books, "", "  ")
//if err != nil {
//log.Fatal(err)
//}
//
//ResponseWithJSON(w, respBody, http.StatusOK)
//t, err := template.New("foo").Parse(`{{define "T"}}<title>Technician Route Planner</title>Hello, {{.}}!{{end}}`)
//err = t.ExecuteTemplate(w, "T", "Technician")
//if err != nil {
//log.Fatalf("main.go: technicianRoutePageHandler(): ExecuteTemplate(): error: %v", err)
//}
//}
