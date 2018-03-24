#!/bin/bash
docker stop grpc-server && docker rm grpc-server
docker rmi grpc-server && docker rmi $(docker images -a | grep "none")
docker build -t grpc-server .
docker run  -itd --name grpc-server \
-v /home/robert/technicianrouteplanner/src/shared/proto/go/proto:/go/src/grpc-server/proto \
grpc-server
#docker exec -ti grpc-server /bin/bash
docker logs -f grpc-server
