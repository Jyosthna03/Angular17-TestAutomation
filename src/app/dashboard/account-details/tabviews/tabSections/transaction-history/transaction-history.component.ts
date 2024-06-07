import { Component } from '@angular/core';
import { BankingdataService } from '../../../../../bankingdata.service';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DatePipe, NgClass, NgStyle } from '@angular/common';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-transaction-history',
  standalone: true,
  imports: [
    FormsModule,
    DatePipe,
    NgStyle,
    RouterLink,
    ReactiveFormsModule,
    NgClass,
  ],
  templateUrl: './transaction-history.component.html',
  styleUrl: './transaction-history.component.css',
})
export class TransactionHistoryComponent {
  leftpaginationMode = false;
  rightpaginationMode = true;
  TransHistory: any = [];
  showData = false;
  todayDate = Date();
  periodicDays = ['Last 7 Days', 'Last 14 Days'];
  selectedShowperPage = 5;
  startIndex = 0;
  endIndex = 5;
  currentPage = 1;
  totalPages = this.getpageList(
    this.TransHistory.length,
    this.selectedShowperPage
  );
  rightPaginationItems: number[] = [];
  transactionForm!: FormGroup;

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

  constructor(private serv: BankingdataService, private fb: FormBuilder) {
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

  ngOnInit() {
    this.generateTransactionData();
    this.rightPaginationItems = this.getpageList(
      this.TransHistory.length,
      this.selectedShowperPage
    );
  }

  submitForm() {
    if (this.transactionForm.valid) {
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
