// parens - implement an alg to print all valid (properly opened and closed) combination of n parenthesis
export default function parenths(
  parenCount: number = 0,
  combinations: Array<string> = [],
  currentCombo: string = "",
  leftCount: number = 0,
  rightCount: number = 0
): Array<string> {
  if (currentCombo.length === parenCount * 2) {
    combinations.push(currentCombo);
    return [];
  }

  if (leftCount < parenCount) {
    parenths(parenCount, combinations, currentCombo + "(", leftCount + 1, rightCount);
  }

  if (rightCount < leftCount) {
    parenths(parenCount, combinations, currentCombo + ")", leftCount, rightCount + 1);
  }

  return combinations;
}
// plan: recursively add left and right parens until currentCombo.length === parenCount * 2
// time: O(n), space: O(n)
// note: if the code doesn't run well, use an example and run through it manually