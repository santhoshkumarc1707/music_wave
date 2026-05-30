import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import authReducer from "./authSlice";
// import usersReducer from "./usersSlice";
// import songsReducer from "./songsSlice";
import PlaylistReducer from "./playlistSlice/playlistSlice";
import profileSlice from "./ProfileSlice";
import searchReducer from "./searchSlice"
const reducers = combineReducers({
	// users: usersReducer,
	// songs: songsReducer,
	auth: authReducer,
	songs: PlaylistReducer,
	profile: profileSlice,
	search: searchReducer,

});

const persistConfig = {
	key: "root",
	storage,
	whitelist: ["auth"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({ serializableCheck: false }),
});

export default store;
