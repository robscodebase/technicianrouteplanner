#!/bin/bash
#docker volume rm tech-router-front-end-src
docker volume rm tech-router-front-end-dist
#docker volume create tech-router-front-end-src
docker volume create tech-router-front-end-dist
docker stop $(docker ps -a -q) && docker rm $(docker ps -a -q)
docker rmi $(docker images -a | grep "vue-technician-route-planner-install") && docker rmi $(docker images -a | grep "none")
docker build -t vue-technician-route-planner-install .
docker run  -itd --name vue-technician-route-planner-install -v /home/robert/technicianrouteplanner/src/vuesrc:/vue-technician-route-planner/src -v tech-router-front-end-dist:/vue-technician-route-planner/dist vue-technician-route-planner-install
#docker exec -ti vue-technician-route-planner-install /bin/bash
