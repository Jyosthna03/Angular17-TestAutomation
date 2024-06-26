import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaymentsComponent } from './payments.component';
import { By } from '@angular/platform-browser';
import { BankingdataService } from '../../bankingdata.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';


describe('PaymentsComponent', () => {
  let component: PaymentsComponent;
  let fixture: ComponentFixture<PaymentsComponent>;

  let service: BankingdataService;

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
    
    fixture = TestBed.createComponent(PaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    service = TestBed.inject(BankingdataService)
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the image element with correct attributes', () => {
    const imgElement = fixture.debugElement.query(By.css('img'));
    expect(imgElement).toBeTruthy();
    expect(imgElement.nativeElement.getAttribute('src')).toBe('assets/Images/payment.png');
    expect(imgElement.nativeElement.getAttribute('class')).toContain('img-fluid');
    expect(imgElement.nativeElement.getAttribute('alt')).toBe('Payments');
    expect(imgElement.nativeElement.style.maxHeight).toBe('fit-content');
  });
  
  it('should render paragraph with correct text and class for Pay Bills', () => {
    const paragraphElement = fixture.debugElement.query(By.css('#paybills'));
    expect(paragraphElement).toBeTruthy();
    expect(paragraphElement.nativeElement.textContent.trim()).toBe('Pay Bills');
    expect(paragraphElement.nativeElement.getAttribute('class')).toContain('card-text');
  });

  it('should render paragraph with correct text and class for Recharge', () => {
    const paragraphElement = fixture.debugElement.query(By.css('#recharge'));
    expect(paragraphElement).toBeTruthy();
    expect(paragraphElement.nativeElement.textContent.trim()).toBe('Recharge');
    expect(paragraphElement.nativeElement.getAttribute('class')).toContain('card-text');
  });

  it('should render paragraph with correct text and class for BillsHistory', () => {
    const paragraphElement = fixture.debugElement.query(By.css('#billsHistory'));
    expect(paragraphElement).toBeTruthy();
    expect(paragraphElement.nativeElement.textContent.trim()).toBe('Billing History');
    expect(paragraphElement.nativeElement.getAttribute('class')).toContain('card-text');
  });

  it('should render paragraph with correct text and class for My Transactions', () => {
    const paragraphElement = fixture.debugElement.query(By.css('#mytransactions'));
    expect(paragraphElement).toBeTruthy();
    expect(paragraphElement.nativeElement.textContent.trim()).toBe('My Transactions');
    expect(paragraphElement.nativeElement.getAttribute('class')).toContain('card-text');
  });

});
