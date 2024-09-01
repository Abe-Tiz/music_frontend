import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  fetchTotalSongsAlbumArtisFailure,
  fetchTotalSongsAlbumArtisSuccess,
  fetchTotalSongsAlbumArtistRequest,
  fetchTotalSongsFailure,
  fetchTotalSongsGenreFailure,
  fetchTotalSongsGenreRequest, 
  fetchTotalSongsGenreSuccess,
  fetchTotalSongsRequest,
  fetchTotalSongsSuccess
} from "../redux/songAlbumSlice";
 
// songs in album
function* fetchTotalSongsSaga() {
  try {
    const response:string = yield call(axios.get,
      "https://music-backend-t7zo.onrender.com/song/total-song-album"
    ); 
    yield put(fetchTotalSongsSuccess(response.data));  
  } catch (error: any) {
    yield put(fetchTotalSongsFailure(error.message)); 
  }
}

// song and album by artist
function* fetchTotalSongsAlbumArtistSaga() {
  try {
    const response: string = yield call(
      axios.get,
      "https://music-backend-t7zo.onrender.com/song/total-song-album-artist"
    );
    yield put(fetchTotalSongsAlbumArtisSuccess(response.data));  
  } catch (error: any) {
    yield put(fetchTotalSongsAlbumArtisFailure(error.message));  
  }
}

// songs by genre
function* fetchTotalSongsGenreSaga() {
  try {
    const response: string = yield call(
      axios.get,
      "https://music-backend-t7zo.onrender.com/song/total-song-genre"
    );
    yield put(fetchTotalSongsGenreSuccess(response.data));
  } catch (error: any) {
    yield put(fetchTotalSongsGenreFailure(error.message));
  }
}

export function* albumSaga() {
    yield takeLatest(fetchTotalSongsRequest.type, fetchTotalSongsSaga);
    yield takeLatest(fetchTotalSongsAlbumArtistRequest.type, fetchTotalSongsAlbumArtistSaga);
    yield takeLatest(fetchTotalSongsGenreRequest.type,fetchTotalSongsGenreSaga);
}
