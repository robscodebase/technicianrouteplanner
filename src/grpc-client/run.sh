#!/bin/bash
docker stop $(docker ps -a -q) && docker rm $(docker ps -a -q)
docker rmi $(docker images -a | grep "tech") && docker rmi $(docker images -a | grep "none")
docker build -t grpc-client-final-technician-route-planner .
docker run  -itd --name grpc-client-final-technician-route-planner -v /home/robert/technicianrouteplanner/src/shared/proto/js:/src/grpc-client/js/proto -v /home/robert/technicianrouteplanner/src/shared/grpc-build:/src/grpc-client/js/static grpc-client-final-technician-route-planner
docker exec -ti grpc-client-final-technician-route-planner /bin/bash
