import {UPDATE_NETLIST} from '../actions';

var covertToPointDictID = function (point) {
  return "x" + point.x + "y" + point.y
}

export default function netListReducer(state = "", action) {
  switch (action.type) {
  case UPDATE_NETLIST:
    //action value is json type, get from store.getstate().views
    var __views__ = action.views;
    var notionDict =
      {
        "Resistor": "R",
        "ResistorT": "Rt",
        "Capacitor": "C",
        "Inductor": "L",
        "VoltageSource": "V",
        "VoltageSourceG": "Vg"
      }

    //console.log(views);

    var pointListWithoutGround = [];
    var pointDictionary = {};
    var groundPoints = [];
    var ID = 1;
    var temp;
    var netlist = "";

    //Build not-ground point list
    //Set point connect to ground 0
    __views__.map(function (ele) {
      if (ele.typeID == "Ground") {
        var point1 = covertToPointDictID(ele.dragPoints[0]);
        var point2 = covertToPointDictID(ele.dragPoints[1]);

        pointDictionary[point1] = 0;
        pointDictionary[point2] = 0;
      }
    })

    //Set points of wire same ID
    __views__.map(function (ele) {
      if (ele.typeID == "Wire") {
        var point1 = covertToPointDictID(ele.dragPoints[0]);
        var point2 = covertToPointDictID(ele.dragPoints[1]);

        if (pointDictionary[point1] != undefined) {
          pointDictionary[point2] = 0
        } else if (pointDictionary[point2] != undefined) {
          pointDictionary[point1] = 0
        } else {
          pointDictionary[point1] = ID;
          pointDictionary[point2] = ID;

          ID += 1;
        }
      }
    })

    __views__.map(function (ele) {
      if (ele.typeID == "Ground" || ele.typeID == "Wire") {
        return;
      }

      ele.dragPoints.map(function (dragPoint) {
        var point = covertToPointDictID(dragPoint);
        if (pointDictionary[point] == undefined) {
          console.log("drag point", dragPoint);
          pointDictionary[point] = ID;
          ID += 1;
        }
      })

    })

    //console.log("pointDictionary",pointDictionary)

    //Build Netlist
    var componentNumManager =
      {
        "Resistor": 0,
        "ResistorT": 0,
        "Capacitor": 0,
        "Inductor": 0,
        "VoltageSource": 0,
        "VoltageSourceG": 0
      };

    __views__.map(function (ele) {
      if (ele.typeID == "Ground" || ele.typeID == "Wire") {
        return;
      }

      var point1 = ele.dragPoints[0];
      var point2 = ele.dragPoints[1];

      var point1ID = pointDictionary[covertToPointDictID(point1)];
      var point2ID = pointDictionary[covertToPointDictID(point2)];

      netlist += notionDict[ele.typeID] + " " + componentNumManager[ele.typeID] + " " + point1ID + " " + point2ID + " ";
      componentNumManager[ele.typeID] += 1;
      for (var prop in ele.editables) {
        var eleValue = ele.editables[prop].value
        if (eleValue == undefined) continue;
        netlist += eleValue + " "
      }
      netlist += "\n";
    });

    return netlist;

  default:
    return "error while storing Netlist";
  }
}
