function add(a, b) {
  return a + b;
}
function sub(a, b) {
  return a - b;
}

function sum(arr) {
  total = 0;
  for (let i = 0; i < arr.length; i++) {
    total = total + arr[i];
  }
  return total;
}

module.exports.sum = sum;
module.exports.add = add;
module.exports.sub = sub;
