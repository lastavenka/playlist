import faker from "faker";
import {
  GENRES_COUNT,
  SONGS_COUNT,
  BANDS_COUNT,
  YEAR_MIN,
  YEAR_MAX
} from "./constants";
import {
  getRandom,
  getRandomFromArr
} from "./helpers";

const generateData = () => {
  let names = [];
  let genres = [];
  let data = [];

  for (let i = 1; i < BANDS_COUNT; i++) {
    names.push(faker.random.word());
  }

  for (let i = 0; i < GENRES_COUNT; i++) {
    genres.push(faker.random.word());
  }

  for (let i = 0; i < SONGS_COUNT; i++) {
    data[i] = {
      band: getRandomFromArr(names),
      song: faker.random.words(),
      genre: getRandomFromArr(genres),
      year: getRandom(YEAR_MIN, YEAR_MAX)
    }
  }

  // Response delay imitation
  return new Promise(resolve => setTimeout(() => resolve({
    status: 200,
    data: JSON.stringify(data)
  }), 1500));
}

export default generateData;
