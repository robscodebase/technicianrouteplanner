#!/bin/bash
docker stop $(docker ps -a -q) && docker rm $(docker ps -a -q)
docker rmi $(docker images -a | grep "technician") && docker rmi $(docker images -a | grep "none")
docker build -t vue-technician-route-planner .
docker run  -itd --name vue-technician-route-planner -v /home/robert/technicianrouteplanner/src/shared/vue:/vue-technician-route-planner vue-technician-route-planner
#docker exec -ti vue-technician-route-planner /bin/bash
