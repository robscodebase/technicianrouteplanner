#!/bin/bash
docker stop golang-protobuf && docker rm golang-protobuf
docker rmi golang-protobuf && docker rmi $(docker images -a | grep "none")
docker build -t golang-protobuf .
docker run  -itd --name golang-protobuf \
-v /home/robert/technicianrouteplanner/src/shared/proto:/go/src/golang-protobuf/proto \
-v /home/robert/technicianrouteplanner/src/shared/proto/go/proto:/go/src/golang-protobuf/go/proto \
golang-protobuf
#docker exec -ti golang-protobuf /bin/bash
docker logs -f golang-protobuf
