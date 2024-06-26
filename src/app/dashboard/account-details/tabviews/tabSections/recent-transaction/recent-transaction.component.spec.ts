import {ComponentFixture,TestBed,} from '@angular/core/testing';
import { RecentTransactionComponent } from './recent-transaction.component';
import { BankingdataService } from '../../../../../bankingdata.service';
import { HttpClientModule } from '@angular/common/http';
import { CurrencyPipe, NgFor } from '@angular/common';
import { userRecentTrans } from '../../../../../sharedfile';

describe('RecentTransactionComponent', () => {
  let component: RecentTransactionComponent;
  let fixture: ComponentFixture<RecentTransactionComponent>;
  

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, CurrencyPipe, NgFor],
      providers: [BankingdataService],
    }).compileComponents();

    fixture = TestBed.createComponent(RecentTransactionComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });


  describe('ngOnInit', () => {
    it('should initialize RecentTrans', () => {
      component.ngOnInit();
      expect(component.RecentTrans).toEqual([]);
    });

    it('should set recentTrans using userRecentTrans', () => {
      component.ngOnInit();
      expect(component.recentTrans()).toEqual(userRecentTrans);
    });
  });
});
