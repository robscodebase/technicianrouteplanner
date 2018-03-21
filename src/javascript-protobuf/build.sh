#!/bin/bash
protoc \
  --plugin=protoc-gen-ts=./node_modules/.bin/protoc-gen-ts \
  -I ./proto \
  --js_out=import_style=commonjs,binary:./proto \
  --ts_out=service=true:./proto \
./proto/technicianRoutePlanner.proto
