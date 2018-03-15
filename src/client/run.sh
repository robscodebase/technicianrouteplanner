#!/bin/bash
#docker stop $(docker ps -a -q) && docker rm $(docker ps -a -q)
#docker rmi $(docker images -a | grep "vue") && docker rmi $(docker images -a | grep "none")
docker build -t vue-technician-route-planner .
#docker build -t vue-technician-route-planner-install .
docker run  -itdp 8081:8081 --name vue-technician-route-planner -v /home/robert/technicianrouteplanner/buildvolume:/client vue-technician-route-planner
#docker run  -itdp 8081:8081 --name vue-technician-route-planner-install -v /home/robert/technicianrouteplanner/buildvolume:/client vue-technician-route-planner-install
docker exec -ti vue-technician-route-planner /bin/bash
#docker exec -ti vue-technician-route-planner-install /bin/bash
