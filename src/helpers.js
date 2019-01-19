const getRandom = (min, max) => (min + Math.floor(Math.random() * (max - min)));
const getRandomFromArr = arr => arr[getRandom(0, arr.length - 1)];

export {
  getRandom,
  getRandomFromArr
};
