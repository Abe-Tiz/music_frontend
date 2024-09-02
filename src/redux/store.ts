import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import createSagaMiddleware from "redux-saga";
import songsReducer from "./songSlice";
import statReducer from "./statSlice";
import rootSaga from "../sagas/rootSaga";
import albumReducer from "./songAlbumSlice";

const sagaMiddleware = createSagaMiddleware();

// Combine all reducers
const rootReducer = combineReducers({
  songs: songsReducer,
  stat: statReducer,
  album: albumReducer,
});

// Define and export RootState
export type RootState = ReturnType<typeof rootReducer>;

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

// Run saga middleware
sagaMiddleware.run(rootSaga);
