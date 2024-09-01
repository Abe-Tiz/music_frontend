import { all } from "redux-saga/effects";
import {
  watchCreateSong,
  watchDeleteSong,
  watchFetchSongs,
  watchFetchSongsByGenre,
  watchFetchTotals,
  watchUpdateSong,
} from "./songsSaga";
import { albumSaga } from "./albumSaga";

export default function* rootSaga() {
  yield all([
    watchFetchSongs(),
    watchCreateSong(),
    watchDeleteSong(),
    watchUpdateSong(),
    watchFetchSongsByGenre(),
    watchFetchTotals(),
    albumSaga(),
  ]);}
