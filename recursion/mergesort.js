function merge(a, b) {
  // a and b are sorted arrays to be merged

  let i = 0; // counter for a
  let j = 0; // counter for b

  const c = [];

  while (i < a.length && j < b.length) {
    if (a[i] < b[j]) {
      c.push(a[i]);
      i++;
    } else {
      c.push(b[j]);
      j++;
    }
  }

  // copy remaining elements
  while (i < a.length) {
    c.push(a[i])
    i++
  }

  while (j < b.length) {
    c.push(b[j])
    j++
  }

  return c
}

export function mergesort(arr) {
  // base case
  if (arr.length <= 1) return arr;

  const mid = Math.floor(arr.length / 2);
  const a = arr.slice(0, mid);
  const b = arr.slice(mid);

  return merge(mergesort(a), mergesort(b));
}


// console.log(mergesort([3, 1, 2, 5, 1, 4, 7]));