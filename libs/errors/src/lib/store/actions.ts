import { createAction, props } from "@ngrx/store";

export const loadError = createAction(
  '[Error] load errors',
  props<{
    data: {
      formErrors?: { message: string }[],
      pageError?: { message?: string; status?: number }
    }
  }>()
);
