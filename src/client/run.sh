#!/bin/bash
docker stop $(docker ps -a -q) && docker rm $(docker ps -a -q)
docker rmi vue-technician-route-planner && docker rmi $(docker images -a | grep "none")
docker build -t vue-technician-route-planner .
docker run  -itd --name vue-technician-route-planner vue-technician-route-planner
