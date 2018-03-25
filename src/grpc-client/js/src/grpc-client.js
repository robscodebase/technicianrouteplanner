import {grpc, Code, Metadata} from "grpc-web-client";
import {technicianRoutePlanner} from "/go/src/grpc-client/js/proto/technicianRoutePlanner_pb_service";
import {RoutePlannerRequest, RoutePlannerReply} from "/go/src/grpc-client/js/proto/technicianRoutePlanner_pb";

const host = "http://localhost:9090";
const routeRequest = new RoutePlannerRequest();
routeRequest.setRoutename("Demo")

grpc.unary(technicianRoutePlanner.RoutePlanner, {
  request: routeRequest,
  host: host,
  onEnd: res => {
    const { status, statusMessage, headers, message, trailers } = res;
    if (status === Code.OK && message) {
      var messageVar = message.toObject();
      console.log("INSIDE grpc return messageVar: ", messageVar);
    } else {
      console.log("problem with grpc connection: status: ", status);
    }
  }
});

  mapboxgl.accessToken = 'pk.eyJ1Ijoicm9ic2NvZGViYXNlIiwiYSI6ImNqZXdmeGVkMDBwMjQydm54YmNid3B5bTUifQ.zPGSWpLfJaqgCvIkqfbbYA';
  var map = new mapboxgl.Map({
    container: 'map',
    zoom: 9,
    center: [137.9150899566626, 36.25956997955441],
    style: 'mapbox://styles/mapbox/satellite-v9',
    hash: false
  });
