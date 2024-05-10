import { CurrencyPipe } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BankingdataService } from '../../../bankingdata.service';
import { Router, RouterLink } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddpayeeComponent } from '../addpayee/addpayee.component';
import { PaymentMode } from '../../../modal';

@Component({
  selector: 'app-money-transfer',
  standalone: true,
  imports: [ReactiveFormsModule,AddpayeeComponent,CurrencyPipe,RouterLink],
  templateUrl: './money-transfer.component.html',
  styleUrl: './money-transfer.component.css'
})
export class MoneyTransferComponent {

  moneyTransferForm!:FormGroup;
  isMediumOrSmallScreen: boolean = false;
  isFormControlDisabled: boolean = false;
  payeeName:boolean = false
  defaultPayee:string = "Select Payee"
  constructor(private service:BankingdataService,private fb:FormBuilder,private route:Router,private modalService: NgbModal ){
    this.moneyTransferForm = fb.group({
       "payee":[this.defaultPayee,Validators.required],
       "accountNumber":['',[Validators.required,Validators.pattern(/^\d*$/),Validators.minLength(8),Validators.maxLength(18)]],
       "reEnterAccountNo":['',[Validators.required,Validators.pattern(/^\d*$/),Validators.minLength(8),Validators.maxLength(18)]],
       "amount":['',[Validators.required,Validators.pattern(/^\d*$/),Validators.maxLength(5)]],
       "remarks":['',[Validators.required,Validators.maxLength(10)]],
       "paymentModeInput":['',Validators.required],
       "payeeMedium": ['IMPS', Validators.required], // Define another form control for medium screen
       "payeeSmall": ['IMPS', Validators.required]
    },
    {
      validators: this.accountNoMatchValidator
    });
   }

   @HostListener('window:resize', ['$event'])
   onResize(event:any) {
    // Check if screen size is medium or small
    this.isMediumOrSmallScreen =  window.innerWidth < 992;;
     this.isFormControlDisabled = this.isMediumOrSmallScreen;
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

  paymentModeData:PaymentMode[] = [
    {
      "paymentMode":"IMPS",
     "paymentModeLimit":"Max Rs. 50,000 per day. Instant transfer 24*7 transferable"
   },
   {
    "paymentMode":"NEFT",
    "paymentModeLimit":"Max Rs. 1,00,000 Lakh per day. Receiver gets money in 2 to 24 Hrs"
   },
   {
    "paymentMode":"RTGS",
    "paymentModeLimit":"Min Rs. 75,000, Max Rs. 10 Lakh per day. Real time transaction"
   }]


}
