import { Component } from '@angular/core';
import { BankingdataService } from '../../../bankingdata.service';
import { NgStyle } from '@angular/common';
import { DigitSpacingPipe } from '../digit-spacing.pipe';
import { SharedFile } from '../../../sharedfile';
import { AccountData, CardDetails } from '../../../modal';


@Component({
  selector: 'app-multiple-accounts',
  standalone: true,
  imports: [NgStyle,DigitSpacingPipe],
  templateUrl: './multiple-accounts.component.html',
  styleUrl: './multiple-accounts.component.css'
})
export class MultipleAccountsComponent {
  constructor(private service:BankingdataService){}
  sharedData = new SharedFile(this.service);
  accountData!:CardDetails[];
  selectedData!: CardDetails;

   ngOnInit(){
      this.selectedCard(this.sharedData.cardDetails[0])
      this.accountData = this.sharedData.cardDetails;
   }
   
   isSelected(data: CardDetails): boolean {
      return this.selectedData === data;
    }

  selectedCard(data: CardDetails) {
      this.selectedData = data;
      this.service.multipleAccountData.pop() 
      this.service.multipleAccountData.push(data)
    }
}
