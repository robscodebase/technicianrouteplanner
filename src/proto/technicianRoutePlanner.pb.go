// Code generated by protoc-gen-go. DO NOT EDIT.
// source: proto/technicianRoutePlanner.proto

/*
Package technicianRoutePlanner is a generated protocol buffer package.

It is generated from these files:
	proto/technicianRoutePlanner.proto

It has these top-level messages:
*/
package technicianRoutePlanner

import proto "github.com/golang/protobuf/proto"
import fmt "fmt"
import math "math"

import (
	context "golang.org/x/net/context"
	grpc "google.golang.org/grpc"
)

// Reference imports to suppress errors if they are not otherwise used.
var _ = proto.Marshal
var _ = fmt.Errorf
var _ = math.Inf

// This is a compile-time assertion to ensure that this generated file
// is compatible with the proto package it is being compiled against.
// A compilation error at this line likely means your copy of the
// proto package needs to be updated.
const _ = proto.ProtoPackageIsVersion2 // please upgrade the proto package

// Reference imports to suppress errors if they are not otherwise used.
var _ context.Context
var _ grpc.ClientConn

// This is a compile-time assertion to ensure that this generated file
// is compatible with the grpc package it is being compiled against.
const _ = grpc.SupportPackageIsVersion4

// Client API for RoutePlanner service

type RoutePlannerClient interface {
}

type routePlannerClient struct {
	cc *grpc.ClientConn
}

func NewRoutePlannerClient(cc *grpc.ClientConn) RoutePlannerClient {
	return &routePlannerClient{cc}
}

// Server API for RoutePlanner service

type RoutePlannerServer interface {
}

func RegisterRoutePlannerServer(s *grpc.Server, srv RoutePlannerServer) {
	s.RegisterService(&_RoutePlanner_serviceDesc, srv)
}

var _RoutePlanner_serviceDesc = grpc.ServiceDesc{
	ServiceName: "technicianRoutePlanner.routePlanner",
	HandlerType: (*RoutePlannerServer)(nil),
	Methods:     []grpc.MethodDesc{},
	Streams:     []grpc.StreamDesc{},
	Metadata:    "proto/technicianRoutePlanner.proto",
}

func init() { proto.RegisterFile("proto/technicianRoutePlanner.proto", fileDescriptor0) }

var fileDescriptor0 = []byte{
	// 73 bytes of a gzipped FileDescriptorProto
	0x1f, 0x8b, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02, 0xff, 0xe2, 0x52, 0x2a, 0x28, 0xca, 0x2f,
	0xc9, 0xd7, 0x2f, 0x49, 0x4d, 0xce, 0xc8, 0xcb, 0x4c, 0xce, 0x4c, 0xcc, 0x0b, 0xca, 0x2f, 0x2d,
	0x49, 0x0d, 0xc8, 0x49, 0xcc, 0xcb, 0x4b, 0x2d, 0xd2, 0x03, 0x4b, 0x0a, 0x89, 0x61, 0x97, 0x35,
	0xe2, 0xe3, 0xe2, 0x29, 0x42, 0xe2, 0x27, 0xb1, 0x81, 0x95, 0x1b, 0x03, 0x02, 0x00, 0x00, 0xff,
	0xff, 0x60, 0x25, 0xd0, 0xbb, 0x54, 0x00, 0x00, 0x00,
}