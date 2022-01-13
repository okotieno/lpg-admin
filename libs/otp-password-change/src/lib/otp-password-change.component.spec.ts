import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtpPasswordChangeComponent } from './otp-password-change.component';

describe('OtpPasswordChangeComponent', () => {
  let component: OtpPasswordChangeComponent;
  let fixture: ComponentFixture<OtpPasswordChangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtpPasswordChangeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OtpPasswordChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
