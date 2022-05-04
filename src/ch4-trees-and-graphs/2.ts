import BST from "./util/BinarySearchTree";

// minimal tree - given a sorted (increasing order) array with unique integer elements, write an alg to create a BST with minimal height
function helper(nums: Array<number>, result: BST<number>, lower: number = 0, upper: number = nums.length - 1): void {
  if (lower > upper) {
    return;
  }

  const mid = Math.ceil((lower + upper) / 2); // floor() puts most nodes to the right and ceil() to the left

  result.insert(nums[mid]);

  helper(nums, result, lower, mid - 1); // find left (midpoint) node
  helper(nums, result, mid + 1, upper); // find right (midpoint) node
}

export default function minimalTree(nums: Array<number>): BST<number> {
  const bst: BST<number> = new BST();

  helper(nums, bst);

  return bst;
}