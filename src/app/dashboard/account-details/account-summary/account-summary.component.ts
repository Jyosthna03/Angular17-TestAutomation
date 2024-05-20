import { Component } from '@angular/core';
import { BankingdataService } from '../../../bankingdata.service';

@Component({
  selector: 'app-account-summary',
  standalone: true,
  imports: [],
  templateUrl: './account-summary.component.html',
  styleUrl: './account-summary.component.css'
})
export class AccountSummaryComponent {
  constructor(private service:BankingdataService){}

  isDisplay:boolean = false;
  accountSummary:any;
  accountUserName:any;
  
  ngOnInit(){
    this.accountSummary = this.service.accountData
    this.accountUserName = this.service.trimmedString
  }


}
