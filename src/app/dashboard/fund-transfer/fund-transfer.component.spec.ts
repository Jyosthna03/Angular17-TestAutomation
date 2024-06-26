import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FundTransferComponent } from './fund-transfer.component';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { BankingdataService } from '../../bankingdata.service';

describe('FundTransferComponent', () => {
  let component: FundTransferComponent;
  let fixture: ComponentFixture<FundTransferComponent>;

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
    
    fixture = TestBed.createComponent(FundTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render paragraph with correct text and class for Payment method', () => {
    const paragraphElement = fixture.debugElement.query(By.css('#paymentMethod'));
    expect(paragraphElement).toBeTruthy();
    expect(paragraphElement.nativeElement.textContent.trim()).toBe('Payment method');
    expect(paragraphElement.nativeElement.getAttribute('class')).toContain('card-text');
  });

  it('should render paragraph with correct text and class for Add Payee', () => {
    const paragraphElement = fixture.debugElement.query(By.css('#addPayee'));
    expect(paragraphElement).toBeTruthy();
    expect(paragraphElement.nativeElement.textContent.trim()).toBe('Add Payee');
    expect(paragraphElement.nativeElement.getAttribute('class')).toContain('card-text');
  });

  it('should render paragraph with correct text and class for Manage Payee', () => {
    const paragraphElement = fixture.debugElement.query(By.css('#managePayee'));
    expect(paragraphElement).toBeTruthy();
    expect(paragraphElement.nativeElement.textContent.trim()).toBe('Manage Payee');
    expect(paragraphElement.nativeElement.getAttribute('class')).toContain('card-text');
  });

  it('should render paragraph with correct text and class for Statements', () => {
    const paragraphElement = fixture.debugElement.query(By.css('#statements'));
    expect(paragraphElement).toBeTruthy();
    expect(paragraphElement.nativeElement.textContent.trim()).toBe('Statements');
    expect(paragraphElement.nativeElement.getAttribute('class')).toContain('card-text');
  });
});
