import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavbarComponent } from '../../account-details/navbar/navbar.component';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BankingdataService } from '../../../bankingdata.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-addpayeesm',
  standalone: true,
  imports: [NavbarComponent,ReactiveFormsModule,RouterLink,CommonModule],
  templateUrl: './addpayeesm.component.html',
  styleUrl: './addpayeesm.component.css'
})
export class AddpayeesmComponent {

  addPayeesmForm!:FormGroup;
  bankNames = ['ICICI','SBI','HDFC','Axis','StandardCharted']
  constructor(private service:BankingdataService,private fb:FormBuilder, private route:Router, private modalService:NgbModal){
    this.addPayeesmForm = fb.group ({
      fullname: new FormControl('',[Validators.required, Validators.pattern(/^[a-zA-Z ]*$/),Validators.minLength(3),Validators.maxLength(15)]),
      nickname: new FormControl('',[Validators.required, Validators.pattern(/^[a-zA-Z ]*$/),Validators.minLength(3),Validators.maxLength(10)]),
      bankName: new FormControl('',[Validators.required]),
      ifscCode: new FormControl('',[Validators.required,Validators.pattern('^[A-Za-z]{4}0[A-Z0-9a-z]{6}$'),Validators.maxLength(11)]),
      accountNo: new FormControl('',[Validators.required,Validators.pattern(/^\d*$/),Validators.minLength(8),Validators.maxLength(18)]),
      reEnteraccountNo: new FormControl('',[Validators.required,Validators.pattern(/^\d*$/)])
    },
    {
       validators : this.accountNoMatchValidator
    });
  }

  ngOnInit(){
    this.addPayeesmForm.get('accountNo')?.valueChanges.subscribe(value=>{
        this.service.changeAccountNumber(value)
    })
    this.addPayeesmForm.get('bankName')?.valueChanges.subscribe(value=>{
      this.service.userBankName(value)
    })
  }

  accountNoMatchValidator(addPayeeForm: FormGroup) {
    const accNumber = addPayeeForm.get('accountNo')?.value;
    const reEnterAccNumber = addPayeeForm.get('reEnteraccountNo')?.value;

    return accNumber === reEnterAccNumber ? null : { mismatch: true };
  }

  onKeyPress(event: KeyboardEvent) {
    const inputChar = String.fromCharCode(event.charCode);
    if (!/^\d+$/.test(inputChar)) {
      event.preventDefault();
    }
  }

  @ViewChild('formElement') formElement!: ElementRef;
  ngAfterViewInit() {
  const formFields = this.formElement.nativeElement.querySelectorAll('input');
  formFields.forEach((field: HTMLInputElement) => {
    field.setAttribute('autocomplete', 'off');
  });
 }

 submitPayee(formData:any){
  console.log(formData)
  this.service.addPayee.push(this.addPayeesmForm.value.fullname);
  this.addPayeesmForm.reset()
  alert('Payee Added Sucessfully')
  this.route.navigate(['/transferDashboard'])
  
}

onCancel() {
   this.addPayeesmForm.reset();
}

}
