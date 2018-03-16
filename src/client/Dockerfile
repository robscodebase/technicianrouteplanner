FROM node:9.8
RUN apt-get update && apt-get install -y protobuf-compiler python-setuptools
COPY . .
RUN npm install vue && npm install --global vue-cli
WORKDIR /vue-technician-route-planner
#RUN npm run build
COPY ./entrypoint.sh /
ENTRYPOINT ["/entrypoint.sh"]
