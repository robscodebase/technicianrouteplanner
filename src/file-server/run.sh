#!/bin/bash
docker stop file-server && docker rm file-server
docker rmi file-server && docker rmi $(docker images -a | grep "none")
docker build -t file-server .
docker run  -dp 8080:8080 -itd --name file-server \
-v /home/robert/technicianrouteplanner/src/shared/vue/dist:/go/src/technicianrouteplanner/src/templates \
-v /home/robert/technicianrouteplanner/src/shared/grpc-build:/go/src/technicianrouteplanner/src/grpc-build \
file-server
#docker exec -ti file-server /bin/bash
docker logs -f file-server
