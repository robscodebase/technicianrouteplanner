FROM node:9.8
#RUN apt-get update && apt-get install -y protobuf-compiler python-setuptools
COPY . .
WORKDIR /js
COPY ./js/build.sh /
ENTRYPOINT ["/build.sh"]
