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
  amountlimit:number = 5000;
  payeeNames = this.service.addPayee;
  totalAmount:number = 0;
  availBalance:number = this.service.balance;
  defaultPayee:string = "Select Payee"
  newPayeeData = this.service.addpayeeData

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
    console.log(this.newPayeeData)
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

  paymentModeData =[
    {
       label:"IMPS",
       description:'Max Rs. 50,000 per day. Instant transfer 24*7 transferable'
    },
    {
        label:"NEFT",
        description:'Max Rs. 1,00,000 Lakh per day. Receiver gets money in 2 to 24 Hrs'
    },
    {
        label:"RTGS",
        description:'Min Rs. 75,000, Max Rs. 10 Lakh per day. Real time transaction'
    },

  ]

  paymentChoosed:string = ''
  check(mode:any){
     console.log(mode)
     this.paymentChoosed = mode.description
  }
  
}
