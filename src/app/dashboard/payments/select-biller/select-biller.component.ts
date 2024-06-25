import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink} from '@angular/router';
import { BankingdataService } from '../../../bankingdata.service';
import { CommonModule, DatePipe } from '@angular/common';
import { SharedFile } from '../../../sharedfile';
import { insufficientFunds } from '../../../customAmountValidator';


@Component({
  selector: 'app-select-biller',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink,DatePipe,CommonModule],
  templateUrl: './select-biller.component.html',
  styleUrl: './select-biller.component.css'
})
export class SelectBillerComponent {
  billerForm!: FormGroup;
  rechargeForm: FormGroup;
  showRechargeForm: boolean = false;
  dueDate!: Date;
  availBalance: number = this.service.balance
  isDueDateDisabled: boolean = true;
  sharedData = new SharedFile(this.service);
  cardOptions!: string[];
  billerOptions!: string[]
  netWorkOptions!: string[]

  constructor(private service: BankingdataService, private fb: FormBuilder, private route: Router) {
    this.billerForm = this.fb.group({
      billerType: ['Credit Card', Validators.required],
      billerdetails: ['Credit Card', Validators.required],
      billDetailsAmount: ['', [Validators.required,insufficientFunds(this.availBalance)]],
      PayingFrom: ['Savings Account',Validators.required]
    });

    this.rechargeForm = fb.group({
      networkProvider: ['Airtel Post-paid', Validators.required],
      mobileNumber: ['', [Validators.required, Validators.pattern(/^\d*$/), Validators.minLength(10)]],
      amount: ['', [Validators.required, Validators.pattern(/^\d*$/)]],
      PayingFrom: ['Savings Account']
    });
    this.billerForm.get('billerType')?.valueChanges.subscribe(val => {
      this.showRechargeForm = val === 'Mobile Recharge';
    });
    this.rechargeForm.get('networkProvider')?.valueChanges.subscribe(val => {
      this.isDueDateDisabled = val === "Airtel Post-paid"
    })
  }
 
    ngOnInit() {
      this.dueDate = new Date();
      this.dueDate.setDate(this.dueDate.getDate() + 3);
      this.cardOptions = this.sharedData.selectOptions;
      this.billerOptions = this.sharedData.biller;
      this.netWorkOptions = this.sharedData.networkProviders
    }
    onSubmit() {
      const billValue = this.billerForm.value.billDetailsAmount;
      const rechargeBillValue = this.rechargeForm.value.amount;

      if (this.billerForm.valid && billValue <= this.availBalance) {
          this.updateSuccessState(this.billerForm.value, billValue, false);
      } 
      else if (this.rechargeForm.valid && rechargeBillValue <= this.availBalance) {
          this.updateSuccessState(this.rechargeForm.value, rechargeBillValue, true);
      }
  }
    updateSuccessState(formValue: FormGroup, amount: number, isRecharge: boolean) {
        this.service.selectBillerSuccess.pop();
        this.service.selectBillerSuccess.push(formValue);
        this.service.rechargePaymentSuccess = isRecharge;
        this.service.balance -= amount;
        this.route.navigate(['/paymentSuccess']);
    }
      onCancel() {
        if(this.billerForm.valid){
          this.billerForm.reset();
          this.billerForm.patchValue({
              billerType: 'Credit Card',
              billerdetails: 'Credit Card',
              PayingFrom: 'Savings Account'
        })}
        if(this.rechargeForm.valid){
          this.rechargeForm.reset();
          this.rechargeForm.patchValue({
              billerType: 'Mobile Recharge',
              networkProvider: 'Airtel Pre-paid',
              PayingFrom: 'Savings Account'
          })
        }
      }
  onKeyPress(event: KeyboardEvent) {
    const inputChar = event.key;
    if (!/^\d+$/.test(inputChar)) {
      event.preventDefault();
    }
  }
}
