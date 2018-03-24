#!/bin/bash
docker stop $(docker ps -a -q) && docker rm $(docker ps -a -q)
docker rmi $(docker images -a | grep "tech") && docker rmi $(docker images -a | grep "none")
docker build -t file-server-final-technician-route-planner .
docker run  -dp 8080:8080 -itd --name file-server-final-technician-route-planner \
-v /home/robert/technicianrouteplanner/src/shared/vue/dist:/go/src/technicianrouteplanner/src/templates \
-v /home/robert/technicianrouteplanner/src/shared/grpc-build:/go/src/technicianrouteplanner/src/grpc-build \
file-server-final-technician-route-planner
#docker exec -ti file-server-final-technician-route-planner /bin/bash
