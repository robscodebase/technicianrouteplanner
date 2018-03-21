// package: technicianRoutePlanner
// file: technicianRoutePlanner.proto

import * as technicianRoutePlanner_pb from "./technicianRoutePlanner_pb";
export class routePlanner {
  static serviceName = "technicianRoutePlanner.routePlanner";
}
export namespace routePlanner {
  export class RoutePlanner {
    static readonly methodName = "RoutePlanner";
    static readonly service = routePlanner;
    static readonly requestStream = false;
    static readonly responseStream = false;
    static readonly requestType = technicianRoutePlanner_pb.RoutePlannerRequest;
    static readonly responseType = technicianRoutePlanner_pb.RoutePlannerReply;
  }
}
