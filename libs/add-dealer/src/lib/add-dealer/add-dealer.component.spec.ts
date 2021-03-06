import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDealerComponent } from './add-dealer.component';

describe('AddDepotComponent', () => {
  let component: AddDealerComponent;
  let fixture: ComponentFixture<AddDealerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDealerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDealerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
