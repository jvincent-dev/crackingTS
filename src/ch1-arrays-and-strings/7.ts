// rotate matrix - Given an image represented by an NxN matrix, where each pixel in the image is 4
// bytes, write a method to rotate the image by 90 degrees. Can you do this in place?

export default function rotateMatrix(matrix: Array<Array<number>>): void {
  // set temp = left, swap left with top, top with right, right with bottom, and bottom with temp
  const n: number = matrix.length - 1;

  for (let i: number = 0; i < Math.floor(matrix.length / 2); i++) {
    for (let j: number = i; j < matrix.length - i - 1; j++) { // rotate outer most layer and i helps us go inward
      const temp: number = matrix[j][i]; // 1

      matrix[j][i] = matrix[n - i][j]; // 1 = 7 left value = bottom value - top left to bottom left - 1 = bottom left to bottom right - 1
      matrix[n - i][j] = matrix[n - j][n - i]; // 7 = 9 bottom value = right value - bottom left to bottom right - 1 = bottom right to top right - 1
      matrix[n - j][n - i] = matrix[i][n - j]; // 9 = 3 right value = top value - bottom right to top right - 1 = top left to top right - 1
      matrix[i][n - j] = temp; // 3 = 1 top value = leftvalue - top left to top right - 1 = top left to bottom left - 1
    }
  }
}
/**
 * plan
 * - rotate by layers starting from the outermost inward
 * cases
 * - odd and even NxN matrices, take note that the swapped matrix indices are also shrinking (so j should be shrinking too!!!)
 * time: O(n^2) - we have to go through all values anyway, space: O(1)
 */

/**
 * sample used in comments
 * [1,2,3],
 * [4,5,6],
 * [7,8,9]
 */

// [[2,2,9,1,7],[1,9,1,8,4],[4,6,8,2,1],[9,4,1,3,5],[6,2,5,7,3]]
// [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]