import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as DrawerActions from './drawer.actions';
import { DrawerEntity } from './drawer.models';

export const DRAWER_FEATURE_KEY = 'drawer';

export interface State extends EntityState<DrawerEntity> {
  open: boolean;
  mini: boolean;
}

export interface DrawerPartialState {
  readonly [DRAWER_FEATURE_KEY]: State;
}

export const drawerAdapter: EntityAdapter<DrawerEntity> =
  createEntityAdapter<DrawerEntity>();

export const initialState: State = drawerAdapter.getInitialState({
  open: false,
  mini: true
});

const drawerReducer = createReducer(
  initialState,

  on(DrawerActions.drawerToggle, (state) => {
    const mini = state.open ? state.mini : true;
    return ({ ...state, mini, open: !state.open })
  }),

  on(DrawerActions.drawerHideMini, (state) => {
    return ({ ...state, mini: false })
  }),

);

export function reducer(state: State | undefined, action: Action) {
  return drawerReducer(state, action);
}
