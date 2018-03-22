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
func main() {
	flag.Parse()

	port := 9090

	grpcServer := grpc.NewServer()
	pb.RegisterRoutePlannerServer(grpcServer, &server{})
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

	if err := httpServer.ListenAndServe(); err != nil {
		grpclog.Fatalf("file: main.go failed starting http server: %v", err)
	}
}

func (s *server) PlanRoute(ctx context.Context, r *pb.RoutePlannerRequest) (*pb.RoutePlannerReply, error) {
	grpc.SendHeader(ctx, metadata.Pairs("Pre-Response-Metadata", "Is-sent-as-headers-unary"))
	grpc.SetTrailer(ctx, metadata.Pairs("Post-Response-Metadata", "Is-sent-as-trailers-unary"))
	var blankFloat float64
	blankFloat = 6
	var replySlice []float64
	for i := 0; i < 6; i++ {
		replySlice = append(replySlice, float64(i))
	}
	return &pb.RoutePlannerReply{replySlice, &blankFloat, []byte("")}, nil
}
