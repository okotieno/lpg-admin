import { Action, createReducer, on } from "@ngrx/store";
import { loadError } from "./actions";

export const ERROR_FEATURE_KEY = 'errors';

export interface State {
  formErrors: { message: string }[],
  pageError: {
    message?: string;
    status?: number;
    help?: string
  }
}

export const initialState: State = {
  formErrors: [],
  pageError: {}
};

const errorsReducer = createReducer(
  initialState,
  on(loadError, (state, action) =>  ({
    ...state,
    pageError: action.data.pageError ?? state.pageError,
    formErrors: action.data.formErrors ?? state.formErrors
  })),
);

export const reducer = (state: State, action: Action) => errorsReducer(state, action);
