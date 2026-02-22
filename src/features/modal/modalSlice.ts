import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IBook } from "../../types";

type ModalType = "view" | "edit" | "borrow" | null;

interface ModalState {
  type: ModalType;
  book: IBook | null;
}

const initialState: ModalState = {
  type: null,
  book: null,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (
      state,
      action: PayloadAction<{ type: Exclude<ModalType, null>; book: IBook }>,
    ) => {
      state.type = action.payload.type;
      state.book = action.payload.book;
    },
    closeModal: (state) => {
      state.type = null;
      state.book = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
