import {grpc, Code, Metadata} from "grpc-web-client";
import {grpcMapTools} from "../_proto/grpcMapTools_pb_service";
import {PolyToCellsRequest, PolyToCellsReply, CellBounds, MapOfClickedCells} from "../_proto/grpcMapTools_pb";

const host = "http://localhost:9090";
var arrayOfBoundaryPoints = [];
var grpcCellID, cellWestLine, cellNorthLine, cellEastLine, cellSouthLine;
function polyToCells(lngPoints, latPoints) {
  const polyToCellsRequest = new PolyToCellsRequest();
  let setLngPoints = [];
  let setLatPoints = [];
  for (let i = 0; i < lngPoints.length; i++) {
    setLngPoints.push(lngPoints[i]);
    setLatPoints.push(latPoints[i]);
  }
  polyToCellsRequest.setLngList(setLngPoints);
  polyToCellsRequest.setLatList(setLatPoints);
  grpc.unary(grpcMapTools.PolyToCells, {
    request: polyToCellsRequest,
    host: host,
    onEnd: res => {
      const { status, statusMessage, headers, message, trailers } = res;
      //console.log(" status: ", status, " statusMessage: ", statusMessage, " headers: ", headers, " message: ", message, " trailers: ", trailers)
      //console.log(" message: ", message);
      if (status === Code.OK && message) {
        var messageVar = message.toObject();
        console.log("INSIDE grpc return messageVar: ", messageVar);
        arrayOfBoundaryPoints = messageVar.linenumbersList;
        console.log("INSIDE grpc return array: ", arrayOfBoundaryPoints);
        drawCanvas()
      } else {
        console.log('polyToCellsRequest() Failed on reply from server.');
      }
    }
  });
}

mapboxgl.accessToken = 'pk.eyJ1IjoibW9hc2lzbWFwIiwiYSI6ImNqODI0NW03aDU3NG0ycW8zZmU0dzZsYWoifQ.bC-3WFKE_mjkkPF1h4dHAA';
// Step distances for grid.
// westernLine and southernline are converted to
// line lat and lng position by dividing the point
// by the step, then parseInt, then multiply by
// the step.
var latStep = 0.00001,
    lngStep = 0.00000536,
    latLineCount, lngLineCount,
    boundingBox, westernLineDraw, easternLineDraw, southernLineDraw, northernLineDraw;

var mapOfClickedCells = new Map(),
    mapLng2Screen = new Map(),
    mapLat2Screen = new Map(),
    undoHistory = 1,
    zoomMultiplier = 1,
    c = document.getElementById("canvas"),
    ctx = c.getContext("2d"),
    screenColorOnClick = new Uint8ClampedArray([1, 2, 3, 4]).fill(0),
    isClickAreaAlreadyHighlighted = false;


var map = new mapboxgl.Map({
    container: 'map',
    center: [-0.0, 0.0],
    zoom: 21,
    style: 'mapbox://styles/moasismap/cj8246t7398ed2so1a83jy40e'
});

var draw = new MapboxDraw({
    displayControlsDefault: false,
    controls: {
        polygon: true,
        trash: true
    }
});
map.addControl(draw);

// Set functions for draw commands.
var activateDraw = 'false';
map.on('draw.create', collectPolyPoints);
map.on('draw.update', collectPolyPoints);
map.on('load', function() {
    //console.clear();
    // Add mousedown listener to draw tool to deactivate clickable cells.
    document.getElementsByClassName("mapbox-gl-draw_ctrl-draw-btn mapbox-gl-draw_polygon")[0].addEventListener("mousedown", activateDrawTool);
    var drawTools = document.querySelectorAll("div.mapboxgl-ctrl-group").item(0);
    drawCanvas()
});

var drawAll, polygonCount, date, time;

function collectPolyPoints() {
    drawAll = draw.getAll();
}
var reversePoly = [];

function reverseDrawPolygonSelection() {
    deActivateDrawTool();
    date = new Date();
    time = date.getTime();
    var amountOfPointCoord = drawAll.features[0].geometry.coordinates[0].length - 1,
        lngLatToggle = 0;
    while (amountOfPoints > 0) {
        if (lngLatToggle == 0) {
            reversePoly.push(drawAll.features[0].geometry.coordinates[0][amountOfPoints][lngLatToggle]);
            //console.log(drawAll.features[0].geometry.coordinates[0][amountOfPoints][lngLatToggle]);
            lngLatToggle++
        } else if (lngLatToggle >= 1) {
            reversePoly.push(drawAll.features[0].geometry.coordinates[0][amountOfPoints][lngLatToggle]);
            //console.log(drawAll.features[0].geometry.coordinates[0][amountOfPoints][lngLatToggle]);
            lngLatToggle = 0;
            amountOfPoints--
        }
    }
    reversePoly.push(undoHistory);
    mapOfClickedCells.set(parseInt(time), reversePoly);
    drawCanvas();
    undoHistory++
}

var drawnPolyLng = [], drawnPolyLat = [],
    drawnPolyLatLng = [], points = [],
    greatestLng, leastLng, greatestLat, leastLat,
    lngGridPoints, latGridPoints, westI, zoomMultiplierString = zoomMultiplier.toString(),
    amountOfPointCoord, latPolyPointSnap, lngPolyPointSnap,
    lngLatToggle, stepsInLngLine, stepsInLatLine, drawnPolyBounds = [];
function drawPolygonSelection() {
    amountOfPointCoord = 0, lngLatToggle = 0, stepsInLngLine = 0, stepsInLatLine = 0;
    deActivateDrawTool();
    // Separate the coords into two arrays to get the greatest and least lat and lng for the bounds.
		// The bounds is used to create the points that will be compared for point in poly.
		// As of 1/9/2018 the point that is compared is the bottom left point of each cell.
    while (amountOfPointCoord < drawAll.features[0].geometry.coordinates[0].length - 1) {
        if (lngLatToggle == 0) {
            // Snap point to nearest step value to line up with grid.
            drawnPolyLng.push((parseInt(drawAll.features[0].geometry.coordinates[0][amountOfPointCoord][lngLatToggle] / lngStep)) - 1)
            lngLatToggle++
        } else if (lngLatToggle >= 1) {
            // Snap point to nearest step value to line up with grid.
            drawnPolyLat.push((parseInt(drawAll.features[0].geometry.coordinates[0][amountOfPointCoord][lngLatToggle] / latStep)) + 1)
            lngLatToggle = 0;
            amountOfPointCoord++
        }
    }

    // send array of lat and lng to grpc server and expect return map of selected cells
    // key:string value:cell coordinates lat lng.
    polyToCells(drawnPolyLng, drawnPolyLat);
    // clear memory.
    drawnPolyLng = [], drawnPolyLat = [], drawnPolyLatLng = [];
    drawCanvas();

};

map.on('click', function(e) {
    if (isReverse === 'true') {
        if (ctx.getImageData(e.point.x, e.point.y, 1, 1).data[0] == 0) {
            removePolygon.click()
        }
        drawCanvas();
    }
    if (activateDraw === 'true') {} else {
        isClickAreaAlreadyHighlighted = ctx.getImageData(e.point.x, e.point.y, 1, 1).data[0] != 0;
        getSelectedCellCoordinates(e);
        drawCanvas();
    }
});

// When the map starts to move, the canvas is cleared.
map.on('movestart', function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// When map resizes canvas is cleared and redrawn.
map.on('resize', function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// When the map stops moving the grid is drawn.
map.on('moveend', function() {
    drawCanvas();
});

// getSelectedCellCoordinates() is tied to the inital line draw for the grid.
// each line is stored in a map and compared to the click.  It adds to the x
// and y coordinates to find the closest line in all directions.
// these numbers give us the map key to check. The zoomMultiplier is concat
// to the end of the key to ensure unique keys for all cells.
function getSelectedCellCoordinates(e) {
    let xWest = e.point.x,
        xEast = e.point.x,
        ySouth = e.point.y,
        yNorth = e.point.y,
        cellID,
        westLineFromClick, northLineFromClick, eastLineFromClick, southLineFromClick,
        westLineFromClickString, northLineFromClickString, eastLineFromClickString, southLineFromClickString;

    while (mapLng2Screen.has(xWest) === false) {
        xWest--
    }
    westLineFromClick = mapLng2Screen.get(xWest);
    westLineFromClickString = westLineFromClick.toString();
    while (mapLng2Screen.has(xEast) === false) {
        xEast++
    }
    eastLineFromClick = mapLng2Screen.get(xEast);
    while (mapLat2Screen.has(yNorth) === false) {
        yNorth--
    }
    northLineFromClick = mapLat2Screen.get(yNorth);
    northLineFromClickString = northLineFromClick.toString();
    while (mapLat2Screen.has(ySouth) === false) {
        ySouth++
    }
    southLineFromClick = mapLat2Screen.get(ySouth);
    cellID = westLineFromClickString + northLineFromClickString + zoomMultiplier.toString();
    //log("click", e.point.x, e.point.y, "", "");
    //log("chose", xWest, xEast, yNorth, ySouth);
    // Check if cell is currently higlighted if so delete it.
    if (mapOfClickedCells.has(cellID)) {
        // if cell has already been clicked delete.
        mapOfClickedCells.delete(cellID);
    } else if (isClickAreaAlreadyHighlighted) {
        // If cell is highlighted color and part of a larger selection then draw in counter clockwise for hole in poly.
        mapOfClickedCells.set(cellID, [westLineFromClick, southLineFromClick, eastLineFromClick, northLineFromClick]);
    } else {
        // cell is not highlighted draw cell in clockwise order.
        mapOfClickedCells.set(cellID, [westLineFromClick, northLineFromClick, eastLineFromClick, southLineFromClick]);
    }
};

var westernLineNumber, easternLineNumber, southernLineNumber, northernLineNumber;

function drawCanvas() {
    mapLng2Screen.clear(), mapLat2Screen.clear();
    //log("START, drawCanvas(): ", "----", "----",  "----", "----");

    c.width = window.innerWidth;
    c.height = window.innerHeight;
    //log("Drawing Lines, Screen Width: ", c.width, " Screen Height: ",  c.height, "");

    boundingBox = map.getBounds();
    // westernLine and southernline are converted to
    // line lat and lng position by dividing the point
    // by the step, then parseInt, then multiply by
    // the step.
    westernLineDraw = parseInt(boundingBox._sw.lng / lngStep), easternLineDraw = parseInt(boundingBox._ne.lng / lngStep),
        southernLineDraw = parseInt(boundingBox._sw.lat / latStep), northernLineDraw = parseInt(boundingBox._ne.lat / latStep),

        // Count lng lines to determine zoom level.
        lngLineCount = easternLineDraw - westernLineDraw + 2

    // Count lat lines to determine zoom level.
    latLineCount = northernLineDraw - southernLineDraw + 2

    //log("Drawing Lines, Number of lng lines before zoom: ", lngLineCount, " Number of lat lines before zoom: " ,  latLineCount, "");

    // As the amount of lines passes the lngLineLimit the multiplier is
    // incremented in even numbers after 1.
    // Limit the number of lines shown on the screen to a convenient number.
    var lngLineLimit = parseInt(screen.width / rangeSlider.value);
    zoomMultiplier = parseInt(lngLineCount / lngLineLimit);
    if (zoomMultiplier < 1 || lngLineCount < lngLineLimit) {
        zoomMultiplier = 1
    } else if (lngLineCount > lngLineLimit && lngLineCount < lngLineLimit * 2) {
        zoomMultiplier = 2
    }
    //log("Drawing Lines, lng lines limit: ", lngLineLimit, " zoomMultiplier: " ,  zoomMultiplier, "");

    // Draw lng lines.
    var lngStartPosition, latStartPosition, projection, xPos, yPos, i = 0,
        southernLinePlusI, westernLinePlusI;
    while (i < lngLineCount) {
        // zoomMultiplier will be 1, 2, 4, 6 etc.
        // zoomMultiplier dictates a line be drawn every
        // 1, 2, 4, 6 step increments.
        // to ensure the grid does not shift the first point
        // will always be evenly divisble by the zoomMultiplier.
        westernLineDraw = parseInt(parseInt(westernLineDraw) / zoomMultiplier) * zoomMultiplier;
        if (i % zoomMultiplier == 0 || zoomMultiplier == 1) {
            // Subtract 1 from the westernLine to ensure full
            // screen coverage.
            westernLinePlusI = westernLineDraw + i;
            lngStartPosition = westernLinePlusI * lngStep;
            projection = map.project([lngStartPosition, 0]);
            xPos = parseInt(projection.x);
            ctx.moveTo(xPos, 0);
            ctx.lineTo(xPos, screen.height);
            mapLng2Screen.set(xPos, westernLinePlusI);
            //log("Drawing Lines, LNG Projection ", lngStartPosition, projection,  "", "");
        };
        i++;
    };

    // Draw lat lines.
    i = latLineCount;
    while (i >= 1) {
        // zoomMultiplier will be 1, 2, 4, 6 etc.
        // zoomMultiplier dictates a line be drawn every
        // 1, 2, 4, 6 step increments.
        // to ensure the grid does not shift the first point
        // will always be evenly divisble by the zoomMultiplier.
        southernLineDraw = parseInt(parseInt(southernLineDraw) / zoomMultiplier) * zoomMultiplier;
        if (i % zoomMultiplier == 0 || zoomMultiplier == 1) {
            southernLinePlusI = southernLineDraw + i;
            latStartPosition = southernLinePlusI * latStep;
            projection = map.project([0, latStartPosition]);
            yPos = parseInt(projection.y);
            ctx.moveTo(0, yPos);
            ctx.lineTo(screen.width, yPos);
            mapLat2Screen.set(yPos, southernLinePlusI);
            //log("Drawing Lines, LAT Projection ", latStartPosition, projection,  "", "");
        };
        i--;
    };
    if (gridOpacity === 0) {
        ctx.strokeStyle = 'rgb(255,255,255,0)';
    } else {
        ctx.strokeStyle = 'rgb(0,0,0,1)';
    }
    ctx.stroke();
    // Redraw mapOfClickedCells on move.
    var polyIndex = 0;
    // DRAW CLICKED CELLS AND POLY //
    console.log("arrayOfBoundaryPoints", arrayOfBoundaryPoints)
    if (arrayOfBoundaryPoints.length != 0) {
    console.log("Inside arrayOFBoundaryPoints")
    console.log(arrayOfBoundaryPoints)
        //ctx.beginPath();
        var lngLatPoint, seLine, poly, point, lngLatPoint, lngStartPoint, latStartPoint, zoom22Lng, zoom22Lat;
            poly = arrayOfBoundaryPoints;
            polyIndex = 0;
            ctx.fillStyle = 'rgba(255, 0, 0, .3)';
            lngLatPoint = map.project([poly[0]*lngStep, poly[1]*latStep]);
            ctx.moveTo(lngLatPoint.x, lngLatPoint.y);
            for (point = 2; point < poly.length - 1; point += 2) {
                console.log("Drawing point: ", poly[point], poly[point+1])
                lngLatPoint = map.project([poly[point] * lngStep, poly[point+1] * latStep]);
                ctx.fillRect(lngLatPoint.x, lngLatPoint.y, 10, 10);
                //ctx.lineTo(lngLatPoint.x, lngLatPoint.y)
            }
            //log("Drawing HIGHLIGHT Number of highlighted areas: ", i, poly,  "", "");
            i++;
            //ctx.closePath();
        //ctx.fill();
    }
    console.log("FINISH, drawCanvas(): ");
}

function log(message, data1, data2, data3, data4) {
    // tC = typeCheck.
    var tC1 = typeof data1,
        tC2 = typeof data2,
        tC3 = typeof data3,
        tC4 = typeof data4;
    if (tC1 === 'number') {
        data1 = data1.toString()
    } else if (tC1 == 'object') {
        data1 = JSON.stringify(data1);
    }
    if (tC2 === 'number') {
        data2 = data2.toString()
    } else if (tC2 == 'object') {
        data2 = JSON.stringify(data2);
    }
    if (tC3 === 'number') {
        data3 = data3.toString()
    } else if (tC3 == 'object') {
        data3 = JSON.stringify(data3);
    }
    if (tC4 === 'number') {
        data4 = data4.toString()
    } else if (tC4 == 'object') {
        data4 = JSON.stringify(data4);
    }
    console.log(message + " " + data1 + " " + data2 + " " + data3 + " " + data4)
}


function OLDisPointInPoly(point, vs) {
    // ray-casting algorithm based on
    // http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html

    var x = point[0],
        y = point[1];

    var inside = false;
    for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
        var xi = vs[i][0],
            yi = vs[i][1];
        var xj = vs[j][0],
            yj = vs[j][1];

        var intersect = ((yi > y) != (yj > y)) &&
            (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }

    return inside;
};
// activateDrawTool is set when the draw tool is clicked
// to prevent individual cells from being clicked.
// activateDraw is reset to false after successful
// commit of polygon draw tool.
function deActivateDrawTool() {
    activateDraw = 'false';
}

function activateDrawTool() {
    activateDraw = 'true';
}

var gridOpacity = 0;
var rangeSlider = document.getElementById("range_slider");
rangeSlider.oninput = function() {
    drawCanvas()
}

var rangeSliderContainer = document.getElementById("range-slider-container");
var showGrid = document.getElementById("grid_on");
var hideGrid = document.getElementById("grid_off");
showGrid.onclick = function() {
    hideGrid.style.backgroundColor = "#FCFCFC";
    showGrid.style.backgroundColor = "grey";
    rangeSliderContainer.style.display = "block";
    gridOpacity = 1;
    drawCanvas()
}

hideGrid.onclick = function() {
    showGrid.style.backgroundColor = "#FCFCFC";
    hideGrid.style.backgroundColor = "grey";
    rangeSliderContainer.style.display = "none";
    gridOpacity = 0;
    drawCanvas()
}

var showToolBarToggle = document.getElementById("show-hide-button");
var hideTools = document.getElementById("toggle");
showToolBarToggle.onclick = function() {
    if (hideTools.style.display === "none") {
        hideTools.style.display = "block";
        showToolBarToggle.style.backgroundColor = "#05B6C4";
        showToolBarToggle.innerHTML = "hide";
    } else {
        showToolBarToggle.style.backgroundColor = "#00A9B6";
        hideTools.style.display = "none";
        showToolBarToggle.innerHTML = "show";
    }
}

var isReverse = 'false';
var mapboxPolyTool = document.getElementsByClassName("mapbox-gl-draw_ctrl-draw-btn mapbox-gl-draw_polygon")[0];
document.getElementsByClassName("mapboxgl-ctrl-top-right")[0].style.opacity = 0;
var polygonDrawTool = document.getElementById("polygon");
polygonDrawTool.onclick = function() {
    isReverse = 'false';
    activateDrawTool();
    mapboxPolyTool.click();
}

document.getElementsByClassName("mapboxgl-ctrl-top-right")[0].style.opacity = 0;
var mapboxPolyTool = document.getElementsByClassName("mapbox-gl-draw_ctrl-draw-btn mapbox-gl-draw_polygon")[0];
var reversePolygonDrawTool = document.getElementById("reverse-polygon");
reversePolygonDrawTool.onclick = function() {
    isReverse = 'true';
    activateDrawTool();
    mapboxPolyTool.click();
}

var undoButton = document.getElementById("undo-history");
undoButton.onclick = function() {
    //console.log(undoHistory);
    undoHistory--
    drawCanvas();
}

var redoButton = document.getElementById("redo-history");
redoButton.onclick = function() {
    undoHistory++;
    drawCanvas();
}

// mapbox polygon will be deleted upon commit of highlighted area.
var mapboxDelete = document.getElementsByClassName("mapbox-gl-draw_ctrl-draw-btn mapbox-gl-draw_trash")[0];
var addHighlightedArea = document.getElementById("add_tool");
addHighlightedArea.onclick = function() {
    deActivateDrawTool();
    mapboxDelete.click();
    if (isReverse == 'true') {
        reverseDrawPolygonSelection();
    } else {
        drawPolygonSelection();
    }
}

var removePolygon = document.getElementById("clear_poly");
removePolygon.onclick = function() {
    deActivateDrawTool();
    mapboxDelete.click();
}
