FROM node:9.8
RUN apt-get update && apt-get install -y protobuf-compiler python-setuptools
COPY . .
RUN npm install
WORKDIR /grpc-client/js
ENTRYPOINT ["/build.sh"]
