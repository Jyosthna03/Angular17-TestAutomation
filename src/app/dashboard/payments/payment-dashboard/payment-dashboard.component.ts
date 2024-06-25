import { Component } from '@angular/core';
import { AccountHolderDetailsComponent } from "../../account-details/account-holder-details/account-holder-details.component";
import { SelectBillerComponent } from "../select-biller/select-biller.component";

@Component({
    selector: 'app-payment-dashboard',
    standalone: true,
    templateUrl: './payment-dashboard.component.html',
    styleUrl: './payment-dashboard.component.css',
    imports: [AccountHolderDetailsComponent, SelectBillerComponent]
})
export class PaymentDashboardComponent {

}
