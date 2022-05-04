const COIN_VALUES = [25, 10, 5, 1];

// coins - given an infinite number of quarters, dimes, nickels, and pennies, write a function to calculate the number of ways to represent n cents
export default function coins(cents: number, currIndex: number = 0, map: any = {}): number {
  const cacheKey = cents + "-" + currIndex;

  if (map.hasOwnProperty(cacheKey)) { // is previously solved
    return map[cacheKey];
  } else if (cents === 0) { // reached 0 cents
    return 1;
  }

  const coin = COIN_VALUES[currIndex];
  let nCoinsInCents = Math.floor(cents / coin); // number of times a coin can be used
  let ways = 0;

  while (nCoinsInCents >= 0) {
    const centsLeft = cents - (coin * nCoinsInCents); // coin is used n times, n - 1, n - 2, etc...

    ways += coins(centsLeft, currIndex + 1, map);
    nCoinsInCents--;
  }

  map[cacheKey] = ways; // memoize

  return ways;
}
/**
 * plan
 * - loop through coins > for each coin: use each coin value n times (n being the number of times while cents is less than coin) > if all coin values
 *   are used: return 1; > memoize
 * cases
 * - don't count coin permutations, 0 input
 * time: O(n^2), space: O(n^2) - where n is the number of times coin_values are traversed to get to cents ???
 */

/**
 * 10 cents:
 * - 10
 * - 5, 5
 * - 5, 1 five times
 * - 1 ten times
 */