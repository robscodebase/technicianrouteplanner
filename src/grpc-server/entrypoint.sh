#!/bin/bash
protoc ./proto/technicianRoutePlanner.proto --go_out=plugins=grpc:$PWD
mkdir -p bin && cd bin/
go build -v ../src
cd ../
./bin/src
