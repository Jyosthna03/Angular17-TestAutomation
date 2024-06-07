import { Component } from '@angular/core';
import { BankingdataService } from '../../../bankingdata.service';
import { RecentTransactionComponent } from './tabSections/recent-transaction/recent-transaction.component';
import { TransactionHistoryComponent } from './tabSections/transaction-history/transaction-history.component';
import { AccountStatementComponent } from './tabSections/account-statement/account-statement.component';
import { NgClass, NgStyle } from '@angular/common';

@Component({
  selector: 'app-tabviews',
  standalone: true,
  imports: [RecentTransactionComponent,TransactionHistoryComponent,AccountStatementComponent,NgStyle,NgClass],
  templateUrl: './tabviews.component.html',
  styleUrl: './tabviews.component.css'
})
export class TabviewsComponent {

  constructor(private reg:BankingdataService){}
  activeTab: number = 2;

  ngOnInit(){
    if(this.reg.isTransactionHistory){
      this.activeTab=2;
      this.reg.isTransactionHistory=false;
    }else if(this.reg.isAccountStatement){
      this.activeTab=3;
      this.reg.isAccountStatement=false;
    }
  }

  activateTab(tabNo: number) {
    this.activeTab = tabNo;
  }

  

}
