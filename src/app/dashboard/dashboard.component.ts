import { Component } from '@angular/core';
import { BankingdataService } from '../bankingdata.service';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AccountDetailsComponent } from "./account-details/account-details.component";
import { PaymentsComponent } from "./payments/payments.component";
import { FundTransferComponent } from "./fund-transfer/fund-transfer.component";

@Component({
    selector: 'app-dashboard',
    standalone: true,
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.css',
    imports: [ReactiveFormsModule, AccountDetailsComponent, PaymentsComponent, FundTransferComponent,RouterLink]
})
export class DashboardComponent {
  username:any;
  ngOnInit(){
    this.username = this.service.trimmedString
  }
  constructor(private service:BankingdataService,private route:Router) { }
  
  gotoAccountDashboard(){
    this.service.userSelectedTab = this.service.tabNames[0].displayName;
    this.service.userSelectTab(this.service.userSelectedTab)
    this.route.navigate(["/accountDashboard"]);
  }

  gotoTransferDashboard(){
    this.service.userSelectedTab = this.service.tabNames[2].displayName;
    this.service.userSelectTab(this.service.userSelectedTab)
    this.route.navigate(["/transferDashboard"]);
  }
  gotoPaymentDashboard(){
    this.service.userSelectedTab = this.service.tabNames[1].displayName;
    this.service.userSelectTab(this.service.userSelectedTab)
    this.route.navigate(['/paymentDashboard']);
  }

  logOut(){
    this.route.navigate(['/login'])
    localStorage.removeItem('logindata')
  }
}
