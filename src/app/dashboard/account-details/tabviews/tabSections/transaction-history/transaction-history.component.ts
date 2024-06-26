import { Component} from '@angular/core';
import {FormBuilder,FormGroup,ReactiveFormsModule,Validators,} from '@angular/forms';
import { DatePipe, NgClass, NgStyle } from '@angular/common';
import { RouterLink } from '@angular/router';
import { history } from '../../../../../modal';
import { userTransHistory,userviewByPeriod } from '../../../../../sharedfile';
@Component({
  selector: 'app-transaction-history',
  standalone: true,
  imports: [DatePipe, NgStyle, RouterLink, ReactiveFormsModule, NgClass],
  templateUrl: './transaction-history.component.html',
  styleUrl: './transaction-history.component.css',
})
export class TransactionHistoryComponent {
  leftpaginationMode:boolean = false;
  rightpaginationMode:boolean = true;
  TransHistory: history[] = [];
  showData:boolean = false;
  todayDate = Date();
  periodicDays = userviewByPeriod;
  selectedShowperPage:number = 5;
  startIndex:number = 0;
  endIndex:number = 5;
  currentPage:number = 1;
  totalPages:number[] = this.getpageList(
    this.TransHistory.length,
    this.selectedShowperPage
  );
  rightPaginationItems: number[] = [];
  transactionForm!: FormGroup;

  ngOnInit() {
    this.generateTransactionData();
    this.rightPaginationItems = this.getpageList(
      this.TransHistory.length,
      this.selectedShowperPage
    );
  }

  generateTransactionData() {
    for (let i = 1; i <= 60; i++) {
      this.TransHistory.push({
        sno: i.toString().padStart(2, '0'),
        transactionDate: '18/03/2024',
        transctionRemarks:
          'VIN/BLINKIT/202403031436/4063-09545745/Phone pe/Blinkit',
        withDrawalAmount: '314.45',
        depositAmount: '',
        balance: '1109.82',
      });
    }
  }

  constructor( private fb: FormBuilder,) {
    
    this.rightPaginationItems = this.totalPages;
    this.transactionForm = this.fb.group({
      inputType: ['', Validators.required],
      fromDate: ['', Validators.required],
      toDate: ['', Validators.required],
      selectedOption: ['', Validators.required],
    });
    this.transactionForm.get('inputType')!.valueChanges.subscribe((value) => {
      if (value === 'dateRange') {
        this.transactionForm.get('selectedOption')!.disable();
        this.transactionForm.get('fromDate')!.enable();
        this.transactionForm.get('toDate')!.enable();
      } else if (value === 'dropdown') {
        this.transactionForm.get('fromDate')!.disable();
        this.transactionForm.get('toDate')!.disable();
        this.transactionForm.get('selectedOption')!.enable();
      }
    });
  }

  submitForm() {
    if (this.transactionForm.valid) {
      this.TransHistory = userTransHistory;
      this.totalPages = this.getpageList(
        this.TransHistory.length,
        this.selectedShowperPage
      );
      this.showData = true;
    }
  }

  cancelForm() {
    this.transactionForm.get('selectedOption')!.enable();
    this.transactionForm.get('fromDate')!.enable();
    this.transactionForm.get('toDate')!.enable();
    this.transactionForm.reset();
    this.transactionForm.get('selectedOption')!.setValue('');
    this.showData = false;
  }

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

  onSelectPageRows(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.selectedShowperPage = parseInt(target.value, 10);
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
