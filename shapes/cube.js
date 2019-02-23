import { times, flatten } from "lodash";

const size = 4;

const cube = flatten(
  flatten(times(size, x => times(size, y => times(size, z => [x, y, z]))))
);

const shiftedCube = cube.map(
  (pixel, index) =>
    (cube[index] = [
      pixel[0] - size / 2 + 0.5,
      pixel[1] - size / 2 + 0.5,
      pixel[2] - size / 2 + 0.5
    ])
);
export default shiftedCube;
