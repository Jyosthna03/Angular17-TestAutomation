import { Component } from '@angular/core';
import { BankingdataService } from '../../../bankingdata.service';
import { NavbarComponent } from '../../account-details/navbar/navbar.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { successData } from '../../../modal';

@Component({
  selector: 'app-transfer-successfull',
  standalone: true,
  imports: [NavbarComponent,RouterOutlet,RouterLink,CurrencyPipe],
  templateUrl: './transfer-successfull.component.html',
  styleUrl: './transfer-successfull.component.css'
})
export class TransferSuccessfullComponent {

  constructor(private service:BankingdataService){}
  paymentData!:successData[];
  ngOnInit(){
    this.paymentData = this.service.paymentSucess as successData[];
  }
}
