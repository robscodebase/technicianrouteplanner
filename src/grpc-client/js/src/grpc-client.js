import {grpc, Code, Metadata} from "grpc-web-client";
import {technicianRoutePlanner} from "/go/src/grpc-client/js/proto/technicianRoutePlanner_pb_service";
import {RoutePlannerRequest, RoutePlannerReply} from "/go/src/grpc-client/js/proto/technicianRoutePlanner_pb";

const host = "http://localhost:9090";
const routeRequest = new RoutePlannerRequest();

routeRequest.setRoutename("Demo")

var messageVar;

grpc.unary(technicianRoutePlanner.RoutePlanner, {
  request: routeRequest,
  host: host,
  onEnd: res => {
    const { status, statusMessage, headers, message, trailers } = res;
    if (status === Code.OK && message) {
      messageVar = message.toObject();
      console.log("INSIDE grpc return messageVar: ", messageVar.coordinatesList);
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

    map.on('load', function () {
      var c = document.getElementById("canvas");
      var ctx = c.getContext("2d");
      // setup the viewport
      map.jumpTo({ 'center': [messageVar.coordinatesList[0], messageVar.coordinatesList[1]], 'zoom': 14 });
      map.setPitch(30);
      var projection = map.project([messageVar.coordinatesList[0], messageVar.coordinatesList[1]]);
      ctx.moveTo(parseInt(projection.x),parseInt(projection.y));

      for (let ii = 0; i < messageVar.sizeofarray; ii++) {
          // on a regular basis, add more coordinates and update the map
            var i = 0;
            var timer = window.setInterval(function() {
                if (i < messageVar.sizeofarray-1) {
                    projection = map.project([messageVar.coordinatesList[i], messageVar.coordinatesList[i+1]]);
                    ctx.lineTo(parseInt(projection.x),parseInt(projection.y));
                    map.panTo([messageVar.coordinatesList[i], messageVar.coordinatesList[i+1]]);
                    i=i+2;
                } else {
                    window.clearInterval(timer);
                }
            }, 10);
          }
    });
