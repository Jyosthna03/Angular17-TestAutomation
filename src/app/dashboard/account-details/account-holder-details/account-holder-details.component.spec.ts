import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountHolderDetailsComponent } from './account-holder-details.component';
import { BankingdataService } from '../../../bankingdata.service';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('AccountHolderDetailsComponent', () => {
  let component: AccountHolderDetailsComponent;
  let fixture: ComponentFixture<AccountHolderDetailsComponent>;
  let myservice: BankingdataService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [BankingdataService,{ provide: ActivatedRoute, useValue: {paramMap:of({})} }],
      imports: [AccountHolderDetailsComponent,HttpClientModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccountHolderDetailsComponent);
    component = fixture.componentInstance;
    myservice = TestBed.inject(BankingdataService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Username is Defined in the component', () => {
    expect(component.userName).toBeDefined();
  });

  it('checking the value of username when it is Not Empty', () => {
    component.userName = 'Leela';
    fixture.detectChanges();
    expect(component.userName).not.toEqual('');
  });

  it('checking the value of username when it is Empty', () => {
    component.userName = '';
    fixture.detectChanges();
    expect(component.userName).toEqual('');
  });

  it('Check the String is correctly Trimmed or not', () => {
    const email = 'leela@gmail.com';
    myservice.trimmedString = 'Leela';
    const trimName = myservice.trimNameFromEmail(email);
    const trimmedString = myservice.trimmedString;
    expect(trimmedString).toBeDefined();
    expect(trimName).toEqual(myservice.trimmedString);
  });

  it('Checking today Date', () => {
    const currentDate = new Date();
    const componentDate = component.currentDate;
    expect(componentDate.getFullYear()).toEqual(currentDate.getFullYear());
    expect(componentDate.getMonth()).toEqual(currentDate.getMonth());
    expect(componentDate.getDate()).toEqual(currentDate.getDate());
  });

  it('Checking if the Account Type is correct or Not',()=>{
    myservice.accountData = [
      {
        AccountHolder: myservice.trimmedString,
        AccountType: 'Savings Account',
        AccountNumber: '1234567890111213',
        AccountIFSCCode: 'ABCD0001234',
        AccountBranch: 'KPHB',
        AvailableBalanceinRupees: 50000,
      },
    ];
    expect(component.accountDetails).toEqual(myservice.accountData);
  });

  
  it('Checking the ngOnInit', () => {
    myservice.accountData = [
      {
        AccountHolder: myservice.trimmedString,
        AccountType: 'Savings Account',
        AccountNumber: '1234567890111213',
        AccountIFSCCode: 'ABCD0001234',
        AccountBranch: 'KPHB',
        AvailableBalanceinRupees: 50000,
      },
    ];
    myservice.trimmedString = 'Leela';
    myservice.breadCrumb = [];

    component.ngOnInit();
    
    expect(component.accountDetails).toEqual(myservice.accountData);
    expect(component.userName).toEqual(myservice.trimmedString);
    expect(component.breadCrumbPath).toEqual(myservice.breadCrumb);
  });
});
