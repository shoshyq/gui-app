import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePaymentDetailsComponent } from './update-payment-details.component';

describe('UpdatePaymentDetailsComponent', () => {
  let component: UpdatePaymentDetailsComponent;
  let fixture: ComponentFixture<UpdatePaymentDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatePaymentDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePaymentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
