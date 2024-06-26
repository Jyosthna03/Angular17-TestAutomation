import { ComponentFixture, TestBed} from '@angular/core/testing';
import { MoneyTransferComponent } from './money-transfer.component';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { BankingdataService } from '../../../bankingdata.service';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from '../../../app.routes';
import { By } from '@angular/platform-browser';


describe('MoneyTransferComponent', () => {
  let component: MoneyTransferComponent;
  let fixture: ComponentFixture<MoneyTransferComponent>;

  let router:Router
  let backBtn: HTMLElement;

 

  beforeEach(async () => {
    
    await TestBed.configureTestingModule({
      imports:[HttpClientModule,RouterTestingModule.withRoutes(routes)],
      providers: [Router,
        BankingdataService,
         {
           provide: ActivatedRoute,
           useValue: {
             paramMap: of({}) 
           },
         }
       ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MoneyTransferComponent);
    component = fixture.componentInstance;

    router = TestBed.inject(Router)
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //initial invalid form 
  it('should initialize form with empty values and is invalid', () => {
    expect(component.moneyTransferForm.value).toEqual({ payee: 'Select Payee', accountNumber: '', bankName: '', amount: '', remarks: '', paymentModeInput: ''});
    expect(component.moneyTransferForm.invalid).toBeTruthy();
    expect(component.moneyTransferForm.untouched).toBeTruthy()
  });

  //accountNo input field
  it('Setting a static value for accNo input field test case',()=>{
    let accNo = component.moneyTransferForm.controls['accountNumber'];
    accNo.setValue('Katyayani');
    expect(accNo.errors?.['pattern']).toBeTruthy()  //if we set a value which is out of pattern and less than minlength then the test case fails
    expect(accNo.valid).toBeFalsy();

    accNo.setValue('123456');
    expect(accNo.errors?.['minlength']).toBeTruthy() 
   
    accNo.setValue('12345678901234567890');
    expect(accNo.errors?.['maxlength']).toBeTruthy() 
  });


  //amount input field
  it('Setting static value for amount input field',()=>{
    let amount = component.moneyTransferForm.controls['amount'];
    amount.setValue('Gatti');
    expect(amount.errors?.['pattern']).toBeTruthy();

    amount.setValue('123456789');
    expect(amount.errors?.['maxlength']).toBeTruthy();
  });

  //remarks input field
  it('Setting static value for remarks input field',()=>{
    let remarks = component.moneyTransferForm.controls['remarks'];
    remarks.setValue('Remarks');
    expect(remarks.valid).toBeTruthy();
    expect(remarks.value).toEqual('Remarks')

    remarks.setValue("Helloooooooooooooooo");
    expect(remarks.errors?.['maxlength']).toBeTruthy()
  })

  //radioButtons input field
  it('should update form value when IMPS option is selected', () => {
    const option1Imps: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('input[value=IMPS]');
    option1Imps.click();
    expect(component.moneyTransferForm.value.paymentModeInput).toEqual('IMPS');
  });

  it('should update form value when NEFT option is selected', () => {
    const option2Neft: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('input[value=NEFT]');
    option2Neft.click();
    expect(component.moneyTransferForm.value.paymentModeInput).toEqual('NEFT');
  });

  it('should update form value when RTGS option is selected', () => {
    const option3RTGS: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('input[value=RTGS]');
    option3RTGS.click();
    expect(component.moneyTransferForm.value.paymentModeInput).toEqual('RTGS');
  });

  //select tag input field
  it('should have two options', () => {
    const selectOptions = fixture.debugElement.nativeElement.querySelectorAll('option');
    expect(selectOptions.length).toEqual(2);
  });

  it('should set the default value to Select Payee', () => {
    expect(component.moneyTransferForm.value.payee).toEqual('Select Payee');
  });

  it('checking whether oncancel method is called or not when cancel button is clicked',()=>{
    let cancelBtn = fixture.nativeElement.querySelector('#cancel');
    spyOn(component,'onCancel');
    cancelBtn.click();
    expect(component.onCancel).toHaveBeenCalled();
  });

  it('when send button is clicked onSubmit method is called',()=>{
    spyOn(component,'onSubmit');
    let sendBtn = fixture.nativeElement.querySelector('#send');
    sendBtn.disabled = false
    sendBtn.click();
    expect(component.onSubmit).toHaveBeenCalled()
  })

  it('should navigate to dashboard when back button is clicked', () => {
    const navigateSpy = spyOn(router, 'navigateByUrl');
    const button = fixture.nativeElement.querySelector('#back');
    button.click();
    expect(navigateSpy).toHaveBeenCalled();
    expect(navigateSpy.calls.mostRecent().args[0]).toMatch(/\/dashboard$/)
  });

});
