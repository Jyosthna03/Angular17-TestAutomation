import { Component } from '@angular/core';
import { BankingdataService } from '../../../bankingdata.service';
import { NgStyle } from '@angular/common';
import { DigitSpacingPipe } from '../digit-spacing.pipe';

@Component({
  selector: 'app-multiple-accounts',
  standalone: true,
  imports: [NgStyle,DigitSpacingPipe],
  templateUrl: './multiple-accounts.component.html',
  styleUrl: './multiple-accounts.component.css'
})
export class MultipleAccountsComponent {
  constructor(private service:BankingdataService){}

   ngOnInit(){
    this.selectedCard(this.cardDetails[0])
   }
    cardDetails = [
      {
        id:1,
        AccountHolder: this.service.trimmedString,
        AccountType:"Savings Account",
        AccountNumber:"1234567890111213",
        AccountBranch:"KPHB",
        AvailableBalanceinRupees: this.service.balance
      },
      {
        id:2,
        AccountHolder: this.service.trimmedString,
        AccountType:"Loan Account",
        AccountNumber:"1234567890111213",
        AccountBranch:"KPHB",
        AvailableBalanceinRupees: "2,50,000"
      },
      {
        id:3,
        AccountHolder: this.service.trimmedString,
        AccountType:"Credit Card",
        AccountNumber:"1234567890111213",
        AccountBranch:"KPHB",
        AvailableBalanceinRupees: "1,00,000"
      },
      {
        id:4,
        AccountHolder: this.service.trimmedString,
        AccountType:"OverDraft Account",
        AccountNumber:"1234567890111213",
        AccountBranch:"KPHB",
        AvailableBalanceinRupees: this.service.balance
      }]

    selectedData: any;
    isSelected(data: any): boolean {
      return this.selectedData === data;
    }

    selectedCard(data: any) {
      this.selectedData = data;
      this.service.accountData.pop() 
      this.service.accountData.push(data)
    }
}
