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
  username:string="";
  ngOnInit(){
    this.username = this.service.trimmedString
  }
  constructor(private service:BankingdataService,private route:Router) { }

  gotoDashboard(tabIndex: number, routePath: string){
    this.service.userSelectedTab = this.service.tabNames[tabIndex].displayName;
    this.service.userSelectTab(this.service.userSelectedTab);
    this.route.navigate([routePath]);
  }

  gotoAccountDashboard(){
    this.gotoDashboard(0, "/accountDashboard");
  }

  gotoPaymentDashboard(){
    this.gotoDashboard(1, "/paymentDashboard");
  }
  gotoTransferDashboard(){
    this.gotoDashboard(2, "/transferDashboard");
  }
  
  logOut(){
    this.route.navigate(['/'])
    localStorage.removeItem('logindata')
  }
}
