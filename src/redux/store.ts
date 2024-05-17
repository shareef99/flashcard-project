import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { useSelector, useDispatch } from "react-redux";
import flashcardReducer from "./flashcardSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistedReducer = persistReducer(
  {
    key: "flashcard-project",
    storage,
  },
  combineReducers({ flashcards: flashcardReducer }),
);

export const store = configureStore({
  reducer: persistedReducer,
});
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector = useSelector.withTypes<RootState>();

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
