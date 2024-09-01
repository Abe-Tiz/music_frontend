import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AlbumState {
  totalSongByAlbum: { _id: string; totalSong: number }[];
  totalSongByGenre: { _id: string; totalSongs: number }[];
  totalSongAlbumByArtist: {
    _id: string;
    totalSongs: number;
    totalAlbums: number;
  }[];
  loading: boolean;
  error: string | null;
}

const initialState: AlbumState = {
  totalSongByAlbum: [],
  totalSongByGenre: [],
  totalSongAlbumByArtist: [],
  loading: false,
  error: null,
};

const albumSlice = createSlice({
  name: "album",
  initialState,
  reducers: {
    
    //   songs by album
    fetchTotalSongsRequest: (state) => {
      state.loading = true;
    },
    fetchTotalSongsSuccess: (
      state,
      action: PayloadAction<{ _id: string; totalSong: number }[]>
    ) => {
      state.totalSongByAlbum = action.payload;
      state.loading = false;
    },
    fetchTotalSongsFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },

    // songs and albums by artist
    fetchTotalSongsAlbumArtistRequest: (state) => {
      state.loading = true;
    },
    fetchTotalSongsAlbumArtisSuccess: (
      state,
      action: PayloadAction<
        { _id: string; totalSongs: number; totalAlbums: number }[]
      >
    ) => {
      state.totalSongAlbumByArtist = action.payload;
      state.loading = false;
    },
    fetchTotalSongsAlbumArtisFailure: (
      state,
      action: PayloadAction<string>
    ) => {
      state.error = action.payload;
      state.loading = false;
    },

    // songs by genre
    fetchTotalSongsGenreRequest: (state) => {
      state.loading = true;
    },
    fetchTotalSongsGenreSuccess: (
      state,
      action: PayloadAction<{ _id: string; totalSongs: number }[]>
    ) => {
      state.totalSongByGenre = action.payload;
      state.loading = false;
    },
    fetchTotalSongsGenreFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  fetchTotalSongsRequest,
  fetchTotalSongsSuccess,
  fetchTotalSongsFailure,

  // song and album by artist
  fetchTotalSongsAlbumArtistRequest,
  fetchTotalSongsAlbumArtisSuccess,
  fetchTotalSongsAlbumArtisFailure,

  // songs by genre
  fetchTotalSongsGenreRequest,
  fetchTotalSongsGenreSuccess,
  fetchTotalSongsGenreFailure,
} = albumSlice.actions;

export default albumSlice.reducer;
