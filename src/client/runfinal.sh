#!/bin/bash
docker stop $(docker ps -a -q) && docker rm $(docker ps -a -q)
docker rmi $(docker images -a | grep "vue-technician-route-planner-install") && docker rmi $(docker images -a | grep "none")
docker build -t vue-technician-route-planner-install .
docker run  -itd --name vue-technician-route-planner-install -v /home/robert/technicianrouteplanner/buildvolume:/vue-technician-route-planner vue-technician-route-planner-install
#docker run  -itd --name vue-technician-route-planner-install -v /home/robert/technicianrouteplanner/script:/script vue-technician-route-planner-install
docker exec -ti vue-technician-route-planner-install /bin/bash
