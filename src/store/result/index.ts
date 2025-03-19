import { createSlice } from "@reduxjs/toolkit";
import { Store } from "../name";
import { IImageResultRoot } from "./type";
import { resultsReducer } from "./reducer";

const initialState: IImageResultRoot = {
  results: [],
};

const resultsSlice = createSlice({
  name: Store.RESULT,
  initialState,
  reducers: resultsReducer,
});

const { actions, reducer } = resultsSlice;

export const { setResult, setResults } = actions;

export default reducer;
