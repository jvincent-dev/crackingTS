function findPoints(matrix: Array<Array<number>>) {
  // loop through matrix > if value === 0, add point (r, c) to points
  const points: Array<Array<number>> = matrix.reduce((points: Array<Array<number>>, row: Array<number>, r: number) => {
    row.forEach((val: number, c: number) => {
      if (val === 0) {
        points.push([r, c]);
      }
    });

    return points;
  }, []);

  return points;
}

function helper(point: Array<number>, matrix: Array<Array<number>>) { // do row first, then col
  const [r, c]: Array<number> = point;

  for (let i: number = 0; i < matrix[r].length; i++) { // set row of 0s
    matrix[r][i] = 0;
  }

  for (let i: number = 0; i < matrix.length; i++) { // set col of 0s
    matrix[i][c] = 0;
  }
}

// zero matrix - Write an algorithm such that if an element in an MxN matrix is 0, its entire row and column are set to 0.
export default function setZeroes(matrix: Array<Array<number>>) {
  const zeroPoints: Array<Array<number>> = findPoints(matrix);

  zeroPoints.forEach(point => helper(point, matrix));
};
/**
 * plan
 * - collect points with 0s > update rows and columns of those points to 0s
 * cases
 * - out of bounds, values that were previously non 0s
 * time: O(n*m), space: O(n^2) - storing points
 */