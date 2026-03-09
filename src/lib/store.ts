import authReducer from '@/stores/entity/auth.store';
import logoutDialogReducer from '@/stores/dialog/logout';
import { configureStore } from '@reduxjs/toolkit';
import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from "redux-persist";
import storage from "@/lib/redux-storage"; // localStorage
import { combineReducers } from "redux";

export const rootReducer = combineReducers({
	auth: authReducer,
	logoutDialog: logoutDialogReducer,
});

const persistConfig = {
	key: "apps-state",
	storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: {
				// Abaikan validasi serialisasi pada action dan state yang dilakukan redux-persist
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
});

export const persistor = persistStore(store);

// Infer the `RootState`,  `AppDispatch`, and `AppStore` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store