import { Component } from '@angular/core';
import { BankingdataService } from '../../../bankingdata.service';
import { AccountData, CardDetails } from '../../../modal';

@Component({
  selector: 'app-account-summary',
  standalone: true,
  templateUrl: './account-summary.component.html',
  styleUrl: './account-summary.component.css'
})
export class AccountSummaryComponent {
  constructor(private service:BankingdataService){}

  isDisplay:boolean = false;
  accountDetails!:CardDetails[];
  
  ngOnInit(){
    this.accountDetails = this.service.multipleAccountData
  }


}
