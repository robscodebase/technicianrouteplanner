// Copyright (c) 2018 Robert Reyna. All rights reserved.
// License BSD 3-Clause https://github.com/robscodebase/technicianrouteplanner/blob/master/LICENSE.md

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
        const {
            status,
            statusMessage,
            headers,
            message,
            trailers
        } = res;
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
    zoom: 16,
    center: [-122.019807, 45.632433],
    style: 'mapbox://styles/mapbox/satellite-v9',
    hash: false
});

var geojson = {
    "type": "FeatureCollection",
    "features": [{
        "type": "Feature",
        "geometry": {
            "type": "LineString",
            "coordinates": [
                [-122.019807, 45.632433]
            ]
        }
    }]
};

map.on('load', function() {
    map.scrollZoom.disable();
    map.addLayer({
        'id': 'line-animation',
        'type': 'line',
        'source': {
            'type': 'geojson',
            'data': geojson
        },
        'layout': {
            'line-cap': 'round',
            'line-join': 'round'
        },
        'paint': {
            'line-color': 'yellow',
            'line-width': 5,
            'line-opacity': .8
        }
    });

    // setup the viewport
    map.jumpTo({
        'center': [messageVar.coordinatesList[0], messageVar.coordinatesList[1]],
        'zoom': 16
    });
    map.setPitch(30);
    var i = 0;
    var timer = window.setInterval(function() {
        if (i < messageVar.sizeofarray - 1) {
            map.panTo([messageVar.coordinatesList[i], messageVar.coordinatesList[i + 1]]);
            geojson.features[0].geometry.coordinates.push([messageVar.coordinatesList[i], messageVar.coordinatesList[i + 1]]);
            map.getSource('line-animation').setData(geojson);
            i = i + 2;
        } else {
            window.clearInterval(timer);
        }
    }, 500);

});
