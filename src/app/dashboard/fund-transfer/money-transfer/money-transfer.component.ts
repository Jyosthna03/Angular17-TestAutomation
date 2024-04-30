import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BankingdataService } from '../../../bankingdata.service';
import { Router, RouterLink } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddpayeeComponent } from '../addpayee/addpayee.component';

@Component({
  selector: 'app-money-transfer',
  standalone: true,
  imports: [ReactiveFormsModule,AddpayeeComponent,CurrencyPipe,RouterLink],
  templateUrl: './money-transfer.component.html',
  styleUrl: './money-transfer.component.css'
})
export class MoneyTransferComponent {

  moneyTransferForm!:FormGroup;
  payeeName:boolean = false
  defaultPayee:string = "Select Payee"
  constructor(private service:BankingdataService,private fb:FormBuilder,private route:Router,private modalService: NgbModal ){
    this.moneyTransferForm = fb.group({
       "payee":[this.defaultPayee,Validators.required],
       "accountNumber":['',[Validators.required,Validators.pattern(/^\d*$/),Validators.minLength(8),Validators.maxLength(18)]],
       "reEnterAccountNo":['',[Validators.required,Validators.pattern(/^\d*$/),Validators.minLength(8),Validators.maxLength(18)]],
       "amount":['',[Validators.required,Validators.pattern(/^\d*$/),Validators.maxLength(5)]],
       "remarks":['',[Validators.required,Validators.maxLength(10)]],
       "paymentModeInput":['',Validators.required]
    },
    {
      validators: this.accountNoMatchValidator
    });
   }
 
   accountNoMatchValidator(form: FormGroup) {
    const accNumber = form.get('accountNumber')?.value;
    const reEnterAccNumber = form.get('reEnterAccountNo')?.value;

    return accNumber === reEnterAccNumber ? null : { mismatch: true };
  }

  amountlimit:number = 5000;
  payeeNames = this.service.addPayee;
  totalAmount:number = 0;
  availBalance:number = this.service.balance;

  calculateTotalAmount(){
    let mytotal=0;
    for(let i=0;i<this.service.paymentHistory.length;i++){
      mytotal += this.service.paymentHistory[i]
    }
    this.totalAmount = mytotal;
    return this.totalAmount;
  }

  amountVal = this.calculateTotalAmount()
  onSubmit(value: Object) {
    let amount = this.moneyTransferForm.value.amount;
    if (amount > this.service.balance) {
      alert("Insufficient Funds");
      return;
    }
    if (amount > this.amountlimit || this.amountVal > this.amountlimit) {
      alert("Exceeded Limit");
      return;
    }
    if(this.moneyTransferForm.value.payee === 'Select Payee'){
      alert('Choose Payee')
      return;
    }
    this.calculateTotalAmount();
    if (this.totalAmount > this.amountlimit) {
      alert("Exceeded Limit");
      return;
    }
    this.service.balance -= amount;
    this.service.paymentHistory.push(Number(amount));
    this.service.paymentSucess.pop()
    this.service.paymentSucess.push(value);
    this.route.navigate(['/transferSuccess']);
    this.moneyTransferForm.reset();
  }
  
  openAddpayeePopup(content: any) {
    this.modalService.open(content, {
      centered: true,
      scrollable: true,
      size: 'lg',
      backdrop: 'static',
    });
  }

  onCancel(){
     if(this.moneyTransferForm.valid){
       let confirmation = confirm("Are you sure you want to Cancel the Payment?")
       if(confirmation){
        this.moneyTransferForm.reset();
        this.moneyTransferForm.patchValue({
          payee:this.defaultPayee
        })
       }
    }
  }

  onKeyPress(event: KeyboardEvent) {
    const inputChar = String.fromCharCode(event.charCode);
    if (!/^\d+$/.test(inputChar)) {
      event.preventDefault();
    }
  }



}
