import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaymentSuccessComponent } from './payment-success.component';
import { BankingdataService } from '../../../bankingdata.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('PaymentSuccessComponent', () => {
  let component: PaymentSuccessComponent;
  let fixture: ComponentFixture<PaymentSuccessComponent>;
  let service:BankingdataService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        BankingdataService,
         {
           provide: ActivatedRoute,
           useValue: {
             paramMap: of({}) 
           }
         }
       ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaymentSuccessComponent);
    component = fixture.componentInstance;

    service = TestBed.inject(BankingdataService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should initialize selectBillerPayment from service', () => {
  //   const component = new PaymentSuccessComponent(service);
  //   component.ngOnInit();
  //   expect(component.selectBillerPayment).toEqual(service.selectBillerSuccess);
  // });

  // it('should initialize mobileRechargePayment from service', () => {
  //   const component = new PaymentSuccessComponent(service); 
  //   component.ngOnInit();
  //   expect(component.mobileRechargePayment).toEqual(service.selectBillerSuccess);
  // });

  it('should set recharge flag based on service', () => {
    const component = new PaymentSuccessComponent(service); // Replace ComponentName with your component class name
    component.ngOnInit();
    expect(component.recharge).toBe(service.rechargePaymentSuccess);
  });



});
