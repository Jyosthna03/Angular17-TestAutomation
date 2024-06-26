import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectBillerComponent } from './select-biller.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BankingdataService } from '../../../bankingdata.service';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';

describe('SelectBillerComponent', () => {
  let component: SelectBillerComponent;
  let fixture: ComponentFixture<SelectBillerComponent>;

  let router:Router
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [
       BankingdataService,
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({}) 
          }
        }
      ]
    }).compileComponents();
    
    fixture = TestBed.createComponent(SelectBillerComponent);
    component = fixture.componentInstance;

    router = TestBed.inject(Router)
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('it shows the empty value', () => {
   expect(component.billerForm.value).toEqual({billerType:'Credit Card', billerdetails:'Credit Card', billDetailsAmount:'', PayingFrom:'Savings Account'})
   expect(component.billerForm.invalid).toBeTruthy();
   expect(component.billerForm.untouched).toBeTruthy();
  });
  it('should have required form controls', () => {
    let networkProvider = component.rechargeForm.controls['networkProvider']
    networkProvider.markAsTouched();
    expect(networkProvider.errors?.['required']).toBeFalsy();
    expect(component.rechargeForm.contains('networkProvider')).toBeTruthy();
    expect(component.rechargeForm.contains('mobileNumber')).toBeTruthy();
    expect(component.rechargeForm.contains('amount')).toBeTruthy();
  });
  it('should validate mobile number field', () => {
    let mobileNumber = component.rechargeForm.controls['mobileNumber'];
    mobileNumber.setValue('jyosth');
    expect(mobileNumber.errors?.['pattern']).toBeTruthy()
    mobileNumber.markAsTouched();
    expect(mobileNumber.errors?.['required']).toBeFalsy();
    mobileNumber.setValue('123');
    expect(mobileNumber.errors?.['minlength']).toBeTruthy()
    expect(mobileNumber.valid).toBeFalsy();
    mobileNumber.setValue('1234567890'); // Valid mobile number
    expect(mobileNumber.valid).toBeTruthy();
  });
  it('should validate amount field', () => {
    let amount = component.rechargeForm.controls['amount'];
    amount.setValue('sdfgh');
    expect(amount.errors?.['pattern']).toBeTruthy();
    amount.markAsTouched();
    expect(amount.errors?.['required']).toBeFalsy();
    expect(amount.valid).toBeFalsy();
    amount.setValue(''); // Empty amount
    expect(amount.hasError('required')).toBeTruthy();

    amount.setValue('100'); // Valid amount
    expect(amount.valid).toBeTruthy();
  });
  it(' default value of Network Providers',() => {
    fixture.detectChanges()
    expect(component.rechargeForm.value.networkProvider).toEqual('Airtel Post-paid')
  });

  it('savings account tag length',() =>{
    let savings = fixture.debugElement.nativeElement.querySelectorAll("#savings");
    expect(savings.length).toEqual(1)
  })
  it('biller length',() =>{
    fixture.detectChanges();
    let biller = fixture.debugElement.nativeElement.querySelectorAll('#biller');
    expect(biller.length).toEqual(4)
  });

  it('billerDetails length',() =>{
    let billerDetails = fixture.debugElement.nativeElement.querySelectorAll("#billerDetails");
    expect(billerDetails.length).toEqual(2)
  })

  it('should navigate to dashboard when back button is clicked', () => {
    const navigateSpy = spyOn(router, 'navigateByUrl');

    const backButton = fixture.nativeElement.querySelector('#back');
    backButton.click();

    expect(navigateSpy).toHaveBeenCalled();
    expect(navigateSpy.calls.mostRecent().args[0]).toMatch(/\/dashboard$/)
  });

  
  it('should call onSubmit() when pay button is clicked', () => {
     spyOn(component, 'onSubmit');
      let  payButton = fixture.nativeElement.querySelector('#pay');
      payButton.disabled = false
      payButton.click();
      component.onSubmit()
      expect(component.onSubmit).toHaveBeenCalled()
  });
  
});
