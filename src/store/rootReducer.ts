import { AnyAction, combineReducers, Reducer } from "redux";
import { AppState } from ".";
import resultsSlice from "./result";
import inputSlice from "./input";

export const DESTROY_ACTION = "DESTROY_STORE";

export const combinedReducer = combineReducers({
  results: resultsSlice,
  input: inputSlice,
});

const rootReducer: Reducer = (state: AppState, action: AnyAction) => {
  if (action.type === DESTROY_ACTION) {
    state = {} as AppState;
  }
  return combinedReducer(state, action);
};

export default rootReducer;
