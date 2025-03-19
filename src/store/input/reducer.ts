import { PayloadAction } from "@reduxjs/toolkit";
import { IInput } from "./type";

export const inputReducer = {
  changeNumberOfImages(state: IInput, action: PayloadAction<number>) {
    if (action.payload < 0 && state.numberOfImages === 1) return;
    if (action.payload > 0 && state.numberOfImages === 4) return;
    state.numberOfImages += action.payload;
  },
  setReferencePhoto(state: IInput, action: PayloadAction<string | null>) {
    state.referencePhoto = action.payload;
  },
  setTargetPhoto(state: IInput, action: PayloadAction<string | null>) {
    state.targetPhoto = action.payload;
  },
  setIsLoading(state: IInput, action: PayloadAction<boolean>) {
    state.isLoading = action.payload;
  },
};
