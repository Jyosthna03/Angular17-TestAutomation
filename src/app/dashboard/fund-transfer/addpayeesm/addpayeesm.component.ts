import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavbarComponent } from '../../account-details/navbar/navbar.component';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BankingdataService } from '../../../bankingdata.service';
import { CommonModule } from '@angular/common';
import { SharedFile } from '../../../sharedfile';

@Component({
  selector: 'app-addpayeesm',
  standalone: true,
  imports: [NavbarComponent, ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './addpayeesm.component.html',
  styleUrl: './addpayeesm.component.css',
})
export class AddpayeesmComponent {
  constructor(
    private service: BankingdataService,
    fb: FormBuilder,
    private route: Router  ) {
    this.addPayeesmForm = fb.group(
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
  addPayeesmForm!: FormGroup;
  bankNames = this.sharedFile.banks;
  

  ngOnInit() {
    this.addPayeesmForm.get('accountNo')?.valueChanges.subscribe((value) => {
      this.service.changeAccountNumber(value);
    });
    this.addPayeesmForm.get('bankName')?.valueChanges.subscribe((value) => {
      this.service.userBankName(value);
    });
  }

  accountNoMatchValidator(addPayeeForm: FormGroup) {
    const accNumber = addPayeeForm.get('accountNo')?.value;
    const reEnterAccNumber = addPayeeForm.get('reEnteraccountNo')?.value;
    return accNumber === reEnterAccNumber ? null : { mismatch: true };
  }

  onKeyPress(event: KeyboardEvent) {
    const inputChar = event.key;
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

  submitPayee() {
    this.service.addPayee.push(this.addPayeesmForm.value.fullname);
    this.route.navigate(['/transferDashboard']);
  }

  onCancel() {
    this.addPayeesmForm.reset();
    this.addPayeesmForm.get('bankName')!.setValue('');
  }
}
