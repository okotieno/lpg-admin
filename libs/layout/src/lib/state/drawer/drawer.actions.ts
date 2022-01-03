import { createAction } from '@ngrx/store';

export const open = createAction('[Drawer SideNav] Open');

export const drawerToggle = createAction(
  '[Drawer SideNav] toggle'
);

export const drawerHideMini = createAction(
  '[Drawer SideNav] hide mini'
);
