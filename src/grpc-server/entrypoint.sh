#!/bin/bash
mkdir -p bin && cd bin/
go build -v ../src
cd ../
./bin/src
