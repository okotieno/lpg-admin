import { Action } from '@ngrx/store';

import * as DrawerActions from './drawer.actions';
import { DrawerEntity } from './drawer.models';
import { State, initialState, reducer } from './drawer.reducer';

describe('Drawer Reducer', () => {
  const createDrawerEntity = (id: string, name = ''): DrawerEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('valid Drawer actions', () => {
    it('loadDrawerSuccess should return the list of known Drawer', () => {
      const drawer = [
        createDrawerEntity('PRODUCT-AAA'),
        createDrawerEntity('PRODUCT-zzz'),
      ];
      const action = DrawerActions.loadDrawerSuccess({ drawer });

      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
