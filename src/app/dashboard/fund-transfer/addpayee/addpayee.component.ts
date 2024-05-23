import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BankingdataService } from '../../../bankingdata.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-addpayee',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './addpayee.component.html',
  styleUrl: './addpayee.component.css'
})
export class AddpayeeComponent {

  addPayeeForm!:FormGroup
  bankNames = ['Hdfc', 'Axis', 'SBI', 'ICICI', 'StandardChart'];
  constructor(private service:BankingdataService,private fb:FormBuilder, private route:Router, private modalService:NgbModal){
    this.addPayeeForm = fb.group ({
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

   accountNoMatchValidator(addPayeeForm: FormGroup) {
    const accNumber = addPayeeForm.get('accountNo')?.value;
    const reEnterAccNumber = addPayeeForm.get('reEnteraccountNo')?.value;

    return accNumber === reEnterAccNumber ? null : { mismatch: true };
  }
 
  submitPayee(formData:any){
        this.service.addPayee.push(this.addPayeeForm.value.fullname);
        this.service.addpayeeData.push(formData)
        console.log(this.service.addpayeeData)
        alert('Payee Added Sucessfully')
        this.closePopup()
  }

  onCancel() {
    this.addPayeeForm.reset();
   }
  
  closePopup() {
    this.modalService.dismissAll();
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

}
