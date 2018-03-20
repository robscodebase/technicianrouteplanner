FROM node:9.8
RUN apt-get update && apt-get install -y protobuf-compiler python-setuptools
COPY . .
WORKDIR /js
RUN npm install webpack -g
RUN npm install webpack-cli -g
RUN npm install
ENTRYPOINT ["./build.sh"]
