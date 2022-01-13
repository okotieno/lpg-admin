import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtpFlowComponent } from './otp-flow.component';

describe('OtpFlowComponent', () => {
  let component: OtpFlowComponent;
  let fixture: ComponentFixture<OtpFlowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtpFlowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OtpFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
