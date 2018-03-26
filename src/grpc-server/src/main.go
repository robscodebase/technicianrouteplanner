// Copyright (c) 2018 Robert Reyna. All rights reserved.
// License BSD 3-Clause https://github.com/robscodebase/technicianrouteplanner/blob/master/LICENSE.md

package main

import (
	"flag"
	"fmt"
	"log"
	"net/http"
	"os"

	"google.golang.org/grpc"
	"google.golang.org/grpc/grpclog"
	"google.golang.org/grpc/metadata"

	pb "grpc-server/proto"
	"github.com/improbable-eng/grpc-web/go/grpcweb"
	"golang.org/x/net/context"
)

var (
	enableTls       = flag.Bool("enable_tls", false, "Use TLS - required for HTTP2.")
)
type server struct{}

type Point struct {
	ID int			`bson:"id" json:"id"`
	Lng float64 `bson:"lng" json:"lng"`
	Lat float64 `bson:"lat" json:"lat"`
}

func createDemoDB(mdb *DB) error {
	for k, v := range Lng {
		err = mdb.insertPoint(Point{ID:k,Lng:v,Lat:Lat[k]})
		if err != nil {
			return err
		}
	}
	return nil
}
var mdb *DB
var err error
func main() {
	mdb = &DB{Server:"mongo",Database:"points"}
	mdb.newMongoDB()
	err = createDemoDB(mdb)
	if err != nil {
		log.Panicf("grpc-server: main.go: main(): call to createDemoDB(): err", err)
	}


	flag.Parse()

	port := 9090

	grpcServer := grpc.NewServer()
	pb.RegisterTechnicianRoutePlannerServer(grpcServer, &server{})
	grpclog.SetLogger(log.New(os.Stdout, "grpc-server: ", log.LstdFlags))

	wrappedServer := grpcweb.WrapServer(grpcServer)
	handler := func(resp http.ResponseWriter, req *http.Request) {
		wrappedServer.ServeHTTP(resp, req)
	}

	httpServer := http.Server{
		Addr:    fmt.Sprintf(":%d", port),
		Handler: http.HandlerFunc(handler),
	}

	grpclog.Printf("file: main.go Starting grpc-server. http port: %d, with TLS: %v", port, *enableTls)

	if err = httpServer.ListenAndServe(); err != nil {
		grpclog.Fatalf("file: main.go failed starting http server: %v", err)
	}
}

func pointsToSlice(points []Point) (float64, []float64) {
	var floatSlice []float64
	var i int
	for i, _ = range points {
		floatSlice = append(floatSlice, points[i].Lng)
		floatSlice = append(floatSlice, points[i].Lat)
		}
	return float64(i), floatSlice
}
func (s *server) RoutePlanner(ctx context.Context, r *pb.RoutePlannerRequest) (*pb.RoutePlannerReply, error) {
	grpc.SendHeader(ctx, metadata.Pairs("Pre-Response-Metadata", "Is-sent-as-headers-unary"))
	grpc.SetTrailer(ctx, metadata.Pairs("Post-Response-Metadata", "Is-sent-as-trailers-unary"))
	var points []Point
	points, err = mdb.listPoints()
	if err != nil {
		log.Panicf("grpc-server: main.go: main(): call to listPoints(): err", err)
	}

	i, floatSlice := pointsToSlice(points)
	return &pb.RoutePlannerReply{floatSlice, i}, nil
}
