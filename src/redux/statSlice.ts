import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface StatState {
  totalSongs: number;
  totalArtists: number;
  totalAlbums: number;
  totalGenres: number;
  songalbumdata: { album: string; totalSongs: number }[];
  loading: boolean;
  error: string | null;
}

const initialState: StatState = {
  totalSongs: 0,
  totalArtists: 0,
  totalAlbums: 0,
  totalGenres: 0,
  songalbumdata:[],
  loading: false,
  error: null,
}; 

const statSlice = createSlice({
  name: "stat",
  initialState,
  reducers: {

    // total songs
    fetchTotalsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchTotalsSuccess(state, action: PayloadAction<Partial<StatState>>) {
      state.totalSongs += action.payload.totalSongs || 0;
      state.totalArtists += action.payload.totalArtists || 0;
      state.totalAlbums += action.payload.totalAlbums || 0;
      state.totalGenres += action.payload.totalGenres || 0;
      state.loading = false;
    },
    fetchTotalsFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },

    fetchTotalSongsStart: () => {},
    fetchTotalArtistsStart: () => {},
    fetchTotalAlbumsStart: () => {},
    fetchTotalGenresStart: () => {},

    // song by album
    fetchTotalSongsByAlbumStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchTotalSongsByAlbumSuccess(
      state,
      action: PayloadAction<{ album: string; totalSongs: number }[]>
    ) {
      state.songalbumdata = action.payload;
      state.loading = false;
    },
    fetchTotalSongsByAlbumFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {

  // totals
  fetchTotalsStart,
  fetchTotalsSuccess,
  fetchTotalsFailure,
  fetchTotalSongsStart,
  fetchTotalArtistsStart,
  fetchTotalAlbumsStart,
  fetchTotalGenresStart,

  // songs in each album
  fetchTotalSongsByAlbumStart,
  fetchTotalSongsByAlbumSuccess,
  fetchTotalSongsByAlbumFailure,
} = statSlice.actions;
export default statSlice.reducer;
