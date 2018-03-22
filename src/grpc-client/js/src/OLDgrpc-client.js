import {grpc, Code, Metadata} from "grpc-web-client";
import {routePlanner} from "/proto/technicianRoutePlanner_pb_service";
import {RoutePlannerRequest, RoutePlannerReply} from "/proto/technicianRoutePlanner_pb";

const host = "http://localhost:9090";
const routeRequest = new RouteRequest();
routeRequest.setRoutename("Demo")

grpc.unary(technicianRoutePlanner.PlanRoute, {
  request: routeRequest,
  host: host,
  onEnd: res => {
    const { status, statusMessage, headers, message, trailers } = res;
    //console.log(" status: ", status, " statusMessage: ", statusMessage, " headers: ", headers, " message: ", message, " trailers: ", trailers)
    //console.log(" message: ", message);
    if (status === Code.OK && message) {
      var messageVar = message.toObject();
      console.log("INSIDE grpc return messageVar: ", messageVar);
      console.log("INSIDE grpc return array: ", arrayOfBoundaryPoints);
    } else {
      console.log('polyToCellsRequest() Failed on reply from server.');
    }
  }
});

alert("newest")
