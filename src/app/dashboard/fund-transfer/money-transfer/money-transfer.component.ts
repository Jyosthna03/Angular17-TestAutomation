import { CommonModule, CurrencyPipe, NgClass } from '@angular/common';
import { Component, TemplateRef} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BankingdataService } from '../../../bankingdata.service';
import { Router, RouterLink } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddpayeeComponent } from '../addpayee/addpayee.component';
import { amountLimitValidator } from '../../../customAmountValidator';
 
@Component({
  selector: 'app-money-transfer',
  standalone: true,
  imports: [ReactiveFormsModule,AddpayeeComponent,CurrencyPipe,RouterLink,CommonModule],
  templateUrl: './money-transfer.component.html',
  styleUrl: './money-transfer.component.css'
})
export class MoneyTransferComponent {
 
  moneyTransferForm!:FormGroup;
  payeeNames = this.service.addPayee;
  availableBalance:number = this.service.balance;
 
  constructor(private fb:FormBuilder,private service:BankingdataService,private route:Router,private modalService: NgbModal){
    this.moneyTransferForm = this.fb.group({
       "payee":['',Validators.required],
       "accountNumber":['',[Validators.required,Validators.pattern(/^\d*$/),Validators.minLength(8),Validators.maxLength(18)]],
       "bankName":['',[Validators.required, Validators.pattern(/^[a-zA-Z ]*$/),Validators.minLength(3),Validators.maxLength(20)]],
       "amount":['',[Validators.required,Validators.pattern(/^\d*$/),Validators.maxLength(5),amountLimitValidator(this.availableBalance)]],
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
    });

    
   }
 
  onSubmit(value: FormGroup) {
    if(this.moneyTransferForm.valid){
      let amount = this.moneyTransferForm.value.amount;
      this.service.balance -= amount;
      this.service.paymentSucess.pop()
      this.service.paymentSucess.push(value);
      this.service.changeAccountNumber('')
      this.service.userBankName('')
      this.service.addPayee.pop();
      this.route.navigateByUrl('/transferSuccess');
      this.moneyTransferForm.reset();
    }
  }
 
  openAddpayeePopup(content: TemplateRef<FormGroup>) {
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
    if (!/^\d+$/.test(inputChar)) {
      event.preventDefault();
    }
  }
 
}