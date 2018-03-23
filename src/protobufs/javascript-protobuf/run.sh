#!/bin/bash
docker stop $(docker ps -a -q) && docker rm $(docker ps -a -q)
docker rmi $(docker images -a | grep "tech") && docker rmi $(docker images -a | grep "none")
docker build -t javascript-protobuf-final-technician-route-planner .
docker run  -itd --name javascript-protobuf-final-technician-route-planner \
  -v /home/robert/technicianrouteplanner/src/shared/proto:/home/node/proto \
  -v /home/robert/technicianrouteplanner/src/shared/proto/js:/home/node/js \
  javascript-protobuf-final-technician-route-planner
#docker exec -ti javascript-protobuf-final-technician-route-planner /bin/bash
