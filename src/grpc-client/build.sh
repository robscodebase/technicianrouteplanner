#!/bin/bash
mkdir proto
cp /go/src/agency_app/proto/grpcMapTools.proto proto
npm install -g --save-dev webpack
npm install
bash ./protogen.sh
