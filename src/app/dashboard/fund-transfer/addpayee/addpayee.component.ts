import { Component, ElementRef,ViewChild } from '@angular/core';
import {FormBuilder,FormControl,FormGroup,ReactiveFormsModule,Validators,} from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BankingdataService } from '../../../bankingdata.service';
import { CommonModule } from '@angular/common';
import { SharedFile } from '../../../sharedfile';

@Component({
  selector: 'app-addpayee',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './addpayee.component.html',
  styleUrl: './addpayee.component.css',
})
export class AddpayeeComponent {
  constructor(
    private service: BankingdataService,
    private fb: FormBuilder,
    private modalService: NgbModal
  ) {
    this.addPayeeForm = this.fb.group(
      {
        fullname: new FormControl('', [
          Validators.required,
          Validators.pattern(/^[a-zA-Z ]*$/),
          Validators.minLength(3),
          Validators.maxLength(15),
        ]),
        nickname: new FormControl('', [
          Validators.required,
          Validators.pattern(/^[a-zA-Z ]*$/),
          Validators.minLength(3),
          Validators.maxLength(10),
        ]),
        bankName: new FormControl('', [Validators.required]),
        ifscCode: new FormControl('', [
          Validators.required,
          Validators.pattern('^[A-Za-z]{4}0[A-Z0-9a-z]{6}$'),
          Validators.maxLength(11),
        ]),
        accountNo: new FormControl('', [
          Validators.required,
          Validators.pattern(/^\d*$/),
          Validators.minLength(8),
          Validators.maxLength(18),
        ]),
        reEnteraccountNo: new FormControl('', [
          Validators.required,
          Validators.pattern(/^\d*$/),
        ]),
      },
      {
        validators: this.accountNoMatchValidator,
      }
    );
  }
  sharedFile = new SharedFile(this.service);
  addPayeeForm!: FormGroup;
  bankNames = this.sharedFile.banks;
  payeeAddMsg: string = '';
  

  ngOnInit() {
    this.addPayeeForm.get('accountNo')?.valueChanges.subscribe((value) => {
      this.service.changeAccountNumber(value);
    });
    this.addPayeeForm.get('bankName')?.valueChanges.subscribe((value) => {
      this.service.userBankName(value);
    });
  }

  accountNoMatchValidator(addPayeeForm: FormGroup) {
    const accNumber = addPayeeForm.get('accountNo')?.value;
    const reEnterAccNumber = addPayeeForm.get('reEnteraccountNo')?.value;
    return accNumber === reEnterAccNumber ? null : { mismatch: true };
  }

  submitPayee() {
    this.service.addPayee.push(this.addPayeeForm.value.fullname);
    this.payeeAddMsg = 'Payee Added Successfully!!!';
    setTimeout(() => {
      this.closePopup();
    }, 1000);
  }

  onReset() {
    if (this.addPayeeForm.valid) {
      this.addPayeeForm.reset()
    }
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
