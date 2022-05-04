// eight queens - implement n queens for input 8 and print
function isValidPlacement(board: Array<Array<string>>, row: number, col: number): boolean {
  for (let c: number = col - 1; c >= 0; c--) {
    if (board[row][c] === "Q") {
      return false;
    }
  } // prev cols

  for (let r: number = row - 1, c: number = col - 1; r >= 0 && c >= 0; r--, c--) {
    if (board[r][c] === "Q") {
      return false;
    }
  } // upper left diag

  for (let r: number = row + 1, c: number = col - 1; r < board.length && c >= 0; r++, c--) {
    if (board[r][c] === "Q") {
      return false;
    }
  } // bottom left diag

  return true;
}

function backtrack(result: Array<Array<Array<string>>>, board: Array<Array<string>>, col: number = 0): void {
  if (col >= board.length) {
    const deepCopyBoard = JSON.parse(JSON.stringify(board));

    result.push(deepCopyBoard);
    return;
  }

  for (let row: number = 0; row < board.length; row++) {
    board[row][col] = "Q";

    if (isValidPlacement(board, row, col)) {
      backtrack(result, board, col + 1);
    }

    board[row][col] = ".";
  }
}

export default function eightQueens(): Array<Array<Array<string>>> {
  const n = 8;
  const board: Array<Array<string>> = new Array(n).fill(null).map(() => new Array(n).fill("."));
  const result: Array<Array<Array<string>>> = [];

  backtrack(result, board);

  return result;
}

// [ // n = 4
//   [
//     [".", "Q", ".", "."],
//     [".", ".", ".", "Q"],
//     ["Q", ".", ".", "."],
//     [".", ".", "Q", "."]
//   ],
//   [
//     [".", ".", "Q", "."],
//     ["Q", ".", ".", "."],
//     [".", ".", ".", "Q"],
//     [".", "Q", ".", "."]
//   ],
// ]

// plan: this is a backtracking problem > initialize an 8x8 (or NxN) array > check if current cell is a valid placement of a queen > use backtracking
//  to check other posibilities > if we reach the 8th rown and 8th column, add solution to result