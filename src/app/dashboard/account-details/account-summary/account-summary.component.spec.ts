import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountSummaryComponent } from './account-summary.component';
import { BankingdataService } from '../../../bankingdata.service';
import { HttpClientModule } from '@angular/common/http';

describe('AccountSummaryComponent', () => {
  let component: AccountSummaryComponent;
  let fixture: ComponentFixture<AccountSummaryComponent>;
  let myservice:BankingdataService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers:[BankingdataService],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccountSummaryComponent);
    component = fixture.componentInstance;
    myservice = TestBed.inject(BankingdataService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Setting the Summary Data',()=>{
    myservice.balance = 50000; // Mocked balance
    myservice.accountData = [{
        AccountHolder: myservice.trimmedString,
        AccountType:"Savings Account",
        AccountNumber:"1234567890111213",
        AccountifscCode:"ABCD0001234",
        AccountBranch:"KPHB",
        AvailableBalanceinRupees: myservice.balance
    }];
    myservice.trimmedString = 'Leela';
    spyOn(console, 'log');
    fixture.detectChanges();
    // Trigger ngOnInit
    component.ngOnInit();
  });

});
