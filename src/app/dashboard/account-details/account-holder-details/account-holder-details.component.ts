import { Component } from '@angular/core';
import { BankingdataService } from '../../../bankingdata.service';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DigitSpacingPipe } from '../digit-spacing.pipe';
import { CardDetails } from '../../../modal';

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
  breadCrumbPath: string[] = [];
  accountDetails!: CardDetails[];
  currentDate = new Date();

  ngOnInit() {
    this.accountDetails = this.service.multipleAccountData;
    this.userName = this.service.trimmedString;
    this.breadCrumbPath = this.service.breadCrumb;
  }

}
