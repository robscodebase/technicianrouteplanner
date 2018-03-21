FROM golang:1.9
RUN apt-get update

RUN go get google.golang.org/grpc && \
	go get google.golang.org/grpc/grpclog && \
	go get google.golang.org/grpc/metadata && \
  go get github.com/improbable-eng/grpc-web/go/grpcweb && \
  go get golang.org/x/net/context && \
  go get github.com/golang/protobuf/protoc-gen-go && \
  apt-get install -y protobuf-compiler python-setuptools


COPY . /go/src/grpc-server
WORKDIR /go/src/grpc-server
RUN ./build.sh
COPY ./entrypoint.sh /
ENTRYPOINT [/entrypoint.sh]
