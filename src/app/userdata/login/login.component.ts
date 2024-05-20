import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BankingdataService } from '../../bankingdata.service';
import { ForgotInfoComponent } from "../forgot-info/forgot-info.component";

@Component({
    selector: 'app-login',
    standalone: true,
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
    imports: [ReactiveFormsModule, ForgotInfoComponent]
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

  onSubmit() {
    if(this.service.userData.includes(this.formControls['email'].value)&& this.service.userData.includes(this.formControls['password'].value)){
        const user = this.formControls['email'].value; 
        this.service.setCurrentUser(user);
        var newStr = this.formControls['email'].value.replace(/@.*$/,"");
        this.service.trimmedString = newStr;
        var name = newStr!==user ? newStr : null;
        localStorage.setItem("logindata",JSON.stringify(this.loginForm.value))
        this.loginForm.reset();
        this.router.navigate(['/dashboard'])
   }
   else{
        this.isInvalidUser = "Please Enter Valid Credentials"
        this.loginForm.reset();
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
