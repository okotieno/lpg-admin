import { createAction, props } from '@ngrx/store';
import { IUser } from "@lpg/data";




export const init = createAction('[ProfileStore Page] Init');

export const loadProfileStoreSuccess = createAction(
  '[ProfileStore/API] Load ProfileStore Success',
  props<{ data: IUser }>()
);

export const loadProfileStoreFailure = createAction(
  '[ProfileStore/API] Load ProfileStore Failure',
  props<{ error: any }>()
);

export const clear = createAction(
  '[ProfileStore/API] clear my profile request'
);

export const clearProfileStore= createAction(
  '[ProfileStore/API] clear my profile'
);
