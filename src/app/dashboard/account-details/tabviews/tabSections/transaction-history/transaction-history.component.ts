import { Component } from '@angular/core';
import { BankingdataService } from '../../../../../bankingdata.service';
import { FormsModule } from '@angular/forms';
import {  DatePipe, NgStyle } from '@angular/common';

import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-transaction-history',
  standalone: true,
  imports: [FormsModule, DatePipe, NgStyle, RouterLink],
  templateUrl: './transaction-history.component.html',
  styleUrl: './transaction-history.component.css'
})
export class TransactionHistoryComponent {

  constructor(private serv: BankingdataService) {
    this.rightPaginationItems = this.totalPages;
  }

  ngOnInit() {
    this.generateTransactionData();
    this.rightPaginationItems = this.getpageList(
      this.TransHistory.length,
      this.selectedShowperPage
    );
  }

  leftpaginationMode = false;
  rightpaginationMode = true;
  TransHistory: any = [];

  generateTransactionData() {
    for (let i = 1; i <= 60; i++) {
      this.TransHistory.push({
        sno: i.toString().padStart(2, '0'),
        valueDate: '18/03/2024',
        transactionDate: '18/03/2024',
        transctionRemarks:
          'VIN/BLINKIT/202403031436/4063-09545745/Phone pe/Blinkit',
        withDrawalAmount: '314.45',
        depositAmount: '',
        balance: '1109.82',
        dayClosingBalance: '1109.82',
      });
    }
  }

  

  isDisablebyDatefield = false;
  isDisableByPeriodfield = false;
  selectedOpt: string = '';
  fromTransDate = '';
  toTransDate = '';
  showMode = '';
  showData = false;
  todayDate = Date();
  showflag = '';
  periodicDays = ['Last 7 Days', 'Last 14 Days'];
  selectedperidocday = this.periodicDays[0];

  onSelectPeriodicDays(event: any) {
    this.selectedperidocday = event.target.value;
    console.log(this.selectedperidocday);
  }

  showWithDate() {
    this.showflag = 'Show With Date';
  }

  showWithPeriod() {
    this.showflag = 'Show With Period';
  }

  userChange() {
    this.cancelField();
  }

  cancelField() {
    this.showData = false;
    this.fromTransDate = '';
    this.toTransDate = '';
  }

  submitField() {
    console.log(this.showflag);
    console.log(this.fromTransDate);
    console.log(this.toTransDate);
    console.log(this.selectedperidocday);
    if (
      this.showflag == 'Show With Date' &&
      this.fromTransDate != '' &&
      this.toTransDate != ''
    ) {
      this.showData = true;
      this.serv.getData().subscribe((data: any) => {
        if (data['TransHistory'].length != 0) {
          console.log(data['TransHistory']);
          this.TransHistory = data['TransHistory'];
          this.totalPages = this.getpageList(
            this.TransHistory.length,
            this.selectedShowperPage
          );
        }
      });
      this.showflag = '';
    } else if (
      this.showflag == 'Show With Period' &&
      this.selectedperidocday != ''
    ) {
      this.showData = true;
      this.serv.getData().subscribe((data: any) => {
        if (data['TransHistory'].length != 0) {
          console.log(data['TransHistory']);
          this.TransHistory = data['TransHistory'];
          this.totalPages = this.getpageList(
            this.TransHistory.length,
            this.selectedShowperPage
          );
        }
      });
      this.showflag = '';
    } else {
      alert('Choose Option and Select The Fields To Download');
    }
  }

  selectedShowperPage = 5;
  startIndex = 0;
  endIndex = 5;
  currentPage = 1;
  totalPages = this.getpageList(
    this.TransHistory.length,
    this.selectedShowperPage
  );

  onPageChange(pageNo: number) {
    this.leftpaginationMode = false;
    this.rightpaginationMode = true;
    this.currentPage = pageNo;
    this.rightPaginationItems = this.getpageList(
      this.TransHistory.length,
      this.selectedShowperPage
    );
  }

  getpageList(totRecords: number, pageItems: number) {
    let tempArray = [];
    totRecords = totRecords / pageItems;
    for (let i = 0; i < totRecords; i++) {
      tempArray[i] = i + 1;
    }
    return tempArray;
  }

  getPageTransactions() {
    let Index = (this.currentPage - 1) * this.selectedShowperPage;
    return this.TransHistory.slice(
      Index,
      Number(Index) + Number(this.selectedShowperPage)
    );
  }

  rightPaginationItems: number[] = [];

  onSelectPageRows(event: any) {
    this.selectedShowperPage = event.target.value;
    console.log(this.selectedShowperPage);
    this.leftpaginationMode = true;
    this.rightpaginationMode = false;
    this.endIndex = this.selectedShowperPage;
    this.rightPaginationItems = this.getpageList(
      this.TransHistory.length,
      this.selectedShowperPage
    );
  }

  nextPage() {
    this.currentPage = this.currentPage + 1;
    if (this.currentPage == this.rightPaginationItems.length + 1) {
      this.currentPage = 1;
    }
  }

  previousPage() {
    this.currentPage = this.currentPage - 1;
    if (this.currentPage == 0) {
      this.currentPage = 1;
    }
  }
}
