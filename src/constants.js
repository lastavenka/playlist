const GENRES_COUNT = 10;
const SONGS_COUNT = 500;
const BANDS_COUNT = 50;
const YEAR_MIN = 1986;
const YEAR_MAX = 2019;

const PLAYLIST_HEADERS = [{
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

const PLAYLIST_FILTERS = [{
  label: "Исполнитель",
  id: "band"
}, {
  label: "Жанр",
  id: "genre"
}, {
  label: "Год",
  id: "year"
}];

const PLAYLIST_ROWS_COUNT = [10, 25, 50, 100];
const PLAYLIST_DEFAULT_ROWS_COUNT = 10;
const PLAYLIST_DEFAULT_SORT_BY = "band";

export {
  GENRES_COUNT,
  SONGS_COUNT,
  BANDS_COUNT,
  YEAR_MIN,
  YEAR_MAX,
  PLAYLIST_HEADERS,
  PLAYLIST_FILTERS,
  PLAYLIST_ROWS_COUNT,
  PLAYLIST_DEFAULT_ROWS_COUNT,
  PLAYLIST_DEFAULT_SORT_BY
};