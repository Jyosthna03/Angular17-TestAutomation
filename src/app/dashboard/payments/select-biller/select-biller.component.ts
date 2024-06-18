import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink} from '@angular/router';
import { BankingdataService } from '../../../bankingdata.service';
import { CommonModule, DatePipe } from '@angular/common';
import { BillerFormValues, RechargeFormValues } from '../../../modal';


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
  showAdditionalFields = false;
  dueDate!: Date;
  availBalance: number = this.service.balance
  isDueDateDisabled: boolean = true;
  selectOptions = ['Credit Card', 'Debit Card', 'Utilities', 'Mobile Recharge'];
  biller = ['Credit Card', 'Debit Card']
  networkProviders = ['Airtel Post-paid', 'Airtel Pre-paid']
  optionsVisible: boolean = false;
 

  constructor(private service: BankingdataService, private fb: FormBuilder, private route: Router) {
    this.billerForm = fb.group({
      billerType: ['Credit Card', Validators.required],
      billerdetails: ['Credit Card', Validators.required],
      billDetailsAmount: ['', Validators.required],
      PayingFrom: ['Savings Account']
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
  }
  onSubmit() {
    console.log(this.billerForm.value);
    const billValue = this.billerForm.value.billDetailsAmount;
    const rechargeBillValue = this.rechargeForm.value.amount;

    if (this.billerForm.valid && billValue <= this.availBalance) {
        this.updateSuccessState(this.billerForm.value, billValue, false);
    } else if (this.rechargeForm.valid && rechargeBillValue <= this.availBalance) {
        this.updateSuccessState(this.rechargeForm.value, rechargeBillValue, true);
    } else if (billValue > this.availBalance || rechargeBillValue > this.availBalance) {
        alert("Insufficient Funds");
        this.route.navigate(['/paymentDashboard']);
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
    const handleCancel = (form: FormGroup, values: BillerFormValues | RechargeFormValues) => {
      if (form.valid) {
        const confirmation = confirm("Are you sure you want to Cancel the Payment?");
        if (confirmation) {
          form.reset();
          form.patchValue(values);
        }
      }
    };
    handleCancel(this.billerForm, {
      billerType: 'Credit Card',
      billerdetails: 'Credit Card',
      PayingFrom: 'Savings Account'
    });
  
    handleCancel(this.rechargeForm, {
      billerType: 'Mobile Recharge',
      networkProvider: "Airtel Post-paid",
      PayingFrom: 'Savings Account'
    });
  }
  onKeyPress(event: KeyboardEvent) {
    const inputChar = String.fromCharCode(event.charCode);
    if (!/^\d+$/.test(inputChar)) {
      event.preventDefault();
    }
  }
}
