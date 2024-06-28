import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BankingdataService } from '../../bankingdata.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-forgot-info',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink,CommonModule],
  templateUrl: './forgot-info.component.html',
  styleUrl: './forgot-info.component.css'
})
export class ForgotInfoComponent {
  isOpen: boolean = false;
  myForm!: FormGroup;
  usersuccessfullyReset: string ="";
  
  constructor(private fb:FormBuilder,private modalService: NgbModal, private service:BankingdataService) {}

  @ViewChild('formElement') formElement!: ElementRef;
  
  ngOnInit() {
    this.myForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?\d).{8,16}$/),Validators.minLength(8)]],
      confirmPassword: ['',[Validators.required,Validators.minLength(8)]]
  }, 
  {
    validators: this.passwordMatchValidator
  }); 
  }
  
  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }
  
  onSubmit() {
    if ((this.myForm.valid) && this.service.userData.includes(this.myForm.value.email)) {
      let userIndex=this.service.userData.indexOf(this.myForm.value.email);
      this.service.userData[userIndex+1] = this.myForm.value.password;
     this.usersuccessfullyReset = 'Password Changed Successfully!!';
      setTimeout(() =>{
        this.closePopup();
      },3000)
    }
    else{
      this.usersuccessfullyReset = "Invalid Email"
      this.myForm.reset();
    }
  }

  openPopup() {
    this.isOpen = true;
  }

  closePopup() {
    this.modalService.dismissAll();
  }

  ngAfterViewInit() {
    const formFields = this.formElement.nativeElement.querySelectorAll('input');
    formFields.forEach((field: HTMLInputElement) => {
      field.setAttribute('autocomplete', 'off');
    });
  }

}
