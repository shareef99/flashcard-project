import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface FlashcardState {
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
  },
});

export const { addFlashcard } = flashcardSlice.actions;

export default flashcardSlice.reducer;
