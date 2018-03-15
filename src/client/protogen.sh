#!/bin/bash

#generate protobuf file.
protoc \
  --plugin=protoc-gen-ts=./node_modules/.bin/protoc-gen-ts \
  -I ./proto \
  --js_out=import_style=commonjs,binary:./ts/_proto \
  --ts_out=service=true:./ts/_proto \
./proto/technicianRoutePlanner.proto
