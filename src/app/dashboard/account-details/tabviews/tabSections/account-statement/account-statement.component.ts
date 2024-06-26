import { DatePipe, NgClass } from '@angular/common';
import { Component, signal } from '@angular/core';
import {FormBuilder,FormGroup,ReactiveFormsModule,Validators,} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { userviewByPeriod,userviewByFormat } from '../../../../../sharedfile';
import { BankingdataService } from '../../../../../bankingdata.service';

@Component({
  selector: 'app-account-statement',
  standalone: true,
  imports: [DatePipe, RouterLink, ReactiveFormsModule, NgClass],
  templateUrl: './account-statement.component.html',
  styleUrl: './account-statement.component.css',
})
export class AccountStatementComponent {
  constructor(private fb: FormBuilder, private serv: BankingdataService) {
    this.statementForm = this.fb.group({
      inputType: ['', Validators.required],
      fromDate: ['', Validators.required],
      toDate: ['', Validators.required],
      selectedOption: ['', Validators.required],
      downloadFormat: ['', Validators.required],
    });

    this.statementForm.get('inputType')!.valueChanges.subscribe((value) => {
      if (value === 'dateRange') {
        this.statementForm.get('selectedOption')!.disable();
        this.statementForm.get('fromDate')!.enable();
        this.statementForm.get('toDate')!.enable();
      } else if (value === 'dropdown') {
        this.statementForm.get('fromDate')!.disable();
        this.statementForm.get('toDate')!.disable();
        this.statementForm.get('selectedOption')!.enable();
      }
    });
  }

  // sharedFile = new SharedFile(this.serv);
  fromStatementDate = signal('');
  toStatementDate = signal('');
  showflag = signal('');
  todayDate = signal(new Date());
  statementPeriod = signal(userviewByPeriod);
  statementFormats = signal(userviewByFormat);
  statementForm!: FormGroup;

  cancelForm() {
    this.statementForm.get('selectedOption')!.enable();
    this.statementForm.get('fromDate')!.enable();
    this.statementForm.get('toDate')!.enable();
    this.statementForm.reset();
    this.statementForm.get('selectedOption')!.setValue('');
    this.statementForm.get('downloadFormat')!.setValue('');
  }
}
