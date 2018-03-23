FROM golang:1.9
RUN apt-get update
ENV NODE_VERSION 8.9.3
ENV NPM_VERSION 5.0.0
RUN curl -SLO "http://nodejs.org/dist/v$NODE_VERSION/node-v$NODE_VERSION-linux-x64.tar.gz" \
	&& tar -xzf "node-v$NODE_VERSION-linux-x64.tar.gz" -C /usr/local --strip-components=1 \
	&& npm install -g npm@"$NPM_VERSION"
ENV PATH $PATH:/nodejs/bin
RUN go get github.com/golang/protobuf/protoc-gen-go && \
apt-get install -y protobuf-compiler python-setuptools

COPY . /go/src/grpc-client
WORKDIR /go/src/grpc-client
RUN ["./build.sh"]
WORKDIR /go/src/grpc-client/js
ENTRYPOINT ["/go/src/grpc-client/js/build.sh"]
