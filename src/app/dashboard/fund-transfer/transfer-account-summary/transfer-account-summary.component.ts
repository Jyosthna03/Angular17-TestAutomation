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

  
  userAccountDetails:any;
  constructor(private service:BankingdataService){}
  ngOnInit(){
    this.userAccountDetails = this.service.accountData;
    this.userAccountDetails[0].AccountHolder = this.service.trimmedString;
    console.log(this.userAccountDetails)
  }

 
  
}
