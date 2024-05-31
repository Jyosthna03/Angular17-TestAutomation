import { Component } from '@angular/core';
import { BankingdataService } from '../../../bankingdata.service';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DigitSpacingPipe } from '../digit-spacing.pipe';

@Component({
  selector: 'app-account-holder-details',
  standalone: true,
  imports: [DatePipe,RouterLink,DigitSpacingPipe],
  templateUrl: './account-holder-details.component.html',
  styleUrl: './account-holder-details.component.css'
})
export class AccountHolderDetailsComponent {

  constructor(private service: BankingdataService) {}
  userName: string = '';
  breadCrumbPath: any[] = [];
  accountDetails: any;
  currentDate = new Date();
  accountNo:string = '1234567890111213';

  ngOnInit() {
    this.accountDetails = this.service.accountData;
    this.userName = this.service.trimmedString;
    this.breadCrumbPath = this.service.breadCrumb;
  }

}
