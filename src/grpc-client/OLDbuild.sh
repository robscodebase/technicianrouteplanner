#!/bin/bash
mkdir proto
cp /proto/technicianrouteplanner.proto proto
npm install -g --save-dev webpack
npm install
bash ./protogen.sh
