#!/bin/bash
docker stop $(docker ps -a -q) && docker rm $(docker ps -a -q)
docker rmi $(docker images -a | grep "tech") && docker rmi $(docker images -a | grep "none")
docker build -t grpc-client-final-technician-route-planner .
docker run  -itd --name grpc-client-final-technician-route-planner -v /home/robert/technicianrouteplanner/src/proto:/proto -v /home/robert/technicianrouteplanner/src/grpc-build:/js/static grpc-client-final-technician-route-planner
docker exec -ti grpc-client-final-technician-route-planner /bin/bash
