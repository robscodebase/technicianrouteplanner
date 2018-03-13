#!/bin/bash
docker stop $(docker ps -a -q)
docker rm $(docker ps -a -q)
docker rmi $(docker images -a | grep "<none>")
docker volume rm $(docker volume ls)
docker ps -a
docker images
docker volume ls
docker-compose up
