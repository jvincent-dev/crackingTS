// String Rotation
function isSubstring(str1: string, str2: string): boolean {
  return str1.includes(str2);
}

// time: O(n); space: O(n)
export function isStringRotation(str1: string, str2: string): boolean {
  // loop through string 1 > add each char and count to map > loop through str2 > remove each reduce and remove each char and count > return map.size == 0
  if (str1.length !== str2.length) {
    return false;
  }

  return isSubstring(str1 + str1, str2);
}
