// package: grpcMapTools
// file: grpcMapTools.proto

import * as grpcMapTools_pb from "./grpcMapTools_pb";
export class grpcMapTools {
  static serviceName = "grpcMapTools.grpcMapTools";
}
export namespace grpcMapTools {
  export class Add {
    static readonly methodName = "Add";
    static readonly service = grpcMapTools;
    static readonly requestStream = false;
    static readonly responseStream = false;
    static readonly requestType = grpcMapTools_pb.AddRequest;
    static readonly responseType = grpcMapTools_pb.Answer;
  }
  export class PointInPoly {
    static readonly methodName = "PointInPoly";
    static readonly service = grpcMapTools;
    static readonly requestStream = false;
    static readonly responseStream = false;
    static readonly requestType = grpcMapTools_pb.PointInPolyRequest;
    static readonly responseType = grpcMapTools_pb.PointInPolyReply;
  }
}
