import { DatePipe, NgClass } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-account-statement',
  standalone: true,
  imports: [ DatePipe, RouterLink,ReactiveFormsModule,NgClass],
  templateUrl: './account-statement.component.html',
  styleUrl: './account-statement.component.css'
})
export class AccountStatementComponent {
  fromStatementDate = signal('');
  toStatementDate = signal('');
  showflag = signal('');
  todayDate = signal(new Date());
  statementPeriod = signal(['Select here','Last 7 Days', 'Last 14 Days']);
  statementFormats = signal(['Please select','PDF File', 'Excel Sheet']);
  defaultSelect:string = 'Select here'
  defaultFile:string = 'Please select'
  selectStatementPeriod = signal(this.statementPeriod()[0]);
  selectedStatementFormat = signal(this.statementFormats()[0]);
  statementForm!:FormGroup;

  constructor(private fb:FormBuilder){
    this.statementForm = this.fb.group({
      inputType: ['', Validators.required],
      fromDate: ['', Validators.required],
      toDate: ['', Validators.required],
      selectedOption: ['',Validators.required],
      downloadFormat:['',Validators.required]
    });

    this.statementForm.get('inputType')!.valueChanges.subscribe(value => {
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

  cancelForm(){
    this.statementForm.reset();
    this.statementForm.get('selectedOption')!.setValue(this.defaultSelect);
    this.statementForm.get('downloadFormat')!.setValue(this.defaultFile);
  }

  submitForm(){
    console.log(this.statementForm.value);
  }

  showWithDate() {
    this.showflag.update(()=>'Show With Date');
    console.log(this.showflag());
  }

  showWithPeriod() {
    this.showflag.update(()=>'Show With Period');
    this.fromStatementDate.set('');
    this.toStatementDate.set('');
    console.log(this.showflag());
  }

  onSelectStatementPeriod(selectedValue: any) {
    this.selectStatementPeriod.update(()=>selectedValue.target.value);
  }

  onSelectStatementFormat(selectedValue: any) {
    this.selectedStatementFormat.update(()=>selectedValue.target.value);
  }

  submitStatement() {
    console.log("while submitting",this.showflag());
    if (
      (this.showflag() === 'Show With Date' &&
        this.fromStatementDate() !== '' &&
        this.toStatementDate() !== '' &&
        this.selectedStatementFormat() !== '') ||
      (this.showflag() === 'Show With Period' &&
        this.selectedStatementFormat() !== '')
    ) {
      let message = signal('');
      if (this.showflag() === 'Show With Date') {
        message.update(()=>`Downloaded Statement from ${this.fromStatementDate()} to ${this.toStatementDate()} in ${this.selectedStatementFormat()} Format`);
      } else if(this.showflag()==='Show With Period') {
        message.update(()=>`Downloaded Statement of ${this.selectStatementPeriod()} in ${this.selectedStatementFormat()} Format`);
      }
      alert(message());
    } else {
      alert('Choose Option and Select The Fields To Download');
    }
  }

  cancelStatement() {
    this.selectedStatementFormat.set('');
    this.fromStatementDate.set('');
    this.toStatementDate.set('');
    this.selectedStatementFormat.set(this.statementFormats()[0]);
  }
}
