import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import createSagaMiddleware from "redux-saga";
import songsReducer from "./songSlice";
import statReducer from "./statSlice";
import rootSaga from "../sagas/rootSaga";
import albumReducer from "./songAlbumSlice";

const sagaMiddleware = createSagaMiddleware();

// combile all reducers
const rootReducer = combineReducers({
  songs: songsReducer,
  stat: statReducer,
  album: albumReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

// run saga middleware
sagaMiddleware.run(rootSaga);
