const GENRES_COUNT = 10;
const SONGS_COUNT = 200;
const BANDS_COUNT = 20;
const YEAR_MIN = 1986;
const YEAR_MAX = 2019;

const HEADERS = [{
  label: "Исполнитель",
  id: "band"
}, {
  label: "Песня",
  id: "song"
}, {
  label: "Жанр",
  id: "genre"
}, {
  label: "Год",
  id: "year"
}];

const ROWS_COUNT = [10, 25, 50, 100];
const DEFAULT_ROWS_COUNT = 10;
const DEFAULT_SORT_BY = "band";

export {
  GENRES_COUNT,
  SONGS_COUNT,
  BANDS_COUNT,
  YEAR_MIN,
  YEAR_MAX,
  HEADERS,
  ROWS_COUNT,
  DEFAULT_ROWS_COUNT,
  DEFAULT_SORT_BY
};