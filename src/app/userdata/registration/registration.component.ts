import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { BankingdataService } from '../../bankingdata.service';
import { CommonModule } from '@angular/common';
import { SharedFile } from '../../sharedfile';


@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink,CommonModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {
  registrationForm!:FormGroup;
  sharedFile = new SharedFile(this.register);
  submitted: boolean = false;
  maxDate!: string;
  regData: string ='';
  validUser:boolean = false;
  countryValues: string[] = this.sharedFile.countries;
  stateValue: string[] = this.sharedFile.states;
  
  constructor(private fb:FormBuilder, private router: Router, private register: BankingdataService ) { 
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
      password: ['', [Validators.required,Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?\d).{8,16}$/)]],
      confirmPassword: ['', [Validators.required]],

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
    if(this.registrationForm.valid){
      this.register.registerDetails.push(this.registrationForm.value)
      this.register.userData.push(this.registrationForm.value.email,this.registrationForm.value.password)
      this.validUser = true
      this.regData ='You are Registered Sucessfully';
    }
    setTimeout(() => {
      this.router.navigateByUrl('/login');
    }, 3000);
  }
  
  ngAfterViewInit() {
    const formFields = this.formElement.nativeElement.querySelectorAll('input');
    formFields.forEach((field: HTMLInputElement) => {
      field.setAttribute('autocomplete', 'disabled');
    });
  }
  
  setMaxDate() {
    const currentDate = new Date();
    this.maxDate = currentDate.toISOString().split('T')[0];
  }

  onKeyPress(event: KeyboardEvent) {
    const inputChar = event.key;
    if (!/^\d+$/.test(inputChar)) {
      event.preventDefault();
    }
  }

}
