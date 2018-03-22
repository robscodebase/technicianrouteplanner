// package: technicianRoutePlanner
// file: technicianRoutePlanner.proto

import * as technicianRoutePlanner_pb from "./technicianRoutePlanner_pb";
export class technicianRoutePlanner {
  static serviceName = "technicianRoutePlanner.technicianRoutePlanner";
}
export namespace technicianRoutePlanner {
  export class RoutePlanner {
    static readonly methodName = "RoutePlanner";
    static readonly service = technicianRoutePlanner;
    static readonly requestStream = false;
    static readonly responseStream = false;
    static readonly requestType = technicianRoutePlanner_pb.RoutePlannerRequest;
    static readonly responseType = technicianRoutePlanner_pb.RoutePlannerReply;
  }
}
