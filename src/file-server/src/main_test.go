// Copyright (c) 2018 Robert Reyna. All rights reserved.
// License BSD 3-Clause https://github.com/robscodebase/technicianrouteplanner/blob/master/LICENSE.md

package main

import (
	"bytes"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"
)

// funcTestRunHandlers checks that the handler is
// operational. It checks if the title matches.
func TestRunHandlers(t *testing.T) {
	var server = httptest.NewServer(runHandlers())
	defer server.Close()
	testHandlerTable := []struct {
		pageName  string
		pageTitle string
	}{
		{pageName: "/", pageTitle: "<title>Technician Route Planner</title>"},
	}
	for _, v := range testHandlerTable {
		response := testGetHTTP(server, v.pageName)
		responseString := string(bytes.TrimSpace(testReadBody(response)))
		if responseString == "404 page not found" {
			log.Printf("main_test.go: TestRunHandlers(): testGetHTTP(): pageName: %v: want; body: got; %v", v.pageName, responseString)
		} else if strings.Contains(responseString, v.pageTitle) != true {
			log.Printf("main_test.go: TestRunHandlers(): pageName: %v, responseString error: want %v; got %v", v.pageName, v.pageTitle, responseString)
		}
	}
}

// testReadBody() takes a response and returns
// the body in string format.
func testReadBody(response *http.Response) []byte {
	body, err := ioutil.ReadAll(response.Body)
	if err != nil {
		log.Println("main_test.go: testReadBody(): ioutil.ReadAll: error: %v", err)
	}
	return body
}

// testGetHTTP() takes a server and a url name
// and returns an *http.Response.
func testGetHTTP(server *httptest.Server, request string) *http.Response {
	response, err := http.Get(fmt.Sprintf("%s/%s", server.URL, request))
	if err != nil {
		log.Fatalf("main_test.go: TestGetHTTP(): http.Get() error: %v", err)
	}
	return response
}
