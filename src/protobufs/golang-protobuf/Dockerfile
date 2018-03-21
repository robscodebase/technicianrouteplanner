FROM golang:1.9
RUN apt-get update

RUN go get github.com/golang/protobuf/protoc-gen-go && \
  apt-get install -y protobuf-compiler python-setuptools

COPY . /go/src/golang-protobuf
WORKDIR /go/src/golang-protobuf
COPY ./build.sh /
ENTRYPOINT ["/build.sh"]
