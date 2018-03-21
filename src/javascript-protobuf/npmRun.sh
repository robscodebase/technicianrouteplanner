#!/bin/bash
docker stop $(docker ps -a -q) && docker rm $(docker ps -a -q)
docker rmi $(docker images -a | grep "tech") && docker rmi $(docker images -a | grep "none")
docker build -t grpc-client-npm-route-planner .
docker run  -itd --name grpc-client-npm-route-planner grpc-client-npm-route-planner
