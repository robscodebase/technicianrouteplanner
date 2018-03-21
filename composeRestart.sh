#!/bin/bash
docker stop $(docker ps -a -q) && docker rm $(docker ps -a -q)
docker rmi $(docker images -a | grep "tech")
docker rmi $(docker images -a | grep "<none>")
docker volume rm $(docker volume ls -a)
docker ps -a
docker images -a
docker volume ls -a
docker-compose up
