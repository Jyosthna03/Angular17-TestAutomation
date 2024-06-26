import { Component, signal } from '@angular/core';
import { recent } from '../../../../../modal';
import { CurrencyPipe, NgFor } from '@angular/common';
import { userRecentTrans } from '../../../../../sharedfile';


@Component({
  selector: 'app-recent-transaction',
  standalone: true,
  imports: [CurrencyPipe,NgFor],
  templateUrl: './recent-transaction.component.html',
  styleUrl: './recent-transaction.component.css'
})

export class RecentTransactionComponent {
  
  RecentTrans:recent[]=[];
  recentTrans = signal(this.RecentTrans);
  ngOnInit(){
    this.recentTrans.set(userRecentTrans);
  }
  
} 
