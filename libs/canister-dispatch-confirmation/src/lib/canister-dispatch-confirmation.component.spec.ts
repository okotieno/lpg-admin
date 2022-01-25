import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanisterDispatchConfirmationComponent } from './canister-dispatch-confirmation.component';

describe('CanisterDispatchConfirmationComponent', () => {
  let component: CanisterDispatchConfirmationComponent;
  let fixture: ComponentFixture<CanisterDispatchConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CanisterDispatchConfirmationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CanisterDispatchConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
