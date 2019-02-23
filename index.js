import * as BABYLON from "babylonjs";
import cube from "./shapes/cube";
import buildShape from "./buildShape";
import buildBox from "./buildBox";
import { round } from "lodash";

// Get the canvas DOM element
var canvas = document.getElementById("renderCanvas");
// Load the 3D engine
var engine = new BABYLON.Engine(canvas, true, {
  preserveDrawingBuffer: true,
  stencil: true
});
// CreateScene function that creates and return the scene
var createScene = function() {
  // Create a basic BJS Scene object
  var scene = new BABYLON.Scene(engine);
  // Create a UniversalCamera, and set its position to {x: 0, y: 5, z: -10}
  var camera = new BABYLON.ArcRotateCamera(
    "Camera",
    0,
    0,
    10,
    new BABYLON.Vector3(0, 0, 0),
    scene
  );
  camera.setPosition(new BABYLON.Vector3(0, 10, 20));

  // Attach the camera to the canvas
  camera.attachControl(canvas, false);
  // Create a basic light, aiming 0, 1, 0 - meaning, to the sky
  var light = new BABYLON.HemisphericLight(
    "light1",
    new BABYLON.Vector3(0, 1, 0),
    scene
  );

  const startingBox = buildBox({
    label: "startingBox",
    scene,
    faceColors: [],
    position: {
      x: 0,
      y: 0,
      z: 0
    }
  });
  // var startingCube = BABYLON.MeshBuilder.CreateBox(`box`, {}, scene);

  scene.onPointerObservable.add(pointerInfo => {
    const { pickInfo } = pointerInfo;
    switch (pointerInfo.type) {
      case BABYLON.PointerEventTypes.POINTERDOWN:
        if (pickInfo.hit) {
          const { pickedMesh } = pickInfo;
          var faceVertices = pickedMesh.getIndices();

          var box = BABYLON.MeshBuilder.CreateBox(`box`, {}, scene);
          box.position.x = round(pickInfo.pickedPoint.x);
          box.position.y = round(pickInfo.pickedPoint.y);
          box.position.z = round(pickInfo.pickedPoint.z);

          var i = pickInfo.faceId * 3;
          var v1 = faceVertices[i];
          var v2 = faceVertices[i + 1];
          var v3 = faceVertices[i + 2];
          if (v1 === 0) {
            box.position.z = round(pickedMesh.position.z) + 1;
          } else if (v1 === 4) {
            box.position.z = round(pickedMesh.position.z) - 1;
          } else if (v1 === 12) {
            box.position.x = round(pickedMesh.position.x) - 1;
          }
          // console.log(v1 + "," + v2 + "," + v3);
          // console.log(box.position);
        }
        break;
    }
  });

  // buildShape(cube, scene);
  // Return the created scene
  return scene;
};
// call the createScene function
var scene = createScene();
// run the render loop
engine.runRenderLoop(function() {
  scene.render();
});
// the canvas/window resize event handler
window.addEventListener("resize", function() {
  engine.resize();
});
