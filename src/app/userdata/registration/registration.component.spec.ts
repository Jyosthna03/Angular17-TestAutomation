import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistrationComponent } from './registration.component';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { BankingdataService } from '../../bankingdata.service';
import { ActivatedRoute } from '@angular/router';

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[ReactiveFormsModule],
      providers:[BankingdataService, { provide: ActivatedRoute, useValue: {paramMap:of({})} }]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should initialize form with empty values', () => {
    expect(component.registrationForm.value).toEqual({ firstName: '', lastName: '',phoneNumber: '', email: '', country: 'Select Country', state: 'Select State',dob: null,address: '',password: '',confirmPassword: '' });
  expect(component.registrationForm.invalid).toBeTruthy();
  expect(component.registrationForm.untouched).toBeTruthy();
  });
  it('should validate First Name and Last Name field as required', () => {
    let firstName = component.registrationForm.controls['firstName'];
    let lastName = component.registrationForm.controls['lastName'];
    expect(firstName.valid).toBeFalsy();
    // Triggering form validation
    firstName.markAsTouched();
    // Expecting 'required' error
    expect(firstName.errors?.['required']).toBeTruthy();
    // LastName is required 
    expect(lastName.valid).toBeFalsy();
    lastName.markAsTouched();
    expect(lastName.errors?.['required']).toBeTruthy();
  });
  // Email PhoneNumber and Date of Birth field as required!
  it('should validate Email, PhoneNumber, Date of Birth, Address, Password,ConfirmPassword field as required', () => {
    let emailId = component.registrationForm.controls['email'];
    let phoneNumber = component.registrationForm.controls['phoneNumber'];
    let dob = component.registrationForm.controls['dob'];
    // let country = component.registrationForm.controls['country']
    let address = component.registrationForm.controls['address'];
    let password = component.registrationForm.controls['password'];
    let confirmPassword = component.registrationForm.controls['confirmPassword']
    expect(emailId.valid).toBeFalsy();
    // Triggering form validation
    emailId.markAsTouched();  // Expecting 'required' error
    expect(emailId.errors?.['required']).toBeTruthy();
    // phoneNumber is required 
    expect(phoneNumber.valid).toBeFalsy();
    phoneNumber.markAsTouched();
    expect(phoneNumber.errors?.['required']).toBeTruthy();
    phoneNumber.setValue('123');
    expect(phoneNumber.errors?.['minlength']).toBeTruthy()
    // Date of Birth is required 
    expect(dob.valid).toBeFalsy();
    dob.markAsTouched();
    expect(dob.errors?.['required']).toBeTruthy();
    // Address is required
    expect(address.valid).toBeFalsy();
    address.markAsTouched();
    expect(address.errors?.['required']).toBeTruthy();
    // Password is required
    expect(password.valid).toBeFalsy()
    password.markAsTouched();
    expect(password.errors?.['required']).toBeTruthy();
    // ConfirmPassword is required
    expect(confirmPassword.valid).toBeFalsy();
    confirmPassword.markAsTouched();
    expect(confirmPassword.errors?.['required']).toBeTruthy();
  
  });
  it('should call onSubmit method on form submission', () => {
    spyOn(component, 'onSubmit'); // Spy on the onSubmit method

    // Simulate form submission
    const formElement = fixture.nativeElement.querySelector('form');
    formElement.dispatchEvent(new Event('submit'));
    fixture.detectChanges();

    expect(component.onSubmit).toHaveBeenCalled(); // Expect onSubmit method to have been called
  });
  
  it('should displayed min and max length of First Name valid', () => {
    let firstNameValid = component.registrationForm.controls['firstName']
    firstNameValid.setValue('123jyo');
    expect(firstNameValid.errors?.['pattern']).toBeTruthy();
    firstNameValid.setValue('Jy');
    expect(firstNameValid.errors?.['minlength']).toBeTruthy();
    firstNameValid.setValue('JyosthnaEnjam');
    expect(firstNameValid.errors?.['maxlength']).toBeTruthy();
    firstNameValid.setValue('Jyosthna')
    expect(firstNameValid.valid).toBeTruthy()
    expect(firstNameValid.value).toEqual('Jyosthna')

  });
  it('should displayed min and max length of Last Name valid', () => {
    let lastNameValid = component.registrationForm.controls['lastName']
    lastNameValid.setValue('en');
    expect(lastNameValid.errors?.['minlength']).toBeTruthy();
    lastNameValid.setValue('enjamjyosthna');
    expect(lastNameValid.errors?.['maxlength']).toBeTruthy();
    lastNameValid.setValue('234fgh');
    expect(lastNameValid.errors?.['pattern']).toBeTruthy();
    lastNameValid.setValue('Enjam')
    expect(lastNameValid.valid).toBeTruthy()
    expect(lastNameValid.value).toEqual('Enjam')

  });
  it('should initialize the Email set values', () => {
    let email = component.registrationForm.controls['email']
    email.setValue('jyosthna@gmailcom');
    expect(email.errors?.['pattern']).toBeTruthy();
    email.setValue('jyosthna@gmail.com')
    expect(email.value).toEqual('jyosthna@gmail.com')

  });
  it('should initialize the Password set value', () => {
    let password = component.registrationForm.controls['password']
    password.setValue('Jyos123');
    expect(password.errors?.['pattern']).toBeTruthy()
    password.setValue('Jyos@123')
    expect(password.value).toEqual('Jyos@123')

  });
  it('should initialize the ConfirmPassword set value', () => {
     component.registrationForm.controls['password'].setValue('Jyos@123');
     component.registrationForm.controls['confirmPassword'].setValue('Jyos@12345')

    let password =  component.registrationForm.controls['password'].value
    let confirmPassword = component.registrationForm.controls['confirmPassword'].value
    
    let isMatch = password === confirmPassword
    expect(isMatch).toBeFalsy();

  });

});
