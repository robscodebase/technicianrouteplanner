#!/bin/bash
mkdir proto
cp /go/src/technicianroutplanner/proto/technicianroutplanner.proto proto
npm install -g --save-dev webpack
npm install
bash ./protogen.sh
