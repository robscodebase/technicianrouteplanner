#!/bin/bash
docker stop javascript-protobuf && docker rm javascript-protobuf
docker rmi javascript-protobuf && docker rmi $(docker images -a | grep "none")
docker build -t javascript-protobuf .
docker run  -itd --name javascript-protobuf \
  -v /home/robert/technicianrouteplanner/src/shared/proto:/home/node/proto \
  -v /home/robert/technicianrouteplanner/src/shared/proto/js:/home/node/js \
  javascript-protobuf
#docker exec -ti javascript-protobuf /bin/bash
docker logs -f javascript-protobuf
