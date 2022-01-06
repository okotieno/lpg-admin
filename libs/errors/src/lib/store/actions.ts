import { createAction, props } from "@ngrx/store";

export const loadError = createAction(
  '[Error] load errors',
  props<{
    data: {
      formErrors?: string[],
      pageError?: { message?: string; status?: number }
    }
  }>()
);
