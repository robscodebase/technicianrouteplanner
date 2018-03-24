#!/bin/bash
docker stop $(docker ps -a -q) && docker rm $(docker ps -a -q)
docker rmi $(docker images -a | grep "tech") && docker rmi $(docker images -a | grep "none")
docker build -t grpc-server-final-technician-route-planner .
docker run  -itd --name grpc-server-final-technician-route-planner \
-v /home/robert/technicianrouteplanner/src/shared/proto/go/proto:/go/src/grpc-server/proto \
grpc-server-final-technician-route-planner
#docker exec -ti grpc-server-final-technician-route-planner /bin/bash
