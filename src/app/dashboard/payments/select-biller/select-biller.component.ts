import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { BankingdataService } from '../../../bankingdata.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-select-biller',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterOutlet,RouterLink],
  providers:[BankingdataService],
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
    let billValue = this.billerForm.value.billDetailsAmount;
    let rechargeBillValue = this.rechargeForm.value.amount;
    
    if (this.billerForm.valid && billValue <= this.availBalance) {
      console.log("Biller Form")
      this.service.selectBillerSuccess.pop()
      this.service.selectBillerSuccess.push(this.billerForm.value);
      console.log(this.service.selectBillerSuccess)
      this.service.rechargePaymentSuccess = false;
      this.service.balance -= billValue
      this.route.navigate(['/payment'])
    }
    if (this.rechargeForm.valid && rechargeBillValue <= this.availBalance) {
      console.log("Recharge Form")
      this.service.selectBillerSuccess.pop()
      this.service.selectBillerSuccess.push(this.rechargeForm.value);
      console.log(this.service.selectBillerSuccess)
      this.service.rechargePaymentSuccess = true;
      this.service.balance -= rechargeBillValue
      this.route.navigate(['/payment'])
    }
    if(this.billerForm.value.billDetailsAmount > this.availBalance || this.rechargeForm.value.amount > this.availBalance){
      alert("InSufficient Funds")
      this.route.navigate(['/paymentDashboard'])
    }
  }

  onCancel() {
    if (this.billerForm.valid) {
      let confirmation = confirm("Are you sure you want to Cancel the Payment?")
      if (confirmation) {
        this.billerForm.reset();
        this.billerForm.patchValue({
          billerType: 'Credit Card',
          billerdetails: 'Credit Card',
          PayingFrom: 'Savings Account'
        })
      }
     }
     else if (this.rechargeForm.valid) {
      let confirmation = confirm("Are you sure you want to Cancel the Payment?")
      if (confirmation) {
        this.rechargeForm.reset();
        this.rechargeForm.patchValue({
          billerType: 'Mobile Recharge',
          networkProvider: "Airtel Post-paid",
          PayingFrom: 'Savings Account'
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
