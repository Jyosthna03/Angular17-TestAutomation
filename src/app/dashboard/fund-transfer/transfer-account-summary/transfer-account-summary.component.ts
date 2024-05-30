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
  balance:number = 0
  constructor(private service:BankingdataService){
    this.userAccountDetails = this.service.accountData;
    console.log(this.userAccountDetails)
    console.log(this.service.accountData)
  }

 
 
  

}
