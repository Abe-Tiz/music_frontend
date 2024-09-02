import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  fetchSongsSuccess,
  fetchSongsFailure,
  createSong,
  createSongSuccess,
  createSongFailure,
  deleteSongSuccess,
  deleteSongFailure,
  deleteSong,
  updateSongSuccess,
  updateSongFailure,
  updateSong,
  fetchSongsByGenreSuccess,
  fetchSongsByGenreFailure,
  fetchSongsByGenre,
} from "../redux/songSlice";
import {
  fetchTotalsFailure,
  fetchTotalsStart,
  fetchTotalsSuccess,
} from "../redux/statSlice";


interface CreateSongAction {
  type: string;  
  payload: {
    _id:string;
    title: string;
    artist: string;
    album: string;
    genre: string;
  };
}

// display
function* fetchSongsSaga(): Generator {
  try {
    const response:any = yield call(() => axios.get("https://music-backend-t7zo.onrender.com/song"));
    yield put(fetchSongsSuccess(response.data));
  } catch (error:any) {
    yield put(fetchSongsFailure(error.message));
  }
}

export function* watchFetchSongs() {
  yield takeLatest("songs/fetchSongs", fetchSongsSaga);
}

// create
function* createSongAsync(action: CreateSongAction):Generator {
  try {
    const response:any = yield call(
      axios.post,
      "https://music-backend-t7zo.onrender.com/song/create",
      action.payload
    );
    yield put(createSongSuccess(response.data));
  } catch (error:any) {
    yield put(createSongFailure(error.message));
  }
}

export function* watchCreateSong() {
  yield takeLatest(createSong.type, createSongAsync);
}

// delete
function* deleteSongAsync(action: CreateSongAction) {
  try {
    yield call(
      axios.delete,
      `https://music-backend-t7zo.onrender.com/song/delete/${action.payload}`
    );
    yield put(deleteSongSuccess(action.payload));
  } catch (error:any) {
    yield put(deleteSongFailure(error.message));
  }
}


export function* watchDeleteSong() {
  yield takeLatest(deleteSong.type, deleteSongAsync);
}

// update
function* updateSongAsync(action: CreateSongAction):Generator {
  try {
    const response:any = yield call(
      axios.put,
      `https://music-backend-t7zo.onrender.com/song/update/${action.payload._id}`,
      action.payload
    );
    yield put(updateSongSuccess(response.data));
  } catch (error: any) {
    yield put(updateSongFailure(error.message));
  }
}

export function* watchUpdateSong() {
  yield takeLatest(updateSong.type, updateSongAsync);
}

// filter
function* fetchSongsByGenreAsync(action: CreateSongAction):Generator {
  try {
    const response:any = yield call(
      axios.post,
      "https://music-backend-t7zo.onrender.com/song/filter-artist-genre",
      { genre: action.payload }
    );
    yield put(fetchSongsByGenreSuccess(response.data)); 
  } catch (error:any) {
    yield put(fetchSongsByGenreFailure(error.message));
  }
}

export function* watchFetchSongsByGenre() {
  yield takeLatest(fetchSongsByGenre.type, fetchSongsByGenreAsync);
}

// total statistics
function* fetchTotalSongsSaga(): Generator {
  try {
    yield put(fetchTotalsStart());
    const response:any = yield call(
      axios.get,
      "https://music-backend-t7zo.onrender.com/song/total-song"
    );
    yield put(
      fetchTotalsSuccess({
        totalSongs: response.data.total,
        totalArtists: 0,
        totalAlbums: 0,
        totalGenres: 0,
      })
    ); // Just updating totalSongs
  } catch (error:any) {
    yield put(fetchTotalsFailure(error.message));
  }
}

// Saga for fetching total artists
function* fetchTotalArtistsSaga(): Generator {
  try {
    yield put(fetchTotalsStart());
    const response:any = yield call(
      axios.get,
      "https://music-backend-t7zo.onrender.com/song/total-artist"
    );
    yield put(
      fetchTotalsSuccess({
        totalSongs: 0,
        totalArtists: response.data.total,
        totalAlbums: 0,
        totalGenres: 0,
      })
    ); // Just updating totalArtists
  } catch (error:any) {
    yield put(fetchTotalsFailure(error.message));
  }
}

// Saga for fetching total albums
function* fetchTotalAlbumsSaga(): Generator {
  try {
    yield put(fetchTotalsStart());
    const response:any = yield call(
      axios.get,
      "https://music-backend-t7zo.onrender.com/song/total-album"
    );
    yield put(
      fetchTotalsSuccess({
        totalSongs: 0,
        totalArtists: 0,
        totalAlbums: response.data.total,
        totalGenres: 0,
      })
    ); // Just updating totalAlbums
  } catch (error:any) {
    yield put(fetchTotalsFailure(error.message));
  }
}

// Saga for fetching total genres
function* fetchTotalGenresSaga(): Generator {
  try {
    yield put(fetchTotalsStart());
    const response:any = yield call(
      axios.get,
      "https://music-backend-t7zo.onrender.com/song/total-genre"
    );
    yield put(
      fetchTotalsSuccess({
        totalSongs: 0,
        totalArtists: 0,
        totalAlbums: 0,
        totalGenres: response.data.total,
      })
    ); // Just updating totalGenres
  } catch (error:any) {
    yield put(fetchTotalsFailure(error.message));
  }
}

export function* watchFetchTotals() {
  yield takeLatest("stat/fetchTotalSongsStart", fetchTotalSongsSaga);
  yield takeLatest("stat/fetchTotalArtistsStart", fetchTotalArtistsSaga);
  yield takeLatest("stat/fetchTotalAlbumsStart", fetchTotalAlbumsSaga);
  yield takeLatest("stat/fetchTotalGenresStart", fetchTotalGenresSaga);
}



