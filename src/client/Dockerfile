FROM node:9.8
RUN apt-get update
COPY . .
RUN npm install vue && npm install --global vue-cli
WORKDIR /client
COPY ./entrypoint.sh /
ENTRYPOINT ["/entrypoint.sh"]
