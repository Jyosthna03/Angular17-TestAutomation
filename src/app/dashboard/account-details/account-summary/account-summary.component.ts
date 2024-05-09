import { Component } from '@angular/core';
import { BankingdataService } from '../../../bankingdata.service';
import { DigitSpacingPipe } from '../digit-spacing.pipe';

@Component({
  selector: 'app-account-summary',
  standalone: true,
  imports: [DigitSpacingPipe],
  templateUrl: './account-summary.component.html',
  styleUrl: './account-summary.component.css'
})
export class AccountSummaryComponent {
  constructor(private service:BankingdataService){}

  isDisplay:boolean = false;
  accountSummary:any;
  accountUserName:any;
  accountBalance:any;
  

  ngOnInit(){
    this.accountBalance = this.service.balance
    this.accountSummary = this.service.accountData
    this.accountUserName = this.service.trimmedString
    console.log(this.accountSummary);
  }


}
