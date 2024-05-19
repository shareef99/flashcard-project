import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface FlashcardState {
  id: number;
  groupName: string;
  groupDescription: string;
  groupImage: string;
  terms: {
    name: string;
    description: string;
    image: string;
  }[];
}

const initialState: FlashcardState[] = [];

export const flashcardSlice = createSlice({
  name: "flashcard",
  initialState,
  reducers: {
    addFlashcard: (state, action: PayloadAction<FlashcardState>) => {
      state.push(action.payload);
    },
    removeFlashcard: (state, action: PayloadAction<number>) => {
      return state.filter((flashcard) => flashcard.id !== action.payload);
    },
  },
});

export const { addFlashcard, removeFlashcard } = flashcardSlice.actions;

export default flashcardSlice.reducer;
