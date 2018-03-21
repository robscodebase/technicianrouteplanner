FROM golang:1.9
RUN apt-get update
ENV NODE_VERSION 8.9.3
ENV NPM_VERSION 5.0.0
RUN curl -SLO "http://nodejs.org/dist/v$NODE_VERSION/node-v$NODE_VERSION-linux-x64.tar.gz" \
	&& tar -xzf "node-v$NODE_VERSION-linux-x64.tar.gz" -C /usr/local --strip-components=1 \
	&& npm install -g npm@"$NPM_VERSION"
ENV PATH $PATH:/nodejs/bin
COPY . /go/src/protobuf
WORKDIR /go/src/protobuf
RUN apt-get update && apt-get install -y protobuf-compiler python-setuptools && \
go get github.com/golang/protobuf/protoc-gen-go && \
npm install ts-protoc-gen
COPY ./build.sh /
ENTRYPOINT ["/build.sh"]
