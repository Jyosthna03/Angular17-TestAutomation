import { Component} from '@angular/core';
import { NavbarComponent } from '../../account-details/navbar/navbar.component';
import { BankingdataService } from '../../../bankingdata.service';
import { RouterLink} from '@angular/router';
import { BillerFormValues, RechargeFormValues } from '../../../modal';

@Component({
  selector: 'app-payment-success',
  standalone: true,
  imports: [NavbarComponent,RouterLink],
  templateUrl: './payment-success.component.html',
  styleUrl: './payment-success.component.css'
})
export class PaymentSuccessComponent{

  selectBillerPayment!:BillerFormValues[];
  mobileRechargePayment!:RechargeFormValues[]
 
  constructor(private service:BankingdataService){}
  recharge:boolean = this.service.rechargePaymentSuccess
  ngOnInit(){
    this.selectBillerPayment =  this.service.selectBillerSuccess as BillerFormValues[];
    this.mobileRechargePayment = this.service.selectBillerSuccess as RechargeFormValues[];
  }

  

}
