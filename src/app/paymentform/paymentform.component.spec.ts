import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PaymentformComponent } from './paymentform.component';

describe('PaymentformComponent', () => {
  let component: PaymentformComponent;
  let fixture: ComponentFixture<PaymentformComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
