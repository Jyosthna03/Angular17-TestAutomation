import { DatePipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-account-statement',
  standalone: true,
  imports: [FormsModule, DatePipe, RouterLink],
  templateUrl: './account-statement.component.html',
  styleUrl: './account-statement.component.css'
})
export class AccountStatementComponent {
  fromStatementDate = signal('');
  toStatementDate = signal('');
  showflag = signal('');
  todayDate = signal(new Date());

  

  

  

  statementPeriod = signal(['Last 7 Days', 'Last 14 Days']);
  selectStatementPeriod = signal(this.statementPeriod()[0]);

  statementFormats = signal(['PDF File', 'Excel Sheet']);
  selectedStatementFormat = signal(this.statementFormats()[0]);

  showWithDate() {
    this.showflag.update(value=>value='Show With Date');
    console.log(this.showflag());
  }

  showWithPeriod() {
    this.showflag.update(value=>value='Show With Period');
    console.log(this.showflag());
  }

  onSelectStatementPeriod(selectedValue: any) {
    this.selectStatementPeriod.update(value=>value=selectedValue.target.value);
  }

  onSelectStatementFormat(selectedValue: any) {
    this.selectedStatementFormat.update(value=>value=selectedValue.target.value);
  }

  submitStatement() {
    console.log("while submitting",this.showflag);
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
        message.update(value=>value=`Downloaded Statement from ${this.fromStatementDate()} to ${this.toStatementDate()} in ${this.selectedStatementFormat()} Format`);
      } else if(this.showflag()==='Show With Period') {
        message.update(value=>value=`Downloaded Statement of ${this.selectStatementPeriod()} in ${this.selectedStatementFormat()} Format`);
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
