const reverse = (string) => {
  return string.split("").reverse().join("");
};

const average = (array) => {
  const reducer = (sum, item) => {
    console.log("sum", sum);
    console.log("item", item);
    return sum + item;
  };
  console.log("reducer", array.reduce(reducer, 0));

  return array.length === 0 ? 0 : array.reduce(reducer, 0) / array.length;
};

module.exports = {
  reverse,
  average,
};
