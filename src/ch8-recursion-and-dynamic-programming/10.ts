function helper(screen: Array<Array<number>>, xOfPt: number, yOfPt: number, newColor: number, oldColor: number): void {
  const isOutOfBounds: boolean = !screen[xOfPt];

  if (isOutOfBounds || screen[xOfPt][yOfPt] !== oldColor || screen[xOfPt][yOfPt] === newColor) { // || has old color || isVisited
    return;
  }

  helper(screen, xOfPt - 1, yOfPt, newColor, oldColor); // up
  helper(screen, xOfPt + 1, yOfPt, newColor, oldColor); // down
  helper(screen, xOfPt, yOfPt - 1, newColor, oldColor); // left
  helper(screen, xOfPt, yOfPt + 1, newColor, oldColor); // right
}

// paint fill -  Implement the "paint fil" function that one might see on many image editing programs.
// That is, given a screen (represented by a two-dimensional array of colors), a point, and a new color,
// fil in the surrounding area until the color changes from the original color.
export default function paintFill(screen: Array<Array<number>>, xOfPt: number, yOfPt: number, newColor: number): Array<Array<number>> {
  helper(screen, xOfPt, yOfPt, newColor, screen[xOfPt][yOfPt]); // update screen

  return screen;
}
/**
 * plan
 * - start from current index > if current color === oldColor: update color > check neighbors > if current color !== oldColor | out of bounds: return
 * - forgot to handle if starting color is already updated
 * cases
 * - all 0s ???, starting color is already newColor
 * time: O(m * n), space: O(1) - updated in place
 */