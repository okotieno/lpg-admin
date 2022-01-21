import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanisterDispatchComponent } from './canister-dispatch.component';

describe('CanisterDispatchComponent', () => {
  let component: CanisterDispatchComponent;
  let fixture: ComponentFixture<CanisterDispatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CanisterDispatchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CanisterDispatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
