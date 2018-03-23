#!/bin/bash
protoc ./proto/technicianRoutePlanner.proto --go_out=plugins=grpc:/go/src/golang-protobuf/go
