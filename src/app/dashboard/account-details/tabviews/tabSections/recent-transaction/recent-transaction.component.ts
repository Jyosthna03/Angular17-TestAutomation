import { Component, signal } from '@angular/core';
import { BankingdataService } from '../../../../../bankingdata.service';
import { recent } from '../../../../../modal';
import { CommonModule, CurrencyPipe, NgFor } from '@angular/common';

@Component({
  selector: 'app-recent-transaction',
  standalone: true,
  imports: [CurrencyPipe,CommonModule],
  templateUrl: './recent-transaction.component.html',
  styleUrl: './recent-transaction.component.css'
})
export class RecentTransactionComponent {
  constructor(private serv:BankingdataService){}
  RecentTrans!:recent[];
  dropdownDisabled = true;
  recentTrans = signal(this.RecentTrans);
  selectOpts = ['Credit Card','Debit Card','Utilities','Mobile Recharge'];
  selectedOption = 'Credit Card';

  selectOption(option: string) {
    this.selectedOption = option;
    console.log(this.selectedOption);
  }
  ngOnInit(){
    this.serv.getData().subscribe((data:any)=>{
      if(data['RecentTrans'].length!=0){
        this.recentTrans.set(data['RecentTrans']);
        console.log(this.recentTrans());
      }
    });
  }

  
  
} 
