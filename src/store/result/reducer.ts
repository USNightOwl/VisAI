import { PayloadAction } from "@reduxjs/toolkit";
import { IImageResultRoot } from "./type";

export const resultsReducer = {
  setResult(state: IImageResultRoot, action: PayloadAction<string>) {
    state.results = [
      {
        id: 1,
        url: action.payload,
      },
    ];
  },
  setResults(state: IImageResultRoot, action: PayloadAction<string[]>) {
    for (const image of action.payload) {
      state.results.push({
        id: state.results.length,
        url: image,
      });
    }
  },
  pushResult(state: IImageResultRoot, action: PayloadAction<string>) {
    state.results.push({
      id: state.results.length,
      url: action.payload,
    });
  },
};
