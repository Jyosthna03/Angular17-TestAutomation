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

  
  userAccountDetails:string = '';
  balance:number = 0
  constructor(private service:BankingdataService){}

  ngOnInit(){
    this.userAccountDetails = this.service.trimmedString;
    this.balance = this.service.balance
   
  }
 
  
}
