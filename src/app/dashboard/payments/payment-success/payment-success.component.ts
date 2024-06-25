import { Component} from '@angular/core';
import { NavbarComponent } from '../../account-details/navbar/navbar.component';
import { BankingdataService } from '../../../bankingdata.service';
import { RouterLink} from '@angular/router';

@Component({
  selector: 'app-payment-success',
  standalone: true,
  imports: [NavbarComponent,RouterLink],
  templateUrl: './payment-success.component.html',
  styleUrl: './payment-success.component.css'
})
export class PaymentSuccessComponent{

  selectBillerPayment:any;
  mobileRechargePayment:any
 
  constructor(private service:BankingdataService){}
  recharge:boolean = this.service.rechargePaymentSuccess
  ngOnInit(){
    this.selectBillerPayment =  this.service.selectBillerSuccess;
    console.log(this.selectBillerPayment)
    this.mobileRechargePayment = this.service.selectBillerSuccess
  }

  

}
