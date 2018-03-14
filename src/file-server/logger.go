// Copyright (c) 2018 Robert Reyna. All rights reserved.
// License BSD 3-Clause https://github.com/robscodebase/eventplanner/blob/master/LICENSE.md
// logger.go contains variables and functions for turning logging on and off for certain
// actions.  Currently, server and db log control logging for respective functions.
package main

import (
	"log"
)

// If the toggles are set to true logging will be displayed
// in docker logs.
var serverLogToggle = false
var dbLogToggle = false

// sLog() controls the logging mechanism for functions that rely on the server.
func sLog(s string) {
	if serverLogToggle == true {
		log.Println("server log: ", s)
	}
}

// dbLog() controls the logging mechanism for functions that rely on the database.
func dbLog(s string) {
	if dbLogToggle == true {
		log.Println("database log: ", s)
	}
}
