import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { RecentTransactionComponent } from './recent-transaction.component';
import { BankingdataService } from '../../../../../bankingdata.service';
import { HttpClientModule } from '@angular/common/http';
import { CurrencyPipe, NgFor } from '@angular/common';
import { SharedFile } from '../../../../../sharedfile';
import { recent } from '../../../../../modal';

describe('RecentTransactionComponent', () => {
  let component: RecentTransactionComponent;
  let fixture: ComponentFixture<RecentTransactionComponent>;
  let myservice: BankingdataService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, CurrencyPipe, NgFor],
      providers: [BankingdataService, SharedFile],
    }).compileComponents();

    fixture = TestBed.createComponent(RecentTransactionComponent);
    component = fixture.componentInstance;
    myservice = TestBed.inject(BankingdataService);

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize sharedData with BankingdataService', () => {
    expect(component.sharedData).toBeTruthy();
    expect(component.sharedData instanceof SharedFile).toBe(true);
  });

  it('should initialize RecentTrans array', () => {
    expect(component.RecentTrans).toBeDefined();
    expect(component.RecentTrans.length).toBe(0);
  });

  it('should set recentTrans with userRecentTrans from SharedFile on ngOnInit', () => {
    let mockUserRecentTrans: recent[] = [
      {
        symbol: 'assets/Images/down-arrow.svg',
        name: 'Natasha Davel',
        transDate: '15/03/2024',
        transtype: 'Credited',
        transDesc: 'IMPS 1234/UPI123456/DIleep Thotakura/PhonePe',
        amountcredit: '1,256.00',
        totAmount: '₹1,11,256.00',
      },
    ];
    component.ngOnInit();
    expect(component.recentTrans).toEqual(mockUserRecentTrans);
  });
});
