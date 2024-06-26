import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransferAccountSummaryComponent } from './transfer-account-summary.component';
import { BankingdataService } from '../../../bankingdata.service';

describe('TransferAccountSummaryComponent', () => {
  let component: TransferAccountSummaryComponent;
  let fixture: ComponentFixture<TransferAccountSummaryComponent>;
  let myService : BankingdataService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [BankingdataService]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TransferAccountSummaryComponent);
    component = fixture.componentInstance;
    myService = TestBed.inject(BankingdataService)
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('checking the data is same as the object data which is rendered',()=>{
    myService.accountData = [
      {
          AccountHolder: myService.trimmedString,
          AccountType:"Savings Account",
          AccountNumber:"1234567890111213",
          AccountifscCode:"ABCD0001234",
          AccountBranch:"KPHB",
          AvailableBalanceinRupees: myService.balance
      }
    ]

    let accountHolderEle = fixture.debugElement.nativeElement.querySelector("#accountHolder")
    let accountTypeEle = fixture.debugElement.nativeElement.querySelector("#accountType")
    let accountNumberEle = fixture.debugElement.nativeElement.querySelector("#accountNumber")
    let branchEle = fixture.debugElement.nativeElement.querySelector("#branch")
    let accountifscCodeEle = fixture.debugElement.nativeElement.querySelector("#ifscCode")

    let balanceEle = fixture.debugElement.nativeElement.querySelector("#balance")
    let balanceText = balanceEle.textContent.trim();
    let numericBalance = parseFloat(balanceText.replace(/[^\d.-]/g, ''));
    let balanceValue = myService.balance;

    expect(accountHolderEle.textContent).toEqual(myService.accountData[0].AccountHolder)
    expect(accountTypeEle.textContent).toEqual(myService.accountData[0].AccountType)
    expect(accountNumberEle.textContent).toEqual(myService.accountData[0].AccountNumber)
    expect(numericBalance).toEqual(balanceValue)
    expect(accountifscCodeEle.textContent).toEqual(myService.accountData[0].AccountifscCode)
    expect(branchEle.textContent).toEqual(myService.accountData[0].AccountBranch)

  })
  
});
