function forEachPermutation(arr, callback, nextPos = 0) {
  if (arr.length === nextPos) {
    callback(arr);
    return;
  }
  for (let i = nextPos; i < arr.length; ++i) {
    let tmp = arr[nextPos];
    arr[nextPos] = arr[i];
    arr[i] = tmp;
    forEachPermutation(arr, callback, nextPos + 1);
    tmp = arr[nextPos];
    arr[nextPos] = arr[i];
    arr[i] = tmp;
  }
}

function tsp(arr) {
  let bestPerm = null;
  let bestScore = 0;

  forEachPermutation(arr, perm => {
    let score = 0;
    for (let i = 1; i < perm.length; ++i) {
      const dlat = perm[i].latitude - perm[i - 1].latitude;
      const dlng = perm[i].longitude - perm[i - 1].longitude;
      score += Math.sqrt(dlat * dlat + dlng * dlng);
    }
    if (bestPerm == null || score < bestScore) {
      bestScore = score;
      bestPerm = perm.slice(); // copy since it will change
    }
  });

  return bestPerm;
}

export default tsp;
