#!/bin/bash
docker stop grpc-client && docker rm grpc-client
docker rmi grpc-client && docker rmi $(docker images -a | grep "none")
docker build -t grpc-client .
docker run  -itd --name grpc-client \
-v /home/robert/technicianrouteplanner/src/shared/proto/js:/go/src/grpc-client/js/proto \
-v /home/robert/technicianrouteplanner/src/shared/grpc-build:/go/src/grpc-client/js/static \
grpc-client
#docker exec -ti grpc-client /bin/bash
docker logs -f grpc-client
