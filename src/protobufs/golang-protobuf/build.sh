#!/bin/bash
protoc ./proto/technicianRoutePlanner.proto --go_out=plugins=grpc:$PWD
