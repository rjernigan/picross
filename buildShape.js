import * as BABYLON from "babylonjs";
import { times } from "lodash";
import buildBox from "./buildBox";

const buildShape = (shape, scene) => {
  var faceColors = new Array(6);

  times(6, number => {
    faceColors[number] = new BABYLON.Color4(0, 1, 0, 0);
  });

  shape.forEach((coords, index) => {
    const [x, y, z] = coords;
    buildBox({
      label: `box${index}`,
      faceColors,
      scene,
      position: {
        x,
        y,
        z
      }
    });
  });
};

export default buildShape;
