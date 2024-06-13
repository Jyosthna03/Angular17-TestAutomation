import { CommonModule, CurrencyPipe, NgClass } from '@angular/common';
import { Component} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BankingdataService } from '../../../bankingdata.service';
import { Router, RouterLink } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddpayeeComponent } from '../addpayee/addpayee.component';

@Component({
  selector: 'app-money-transfer',
  standalone: true,
  imports: [ReactiveFormsModule,AddpayeeComponent,CurrencyPipe,RouterLink,CommonModule],
  templateUrl: './money-transfer.component.html',
  styleUrl: './money-transfer.component.css'
})
export class MoneyTransferComponent {

  moneyTransferForm!:FormGroup;
  amountlimit:string = '';
  exceededLimit:boolean = false;
  payeeNames = this.service.addPayee;
  totalAmount:number = 0;
  availBalance:number = this.service.balance;
  defaultPayee:string = "Select Payee"


  constructor(private fb:FormBuilder,private service:BankingdataService,private route:Router,private modalService: NgbModal){
    this.moneyTransferForm = this.fb.group({
       "payee":['',Validators.required],
       "accountNumber":['',[Validators.required,Validators.pattern(/^\d*$/),Validators.minLength(8),Validators.maxLength(18)]],
       "bankName":['',[Validators.required, Validators.pattern(/^[a-zA-Z ]*$/),Validators.minLength(3),Validators.maxLength(20)]],
       "amount":['',[Validators.required,Validators.pattern(/^\d*$/),Validators.maxLength(5)]],
       "remarks":['',[Validators.required,Validators.maxLength(10)]],
       "paymentModeInput":['',Validators.required],
    });
   }

  ngOnInit(){
      this.service.currentAccountNumber.subscribe(accountNumber => {
      this.moneyTransferForm.get('accountNumber')?.setValue(accountNumber, { emitEvent: false });
    });
      this.service.currentBankName.subscribe(bankName =>{
      this.moneyTransferForm.get('bankName')?.setValue( bankName, { emitEvent: false });
    })
      this.service.currentAccountNosm.subscribe(accNo =>{
      this.moneyTransferForm.get('accountNumber')?.setValue(accNo, { emitEvent: false });
    })
      this.service.currentBankNamesm.subscribe(bkName =>{
      this.moneyTransferForm.get('bankName')?.setValue(bkName, { emitEvent: false });
    })
   }
 
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
    if (amount > 5000 || this.amountVal > 5000) {
      this.exceededLimit = true;
      this.amountlimit = "Enter amount less than 5000";
      return;
    }
    if(this.moneyTransferForm.value.payee === 'Select Payee'){
      alert('Choose Payee')
      return;
    }
    this.calculateTotalAmount();
    // if (this.totalAmount >= 5000) {
    //   this.exceededLimit = true;
    //   this.amountlimit = "Exceeded Limit";
    //   return;
    // }
    console.log(this.moneyTransferForm.value)
    this.service.balance -= amount;
    this.service.paymentHistory.push(Number(amount));
    this.service.paymentSucess.pop()
    this.service.paymentSucess.push(value);
    this.route.navigateByUrl('/transferSuccess');
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
    this.moneyTransferForm.reset();
    this.moneyTransferForm.get('payee')?.setValue('')
  }

  onKeyPress(event: KeyboardEvent) {
    const inputChar = event.key;
    console.log("InputChar: ",inputChar)
    const inputValue = parseInt((event.target as HTMLInputElement).value);
    console.log("Payee-Amount: ", inputValue);
    if (inputValue >= 5000) {
      this.exceededLimit = true;
      this.amountlimit = "Exceeded Limit";
      return;
    }
    if (!/^\d+$/.test(inputChar)) {
      event.preventDefault();
    }
  }

}
