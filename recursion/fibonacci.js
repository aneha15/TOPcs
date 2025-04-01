function fibs(n) {
  let arr = [0, 1];

  for (let i = 2; i < n; i++) {
    arr[i] = arr[i - 1] + arr[i - 2];
  }
  return arr;
}

function fibsRec(n) {
  if (n == 0) return [];
  if (n == 1) return [0];
  if (n == 2) return [0, 1];

  const prevArr = fibsRec(n - 1);
  prevArr.push(prevArr[prevArr.length - 1] + prevArr[prevArr.length - 2]);
  return prevArr;
}

console.log(fibs(8))
console.log(fibsRec(8))
