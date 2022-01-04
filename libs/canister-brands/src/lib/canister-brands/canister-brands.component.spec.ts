import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanisterBrandsComponent } from './canister-brands.component';

describe('CanisterBrandsComponent', () => {
  let component: CanisterBrandsComponent;
  let fixture: ComponentFixture<CanisterBrandsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CanisterBrandsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CanisterBrandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
