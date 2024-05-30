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
  accountDetails:any;
  
  ngOnInit(){
    this.accountDetails = this.service.accountData
    this.accountDetails[0].AccountHolder = this.service.trimmedString;
    console.log(this.accountDetails)
  }


}
