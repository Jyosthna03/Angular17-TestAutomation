import { Component, signal } from '@angular/core';
import { BankingdataService } from '../../../../../bankingdata.service';
import { recent } from '../../../../../modal';
import { CurrencyPipe, NgFor } from '@angular/common';

@Component({
  selector: 'app-recent-transaction',
  standalone: true,
  imports: [CurrencyPipe,NgFor],
  templateUrl: './recent-transaction.component.html',
  styleUrl: './recent-transaction.component.css'
})
export class RecentTransactionComponent {
  constructor(private serv:BankingdataService){}
  RecentTrans!:recent[];
  recentTrans = signal(this.RecentTrans);
  
  ngOnInit(){
    this.showTabData();
  }
  
  showTabData(){
    this.serv.getData().subscribe((data:any)=>{
      if(data['RecentTrans'].length!=0){
        this.recentTrans.set(data['RecentTrans']);
        console.log(this.recentTrans());
      }
    });
  }

  
  
} 
