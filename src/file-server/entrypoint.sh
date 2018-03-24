#!/bin/bash
mkdir -p bin && cd bin
go build -v ../src/
./src
