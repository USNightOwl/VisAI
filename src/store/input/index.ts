import { createSlice } from "@reduxjs/toolkit";
import { Store } from "../name";
import { IInput } from "./type";
import { inputReducer } from "./reducer";

const initialState: IInput = {
  numberOfImages: 1,
  referencePhoto: null,
  targetPhoto: null,
  isLoading: false,
};

const inputSlice = createSlice({
  name: Store.INPUT,
  initialState,
  reducers: inputReducer,
});

const { actions, reducer } = inputSlice;

export const { changeNumberOfImages, setReferencePhoto, setTargetPhoto, setIsLoading } = actions;

export default reducer;
