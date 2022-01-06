import { Action, createReducer, on } from "@ngrx/store";
import { loadError } from "./actions";

export const ERROR_FEATURE_KEY = 'errors';

export interface State {
  message?: string;
  statusCode?: number
}

export const initialState: State[] = [];

const errorsReducer = createReducer(
  initialState,
  on(loadError, (state, action) =>  [...action.data]),
);

export const reducer = (state: State[], action: Action) => errorsReducer(state, action);
