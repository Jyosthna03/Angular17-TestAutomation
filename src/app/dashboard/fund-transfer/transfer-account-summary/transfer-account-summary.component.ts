import { Component } from '@angular/core';
import { BankingdataService } from '../../../bankingdata.service';
import { CurrencyPipe } from '@angular/common';
import { SharedFile } from '../../../sharedfile';
import { AccountData } from '../../../modal';

@Component({
  selector: 'app-transfer-account-summary',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './transfer-account-summary.component.html',
  styleUrl: './transfer-account-summary.component.css'
})
export class TransferAccountSummaryComponent {

  constructor(private service:BankingdataService){}
  sharedData = new SharedFile(this.service);
  userBankDetails!:AccountData[]

  ngOnInit(){
    this.userBankDetails = this.sharedData.userBankDetails
  }

   
 
 
  

}
