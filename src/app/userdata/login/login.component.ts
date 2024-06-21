import { Component, ElementRef, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BankingdataService } from '../../bankingdata.service';
import { ForgotInfoComponent } from "../forgot-info/forgot-info.component";
import { NgClass } from '@angular/common';

@Component({
    selector: 'app-login',
    standalone: true,
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
    imports: [ReactiveFormsModule, ForgotInfoComponent,NgClass,RouterLink]
})
export class LoginComponent {
  loginForm!: FormGroup;
  imagePath = 'assets/Images/login-img.png';
  isShowPopup: boolean = false;
  submitted = false;
  isInvalidUser:string = ''
  constructor(private fb: FormBuilder,private router: Router,private modalService: NgbModal,private service:BankingdataService) {}
 
  @ViewChild('formElement') formElement!: ElementRef;

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,16}$/)]],
    });
  }
 
  get formControls() {
    return this.loginForm.controls;
  }

  invalidUser:boolean = false;
  onSubmit() {
    const email = this.formControls['email'].value;
    const password = this.formControls['password'].value;
    // Check if email exists in userData
    const userIndex = this.service.userData.indexOf(email);
    if (userIndex !== -1 && this.service.userData[userIndex + 1] === password) {
        this.router.navigate(['/dashboard']);
        this.service.setCurrentUser(email);
        this.service.trimmedString = this.service.trimNameFromEmail(email);
        localStorage.setItem("logindata", JSON.stringify(this.loginForm.value));
    } else {
        this.invalidUser = true;
        this.loginForm.reset();
    }
}
  openForgotPasswordPopup(content: TemplateRef<any>) {
    this.modalService.open(content, {
      centered: true,
      scrollable: true,
      size: 'lg',
      backdrop: 'static',
    });
  }
  ngAfterViewInit() {
    const formFields = this.formElement.nativeElement.querySelectorAll('input');
    formFields.forEach((field: HTMLInputElement) => {
      field.setAttribute('autocomplete', 'off');
    });
  }

}
