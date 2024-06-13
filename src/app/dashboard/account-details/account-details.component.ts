import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BankingdataService } from '../../bankingdata.service';


@Component({
  selector: 'app-account-details',
  standalone: true,
  imports: [],
  templateUrl: './account-details.component.html',
  styleUrl: './account-details.component.css'
})
export class AccountDetailsComponent {
  constructor(private router: Router,private reg:BankingdataService){}

  getTransction(){
   console.log("Go To Transaction History");
    this.reg.isTransactionHistory=true;
    console.log(" Transaction History Mode: ",this.reg.isTransactionHistory);
  }

  getStatements(){
    console.log("Go To Account Statement");
    this.reg.isAccountStatement=true;
    console.log(" Statement Mode: ",this.reg.isAccountStatement);
  }
}
