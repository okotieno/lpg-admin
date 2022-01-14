import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCanisterComponent } from './add-canister.component';

describe('AddCanisterComponent', () => {
  let component: AddCanisterComponent;
  let fixture: ComponentFixture<AddCanisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCanisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCanisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
