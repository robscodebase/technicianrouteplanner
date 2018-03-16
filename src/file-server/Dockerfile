FROM golang:1.9
RUN apt-get update

RUN go get github.com/gorilla/mux && \
    go get github.com/gorilla/handlers && \
    go get -u github.com/go-sql-driver/mysql && \
    go get golang.org/x/crypto/bcrypt && \
    go get github.com/nu7hatch/gouuid && \
    go get gopkg.in/mgo.v2 && \
    go get gopkg.in/mgo.v2/bson


COPY . /go/src/technicianrouteplanner
WORKDIR /go/src/technicianrouteplanner
RUN ["./build.sh"]
COPY ./entrypoint.sh /
ENTRYPOINT ["/entrypoint.sh"]
