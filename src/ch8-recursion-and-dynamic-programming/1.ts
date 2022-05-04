// tripple step - a child can run 1, 2, or 3 steps up an n staircase. implement a function that counts possible ways to go up
// time: space:
export default function trippleStep(steps: number): number {
  if (steps === 0) {
    return 1;
  } else if (steps < 0) {
    return 0;
  }

  return trippleStep(steps - 1) + trippleStep(steps - 2) + trippleStep(steps - 3);
}

// plan: set base cases of (steps === 0) and (steps < 0) > call each step deduction recusively
// edge cases: remaining steps < 0

export function trippleStepDP(steps: number): number {
  const dp: Array<number> = [1, 2, 4];

  for (let i: number = 3; i < steps; i++) {
    dp[i] = dp[i - 3] + dp[i - 2] + dp[i - 1];
  }

  return dp[steps - 1];
} // builds off of past calculated steps
