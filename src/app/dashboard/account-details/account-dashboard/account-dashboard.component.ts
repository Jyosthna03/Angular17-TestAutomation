import { Component } from '@angular/core';
import { AccountHolderDetailsComponent } from '../account-holder-details/account-holder-details.component';
import { MultipleAccountsComponent } from '../multiple-accounts/multiple-accounts.component';
import { AccountSummaryComponent } from '../account-summary/account-summary.component';
import { TabviewsComponent } from '../tabviews/tabviews.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-account-dashboard',
  standalone: true,
  imports: [AccountHolderDetailsComponent,MultipleAccountsComponent,AccountSummaryComponent,TabviewsComponent,CommonModule],
  templateUrl: './account-dashboard.component.html',
  styleUrl: './account-dashboard.component.css'
})
export class AccountDashboardComponent {

  isloaded=false;
  ngOnInit() {
    setInterval(() => {
      this.isloaded = true;
    }, 1000);
  }
}
