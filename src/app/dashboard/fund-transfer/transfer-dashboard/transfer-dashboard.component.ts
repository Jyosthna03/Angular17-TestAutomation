import { Component } from '@angular/core';
import { AccountHolderDetailsComponent } from '../../account-details/account-holder-details/account-holder-details.component';
import { TransferAccountSummaryComponent } from '../transfer-account-summary/transfer-account-summary.component';
import { MoneyTransferComponent } from '../money-transfer/money-transfer.component';

@Component({
  selector: 'app-transfer-dashboard',
  standalone: true,
  imports: [AccountHolderDetailsComponent,TransferAccountSummaryComponent,MoneyTransferComponent],
  templateUrl: './transfer-dashboard.component.html',
  styleUrl: './transfer-dashboard.component.css'
})
export class TransferDashboardComponent {


  

}
