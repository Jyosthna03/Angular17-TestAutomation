import { Component } from '@angular/core';
import { BankingdataService } from '../../bankingdata.service';


@Component({
  selector: 'app-account-details',
  standalone: true,
  templateUrl: './account-details.component.html',
  styleUrl: './account-details.component.css'
})
export class AccountDetailsComponent {
  constructor(private reg:BankingdataService){}

  getTransction(){
    this.reg.isTransactionHistory=true;
  }

  getStatements(){
    this.reg.isAccountStatement=true;
  }
}
