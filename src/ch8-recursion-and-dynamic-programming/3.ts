// magic index - check if a sorted array of distinct integers has a magic index where A[i] = i
export default function hasMagicIndexBS(nums: Array<number>, left: number = 0, right: number = nums.length - 1): boolean {
  if (left > right) {
    return false;
  }

  const midpoint = Math.floor((left + right) / 2);

  if (midpoint < nums[midpoint]) { // search left
    return hasMagicIndexBS(nums, left, midpoint - 1);
  } else if (midpoint > nums[midpoint]) { // search right
    return hasMagicIndexBS(nums, midpoint + 1, right);
  }

  // console.log(nums[midpoint], midpoint);

  return true;
}
// plan: use binary search to split the range of search recursively > compare nums[index] with index > if nums[index] == index: return true
// edge cases: last index, first index, empty, has magic index, not have magic index

// if there are duplicates
export function hasMagicIndexItr(nums: Array<number>): boolean {
  for (let i: number = 0; i < nums.length; i++) {
    if (nums[i] === i) {
      return true;
    }
  }

  return false;
}

// R: is it possible to use BS with duplicates?