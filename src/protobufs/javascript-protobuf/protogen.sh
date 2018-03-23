#!/bin/bash
npm install
protoc \
  --plugin=protoc-gen-ts=./node_modules/.bin/protoc-gen-ts \
  -I ./proto/ \
  --js_out=import_style=commonjs,binary:./proto/js \
  --ts_out=service=true:./proto/js \
./proto/technicianRoutePlanner.proto
