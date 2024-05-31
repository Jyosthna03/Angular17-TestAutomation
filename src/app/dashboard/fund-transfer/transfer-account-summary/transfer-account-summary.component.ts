import { Component } from '@angular/core';
import { BankingdataService } from '../../../bankingdata.service';
import { CommonModule, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-transfer-account-summary',
  standalone: true,
  imports: [CurrencyPipe,CommonModule],
  templateUrl: './transfer-account-summary.component.html',
  styleUrl: './transfer-account-summary.component.css'
})
export class TransferAccountSummaryComponent {

  constructor(private service:BankingdataService){}

  userBankDetails = [
    {
      AccountHolder: this.service.trimmedString,
      AccountType:"Savings Account",
      AccountNumber:"1234567890111213",
      AccountifscCode:"ABCD0001234",
      AccountBranch:"KPHB",
      AvailableBalanceinRupees: this.service.balance
  }
  ]
 
 
  

}
