import * as BABYLON from "babylonjs";

const buildBox = ({ label, faceColors, scene, position }) => {
  const onOver = meshEvent => {
    const result = scene.pick(meshEvent.pointerX, meshEvent.pointerY);
    if (result.hit) {
      const { pickedMesh } = result;

      const faceVertices = pickedMesh.getIndices();
      var vColors = pickedMesh.getVerticesData(BABYLON.VertexBuffer.ColorKind);
      console.log(vColors);
      //http://www.html5gamedevs.com/topic/20747-facecolor-revisited/
      var i = result.faceId * 3;
      var v1 = faceVertices[i];
      var v2 = faceVertices[i + 1];
      var v3 = faceVertices[i + 2];
      var v4 = faceVertices[i + 3];

      //   console.log(v1);

      //   for (var v = 0; v < 4; v++) {
      //     vColors[v * 4] = 0;
      //     vColors[v * 4 + 1] = 0;
      //     vColors[v * 4 + 2] = BABYLON.Color3.Green();
      //   }

      vColors[v1] = BABYLON.Color3.Blue();

      pickedMesh.updateVerticesData(BABYLON.VertexBuffer.ColorKind, vColors);
    }
  };

  const box = BABYLON.MeshBuilder.CreateBox(
    label,
    {
      faceColors,
      updatable: true
    },
    scene
  );

  // Set position in the scene.
  box.position.y = position.x || 0;
  box.position.x = position.y || 0;
  box.position.z = position.z || 0;

  // Set hover actions.
  box.actionManager = new BABYLON.ActionManager(scene);
  box.actionManager.registerAction(
    new BABYLON.ExecuteCodeAction(
      BABYLON.ActionManager.OnPointerOverTrigger,
      onOver
    )
  );

  return box;
};

export default buildBox;
