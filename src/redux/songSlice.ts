import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Song } from "./types";

interface SongsState {
  songs: Song[];
  loading: boolean;
  error: string | null;
}

const initialState: SongsState = {
  songs: [],
  loading: false,
  error: null,
};

const songsSlice = createSlice({
  name: "songs",
  initialState,
  reducers: {

    // display
    fetchSongs(state) {
      state.loading = true;
    },
    fetchSongsSuccess(state, action: PayloadAction<Song[]>) {
      state.loading = false;
      state.songs = action.payload;
      state.error = null;
    },
    fetchSongsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    // create
    createSong(state) {
      state.loading = true;
    },
    createSongSuccess(state, action) {
      state.loading = false;
      state.songs.push(action.payload);
      state.error = null;
    },
    createSongFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // delete
    deleteSong(state) {
      state.loading = true;
    },
    deleteSongSuccess(state, action) {
      state.loading = false;
      state.songs = state.songs.filter((song) => song._id !== action.payload);
      state.error = null;
    },
    deleteSongFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // update
    updateSong(state) {
      state.loading = true;
    },
    updateSongSuccess(state, action) {
      state.loading = false;
      const index = state.songs.findIndex(
        (song) => song._id === action.payload._id
      );
      if (index !== -1) {
        state.songs[index] = action.payload;
      }
      state.error = null;
    },
    updateSongFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // filter
    fetchSongsByGenre(state) {
      state.loading = true;
    },
    fetchSongsByGenreSuccess(state, action) {
      state.loading = false;
      state.songs = action.payload;  
      state.error = null;
    },
    fetchSongsByGenreFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  // display
  fetchSongs,
  fetchSongsSuccess,
  fetchSongsFailure,

  // register songs
  createSong,
  createSongSuccess,
  createSongFailure,

  // delete songs
  deleteSong,
  deleteSongSuccess,
  deleteSongFailure,

  // update songs
  updateSong,
  updateSongSuccess,
  updateSongFailure,

  // filter by genre
  fetchSongsByGenre,
  fetchSongsByGenreSuccess,
  fetchSongsByGenreFailure,
} = songsSlice.actions;


export default songsSlice.reducer;

