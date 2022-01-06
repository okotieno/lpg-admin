import { createAction, props } from "@ngrx/store";

export const loadError = createAction(
  '[Error] load errors',
  props<{ data: { message: string, statusCode?: number }[] }>()
);
