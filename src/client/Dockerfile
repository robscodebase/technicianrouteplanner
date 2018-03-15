#FROM node:9.8

#RUN apt-get update && apt-get install -y protobuf-compiler python-setuptools && \
#apt-get install expect -y

FROM vue-technician-route-planner
COPY . .
RUN npm install vue && npm install --global vue-cli
#WORKDIR /vue-technician-route-planner
#COPY ./entrypoint.sh /
#ENTRYPOINT ["/entrypoint.sh"]
