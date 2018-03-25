FROM golang:1.9
RUN apt-get update

RUN go get github.com/gorilla/mux && \
    go get github.com/gorilla/handlers


COPY . /go/src/technicianrouteplanner
WORKDIR /go/src/technicianrouteplanner
ENTRYPOINT ["/go/src/technicianrouteplanner/entrypoint.sh"]
