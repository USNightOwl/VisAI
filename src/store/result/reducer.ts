import { PayloadAction } from "@reduxjs/toolkit";
import { IImageResultRoot } from "./type";
import toast from "react-hot-toast";
import { addData, Stores } from "@/config/db";
import { IHistory } from "@/types/history";
import { v4 as uuidv4 } from "uuid";

function storeToIndexedDB(url: string) {
  addData<IHistory>(Stores.HistoryItems, { id: uuidv4(), imageDataUrl: url, timestamp: new Date().getTime() })
    .then()
    .catch((err: unknown) => {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("Something went wrong");
      }
    });
}

export const resultsReducer = {
  setResult(state: IImageResultRoot, action: PayloadAction<string>) {
    state.results = [
      {
        id: 1,
        url: action.payload,
      },
    ];

    // store to indexedDB
    storeToIndexedDB(action.payload);
  },
  setResults(state: IImageResultRoot, action: PayloadAction<string[]>) {
    for (const image of action.payload) {
      state.results.push({
        id: state.results.length,
        url: image,
      });
      storeToIndexedDB(image);
    }
  },
  pushResult(state: IImageResultRoot, action: PayloadAction<string>) {
    state.results.push({
      id: state.results.length,
      url: action.payload,
    });
    storeToIndexedDB(action.payload);
  },
};
