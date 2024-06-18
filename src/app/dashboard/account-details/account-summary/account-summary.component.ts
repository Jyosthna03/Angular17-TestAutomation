import { Component } from '@angular/core';
import { BankingdataService } from '../../../bankingdata.service';
import { CardDetails } from '../../../modal';

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
  accountDetails!:CardDetails[];
  
  ngOnInit(){
    this.accountDetails = this.service.accountData

  }


}
