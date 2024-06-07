import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { BankingdataService } from '../../bankingdata.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink,CommonModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {
  registrationForm!: FormGroup;
  submitted = false;
  imagePath = 'assets/image.png';
  maxDate!: string;
  regData ='';
  validUser:boolean = false;
  countries: string[] = ['Select Country', 'India','USA', 'Canada', 'UK', 'Australia', 'Poland', 'Other'];
  states: string[] = ['Select State','Telangana','Andhra Pradesh','Karnataka','Tamil Nadu','Himachal Pradesh']
  constructor(private fb: FormBuilder,private router: Router, private register: BankingdataService ) { 
    this.setMaxDate()
  }

  @ViewChild('formElement') formElement!: ElementRef;
  
  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      firstName: ['', [Validators.required,Validators.pattern('^[a-zA-Z]*$'),Validators.minLength(3),Validators.maxLength(10)]],
      lastName: ['',[Validators.required,Validators.minLength(3),Validators.maxLength(10),Validators.pattern('^[a-zA-Z]*$')]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d*$/),Validators.minLength(10)]],
      email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)]],
      country: ['Select Country', [Validators.required]],
      state: ['Select State', [Validators.required]],
      dob: [null, [Validators.required]],
      address: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9\s,'-]*$/)]],
      password: ['', [Validators.required,Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,16}$/)]],
      confirmPassword: ['', [Validators.required,Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,16}$/)]],

    }, {
      validators: this.passwordMatchValidator
    });
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  onSubmit() {
    // console.log(this.registrationForm.value)
    if(this.registrationForm.valid){
      this.register.registerDetails.push(this.registrationForm.value)
      this.register.userData.push(this.registrationForm.value.email,this.registrationForm.value.password)
      this.validUser = true
      this.regData ='You are Registered Sucessfully';
    }
    setTimeout(() => {
      this.router.navigateByUrl('/login');
    }, 1000);
  }
  
  ngAfterViewInit() {
    const formFields = this.formElement.nativeElement.querySelectorAll('input');
    formFields.forEach((field: HTMLInputElement) => {
      field.setAttribute('autocomplete', 'disabled');
    });
  }
  
  setMaxDate() {
    const currentDate = new Date();
    // Convert current date to yyyy-mm-dd format
    this.maxDate = currentDate.toISOString().split('T')[0];
  }

  onKeyPress(event: KeyboardEvent) {
    const inputChar = String.fromCharCode(event.charCode);
    if (!/^\d+$/.test(inputChar)) {
      event.preventDefault();
    }
  }

}
