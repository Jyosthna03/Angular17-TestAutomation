import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BankingdataService } from '../../bankingdata.service';
import { ForgotInfoComponent } from "../forgot-info/forgot-info.component";
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-login',
    standalone: true,
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
    imports: [ReactiveFormsModule, ForgotInfoComponent,CommonModule]
})
export class LoginComponent {
  loginForm!: FormGroup;
  imagePath = 'assets/login-img.png';
  isShowPopup: boolean = false;
  submitted = false;
  userList: any;
  isInvalidUser:string = ''
  constructor(private fb: FormBuilder,private router: Router,private modalService: NgbModal,private service:BankingdataService) {}
 
  @ViewChild('formElement') formElement!: ElementRef;

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,16}$/)]],
    });
    this.userList = this.service.registerDetails;
  }
 
  get formControls() {
    return this.loginForm.controls;
  }

  invalidUser:boolean = false;
  onSubmit() {
    if(this.service.userData.includes(this.formControls['email'].value) && this.service.userData.includes(this.formControls['password'].value)){
        const user = this.formControls['email'].value; 
        let passwordIndex = this.service.userData.indexOf(user) + 1
        if(this.loginForm.value.password === this.service.userData[passwordIndex]){
          console.log(this.loginForm.value)
          this.router.navigate(['/dashboard']);
          this.loginForm.reset();
        }
        else{
          this.invalidUser = true;
          this.loginForm.reset();
      }
        this.service.setCurrentUser(user);
        this.service.trimmedString = this.service.trimNameFromEmail(user);
        localStorage.setItem("logindata",JSON.stringify(this.loginForm.value))
      }
    }

  openForgotPasswordPopup(content: any) {
    this.modalService.open(content, {
      centered: true,
      scrollable: true,
      size: 'lg',
      backdrop: 'static',
    });
  }
  getRegistration(){
    this.router.navigate(['/registration']);
  }
   
  ngAfterViewInit() {
    const formFields = this.formElement.nativeElement.querySelectorAll('input');
    formFields.forEach((field: HTMLInputElement) => {
      field.setAttribute('autocomplete', 'off');
    });
  }

}
