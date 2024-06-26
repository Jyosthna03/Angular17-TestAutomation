import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ForgotInfoComponent } from './forgot-info.component';
import { ReactiveFormsModule} from '@angular/forms';
import { BankingdataService } from '../../bankingdata.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';


describe('ForgotInfoComponent', () => {
  let myservice: BankingdataService;
  let component: ForgotInfoComponent;
  let fixture: ComponentFixture<ForgotInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [BankingdataService,
        { provide: ActivatedRoute, useValue: {paramMap:of({})} }],
    }).compileComponents();

    fixture = TestBed.createComponent(ForgotInfoComponent);
    myservice = TestBed.inject(BankingdataService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  //Checks if the Component is Created
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //Valid User Of the App or Not
  it('If User is Registered in App', () => {
    let email = component.myForm.controls['email'];
    email.setValue('leela@gmail.com');
    const searchvalue = email.value;
    const result = myservice.checkUserInApp(searchvalue);
    expect(result).toBe(true);
  });

  it('If User is Not Registered in App', () => {
    let email = component.myForm.controls['email'];
    email.setValue('test@gmail.com');
    const searchvalue = email.value;
    const result = myservice.checkUserInApp(searchvalue);
    expect(result).toBe(false);
  });

  //Initializing the Fields of the Form
  it('should initialize form with empty values', () => {
    let userEmail = component.myForm.controls['email'];
    expect(userEmail.invalid).toBeTruthy();
    expect(userEmail.untouched).toBeTruthy();
    let userpassword = component.myForm.controls['password'];
    expect(userpassword.invalid).toBeTruthy();
    expect(userpassword.untouched).toBeTruthy();
    let userconfirmpassword = component.myForm.controls['confirmPassword'];
    expect(userconfirmpassword.invalid).toBeTruthy();
    expect(userconfirmpassword.untouched).toBeTruthy();
  });

  //Testing the Fields by setting Values to the input Fields
  it('It shows the Email set values', () => {
    let email = component.myForm.controls['email'];
    email.setValue('leela@gmail.com');
    expect(email.value).toEqual('leela@gmail.com');
  });

  it('It shows the Password set values', () => {
    let pwd = component.myForm.controls['password'];
    pwd.setValue('Leela@123');
    expect(pwd.value).toEqual('Leela@123');
  });

  it('It shows the Confirm Password set values', () => {
    let pwd = component.myForm.controls['confirmPassword'];
    pwd.setValue('Leela@123');
    expect(pwd.value).toEqual('Leela@123');
  });

  //Checking Password and Confirm Password are Same or Not
  it('should be invalid when passwords do not match', () => {
    component.myForm.controls['password'].setValue('leela@123');
    component.myForm.controls['confirmPassword'].setValue('leela@1234');

    let pwd = component.myForm.controls['password'].value;
    let cpwd = component.myForm.controls['confirmPassword'].value;

    let isMatchingpwd = pwd === cpwd;
    expect(isMatchingpwd).toBeFalsy();
  });

  //Checking Autocomplete-Off
  it('should disable autocomplete for all input fields', () => {
    // Simulate the view initialization
    component.ngAfterViewInit();

    // Query for all input fields
    const inputFields = fixture.nativeElement.querySelectorAll('input');

    // Check each input field if autocomplete is disabled
    inputFields.forEach((input: HTMLInputElement) => {
      expect(input.getAttribute('autocomplete')).toBe('off');
    });
  });

  //Checking Password Lengths are Valid or Not
  it('Validating Password Lengths', () => {
    let pwd = component.myForm.controls['password'];
    pwd.setValue('leela@123');
    expect(pwd.value.length).toBeGreaterThanOrEqual(8);
  });

  //Checking the Save Button
  it('When Clicked on the Save Button', () => {
    spyOn(component, 'onSubmit'); // Spy on the onSubmit method
    // Simulate form submission
    const formElement = fixture.nativeElement.querySelector('form');
    formElement.dispatchEvent(new Event('submit'));
    expect(component.onSubmit).toHaveBeenCalled(); // Expect onSubmit method to have been called
  });

  //Cheking the Cancel button
  it('When Clicked on the Cancel Button', () => {
    spyOn(component, 'closePopup'); // Spy on the onCancel method
    // Simulate click action on the cancel button
    const cancelButton = fixture.nativeElement.querySelector('#cancelBtn');
    cancelButton.click();
    expect(component.closePopup).toHaveBeenCalled(); // Expect onCancel method to have been called
  });

  it('should show required error when input is blurred and left empty', () => {
    let myemail = component.myForm.controls['email'];
    let mypassword = component.myForm.controls['password'];
    let myconfirmpassword = component.myForm.controls['confirmPassword'];

    const emailInput =
      fixture.debugElement.nativeElement.querySelector('#email');
    emailInput.dispatchEvent(new Event('blur'));
    expect(myemail.errors?.['required']).toBeTruthy();

    const pwdInput =
      fixture.debugElement.nativeElement.querySelector('#password');
    pwdInput.dispatchEvent(new Event('blur'));
    expect(mypassword.errors?.['required']).toBeTruthy();

    const cnfpwdInput =
      fixture.debugElement.nativeElement.querySelector('#confirmPassword');
    cnfpwdInput.dispatchEvent(new Event('blur'));
    expect(myconfirmpassword.errors?.['required']).toBeTruthy();
  });

  it('Regex Valdation for email', () => {
    let myemail = component.myForm.controls['email'];
    myemail.setValue('Katygmail.com');
    expect(myemail.errors?.['pattern']).toBeTruthy();
  });

  it('Regex Validation for password', () => {
    let mypassword = component.myForm.controls['password'];
    mypassword.setValue('kat123');
    expect(mypassword.errors?.['pattern']).toBeTruthy();
  });
});
