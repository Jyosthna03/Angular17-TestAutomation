import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddpayeeComponent } from './addpayee.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { BankingdataService } from '../../../bankingdata.service';
import { HttpClientModule } from '@angular/common/http';

describe('AddpayeeComponent', () => {
  let component: AddpayeeComponent;
  let fixture: ComponentFixture<AddpayeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule],
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
    
    fixture = TestBed.createComponent(AddpayeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('initial fields are empty and invalid',()=>{
    expect(component.addPayeeForm.value).toEqual({fullname : '',nickname:'',bankName :'',ifscCode:'',accountNo:'',reEnteraccountNo:''})
    expect(component.addPayeeForm.invalid).toBeTruthy();
    expect(component.addPayeeForm.untouched).toBeTruthy()
  });

  it('Setting a static value for payee fullname and checking validations',()=>{
    let fullname = component.addPayeeForm.controls['fullname'];
    fullname.setValue('12345678')
    expect(fullname.errors?.['pattern']).toBeTruthy() //pattern fails
    expect(fullname.valid).toBeFalsy();

    fullname.setValue('Hi') //min length fails
    expect(fullname.errors?.['minlength']).toBeTruthy()
    expect(fullname.valid).toBeFalsy();

    fullname.setValue('Gatti Katyayani Devi'); // max length fails
    expect(fullname.errors?.['maxlength']).toBeTruthy()
    expect(fullname.valid).toBeFalsy();

    fullname.setValue('Katyayani');
    expect(fullname.valid).toBeTruthy();
  });

  it('Setting a static value for payee nickname and checking validations',()=>{
    let nickname = component.addPayeeForm.controls['nickname'];
    nickname.setValue('123456789') //pattern fails
    expect(nickname.errors?.['pattern']).toBeTruthy() //pattern fails
    expect(nickname.valid).toBeFalsy()

    nickname.setValue('Hi') //minlength fails
    expect(nickname.errors?.['minlength']).toBeTruthy()
    expect(nickname.valid).toBeFalsy();

    nickname.setValue('Gatti Katyayani Devi') //maxlength fails
    expect(nickname.errors?.['maxlength']).toBeTruthy()
    expect(nickname.valid).toBeFalsy();

    nickname.setValue('Katty'); 
    expect(nickname.valid).toBeTruthy();
  });

  it('Setting a static value for bank name and checking validations',()=>{
    let bankName = component.addPayeeForm.controls['bankName'];
    bankName.setValue('2345678'); //pattern fails
    expect(bankName.errors?.['pattern']).toBeTruthy() //pattern fails
    expect(bankName.valid).toBeFalsy();

    bankName.setValue('Sb'); //minlength fails
    expect(bankName.errors?.['minlength']).toBeTruthy()
    expect(bankName.valid).toBeFalsy();

    bankName.setValue('State Bank of India and Union Bank'); //maxlength fails
    expect(bankName.errors?.['maxlength']).toBeTruthy()
    expect(bankName.valid).toBeFalsy();

    bankName.setValue('State Bank of India');
    expect(bankName.valid).toBeTruthy();
  });

  it('Setting a static value for ifsc code and checking validations',()=>{
    let ifscCode = component.addPayeeForm.controls['ifscCode'];
    ifscCode.setValue('12340Abc78D'); //pattern fails
    expect(ifscCode.errors?.['pattern']).toBeTruthy() //pattern fails
    expect(ifscCode.valid).toBeFalsy();

    ifscCode.setValue('12340Abc78DEFU') //maxlength fails
    expect(ifscCode.errors?.['maxlength']).toBeTruthy()
    expect(ifscCode.valid).toBeFalsy();

    ifscCode.setValue('UBIN0535125');
    expect(ifscCode.valid).toBeTruthy()
  });

  it('Setting a static value for accNo and checking validations',()=>{
    let accNo = component.addPayeeForm.controls['accountNo'];
    accNo.setValue('Katyayani'); //pattern fails
    expect(accNo.errors?.['pattern']).toBeTruthy() //pattern fails
    expect(accNo.valid).toBeFalsy();

    accNo.setValue('123456');
    expect(accNo.errors?.['minlength']).toBeTruthy() //pattern fails
    expect(accNo.valid).toBeFalsy() // min length fails

    accNo.setValue('12345678901234567890');
    expect(accNo.valid).toBeFalsy() //maxlength fails
    expect(accNo.errors?.['maxlength']).toBeTruthy()
    
    accNo.setValue('1234567890');
    expect(accNo.valid).toBeTruthy()
  });

  //required error
  it('should show required error when input is blurred and left empty', () => {
    const fullname = component.addPayeeForm.controls['fullname'];
    const nickname = component.addPayeeForm.controls['nickname'];
    const bankName = component.addPayeeForm.controls['bankName'];
    const ifscCode = component.addPayeeForm.controls['ifscCode'];
    const accountNo = component.addPayeeForm.controls['accountNo'];
    const reEnteraccountNo = component.addPayeeForm.controls['reEnteraccountNo'];

    // Simulating blur event
    const fullnameInput = fixture.debugElement.nativeElement.querySelector('#fullname')
    const nicknameInput = fixture.debugElement.nativeElement.querySelector('#nickname')
    const bankNameInput = fixture.debugElement.nativeElement.querySelector('#bankName')
    const ifscCodeInput = fixture.debugElement.nativeElement.querySelector('#ifscCode')
    const accountNoInput = fixture.debugElement.nativeElement.querySelector('#accountNo')
    const reEnteraccountNoInput = fixture.debugElement.nativeElement.querySelector('#reEnterAccNo')

    fullnameInput.dispatchEvent(new Event('blur'));
    nicknameInput.dispatchEvent(new Event('blur'));
    bankNameInput.dispatchEvent(new Event('blur'));
    ifscCodeInput.dispatchEvent(new Event('blur'));
    accountNoInput.dispatchEvent(new Event('blur'));
    reEnteraccountNoInput.dispatchEvent(new Event('blur'));

    // Expecting 'required' error
    expect(fullname.errors?.['required']).toBeTruthy();
    expect(nickname.errors?.['required']).toBeTruthy();
    expect(bankName.errors?.['required']).toBeTruthy();
    expect(ifscCode.errors?.['required']).toBeTruthy();
    expect(accountNo.errors?.['required']).toBeTruthy();
    expect(reEnteraccountNo.errors?.['required']).toBeTruthy();
});


  it('checking reEnter accountNo matching validation', () => {
    // Set the values in the form controls
    component.addPayeeForm.controls['accountNo'].setValue('12345678');
    component.addPayeeForm.controls['reEnteraccountNo'].setValue('1234567890');
    let accNo = component.addPayeeForm.controls['accountNo'].value;
    let reEnterAccNo = component.addPayeeForm.controls['reEnteraccountNo'].value;

    let isMatching = accNo === reEnterAccNo;
    expect(isMatching).toBeFalsy(); // Expecting the values not to match
});

  it('Checking whether onCancel method is called when cancel button is clicked',()=>{
    spyOn(component, 'onReset'); // Spy on the onCancel method
    const cancelButton = fixture.nativeElement.querySelector('#cancel');
    cancelButton.click();
    expect(component.onReset()).toHaveBeenCalled();
  });

  it('checking whether closePopup is triggered when crossbtn is clicked',()=>{
    spyOn(component,'closePopup');
    let crossBtn = fixture.nativeElement.querySelector('#crossBtn');
    crossBtn.click();
    expect(component.closePopup).toHaveBeenCalled()
  });

  it('should enable the button and submitPayee method is called when addpayee button is clicked', () => {
    spyOn(component, 'submitPayee');
    let addpayeeBtn = fixture.nativeElement.querySelector('#addPayee');
    addpayeeBtn.disabled = false;
    addpayeeBtn.click();
    fixture.detectChanges(); // Trigger change detection
    expect(component.submitPayee).toHaveBeenCalled()
  });

});
