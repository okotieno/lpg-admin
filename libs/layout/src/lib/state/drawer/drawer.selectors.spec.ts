import { DrawerEntity } from './drawer.models';
import { drawerAdapter, DrawerPartialState, initialState, } from './drawer.reducer';
import * as DrawerSelectors from './drawer.selectors';

describe('Drawer Selectors', () => {

  const createDrawerEntity = (open: boolean) =>
    ({
      open,
    } as DrawerEntity);

  let state: DrawerPartialState;

  beforeEach(() => {
    state = {
      drawer: drawerAdapter.setAll(
        [
          createDrawerEntity(true),
          createDrawerEntity(false),
        ],
        {
          ...initialState,
          loaded: false,
        }
      ),
    };
  });

  describe('Drawer Selectors', () => {


    it('getDrawerOpen() should return the current "false" status', () => {
      const result = DrawerSelectors.getDrawerOpen(state);

      expect(result).toBe(false);
    });

    it('getDrawerMini() should return the current "true" status', () => {
      const result = DrawerSelectors.getDrawerMini(state);

      expect(result).toBe(true);
    });
  });
});
