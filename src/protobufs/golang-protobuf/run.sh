#!/bin/bash
docker stop $(docker ps -a -q) && docker rm $(docker ps -a -q)
docker rmi $(docker images -a | grep "tech") && docker rmi $(docker images -a | grep "none")
docker build -t golang-protobuf-final-technician-route-planner .
docker run  -itd --name golang-protobuf-final-technician-route-planner -v /home/robert/technicianrouteplanner/src/shared/proto:/go/src/golang-protobuf/proto golang-protobuf-final-technician-route-planner
#docker exec -ti golang-protobuf-final-technician-route-planner /bin/bash
