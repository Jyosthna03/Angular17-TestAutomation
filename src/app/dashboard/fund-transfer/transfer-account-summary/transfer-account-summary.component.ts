import { Component } from '@angular/core';
import { BankingdataService } from '../../../bankingdata.service';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { DigitSpacingPipe } from '../../account-details/digit-spacing.pipe';

@Component({
  selector: 'app-transfer-account-summary',
  standalone: true,
  imports: [CurrencyPipe,DigitSpacingPipe,CommonModule],
  templateUrl: './transfer-account-summary.component.html',
  styleUrl: './transfer-account-summary.component.css'
})
export class TransferAccountSummaryComponent {
  accbalance:number=0;
  accountNumber:any
  accountHolder:string = ''
  constructor(private service:BankingdataService){}
  ngOnInit(){
    this.accountNumber = this.service.accountData[0].AccountNumber;
    this.accountHolder = this.service.trimmedString;
    this.accbalance =  this.service.balance;
  }

 
  
}
