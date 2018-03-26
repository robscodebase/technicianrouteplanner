// Copyright (c) 2018 Robert Reyna. All rights reserved.
// License BSD 3-Clause https://github.com/robscodebase/technicianrouteplanner/blob/master/LICENSE.md

package main

import (
	"fmt"
	"io/ioutil"
	"log"
	"net/http"

	"github.com/gorilla/mux"
)


func main() {
	log.Println("main.go: main()")
	// Activate routing handlers and serve http.
	log.Println("Listening on port 8080")
	log.Fatal(http.ListenAndServe(":8080", runHandlers()))
}

// runHandlers() activates routing handlers for each page
// and actions completed on each page and form.
func runHandlers() http.Handler {
	log.Println("main.go: runHandlers()")
	r := mux.NewRouter()

	// Get methods.
	r.HandleFunc("/grpc-build", serveGRPC)

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
