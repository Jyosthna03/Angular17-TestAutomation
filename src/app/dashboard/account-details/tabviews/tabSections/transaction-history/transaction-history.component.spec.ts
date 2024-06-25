import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransactionHistoryComponent } from './transaction-history.component';
import { BankingdataService } from '../../../../../bankingdata.service';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { of } from 'rxjs';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DatePipe, NgClass, NgStyle } from '@angular/common';
import { SharedFile } from '../../../../../sharedfile';

describe('TransactionHistoryComponent', () => {
  let component: TransactionHistoryComponent;
  let fixture: ComponentFixture<TransactionHistoryComponent>;
  let myservice:BankingdataService;

  let router:Router

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionHistoryComponent,ReactiveFormsModule],
      providers:[BankingdataService,FormBuilder, DatePipe, NgClass, NgStyle, RouterLink, SharedFile,{
        provide: ActivatedRoute,
        useValue: {
          paramMap: of({}) 
        }
      }]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TransactionHistoryComponent);
    component = fixture.componentInstance;
    myservice = TestBed.inject(BankingdataService); // Inject the RegisterService
    router = TestBed.inject(Router)
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize transactionForm with required controls', () => {
    expect(component.transactionForm).toBeDefined();
    expect(component.transactionForm instanceof FormGroup).toBe(true);
    expect(component.transactionForm.get('inputType')).toBeTruthy();
    expect(component.transactionForm.get('fromDate')).toBeTruthy();
    expect(component.transactionForm.get('toDate')).toBeTruthy();
    expect(component.transactionForm.get('selectedOption')).toBeTruthy();
  });

  it('should disable and enable form controls based on inputType changes', () => {
    component.transactionForm.get('inputType')!.setValue('dateRange');
    expect(component.transactionForm.get('selectedOption')!.disabled).toBe(true);
    expect(component.transactionForm.get('fromDate')!.enabled).toBe(true);
    expect(component.transactionForm.get('toDate')!.enabled).toBe(true);

    component.transactionForm.get('inputType')!.setValue('dropdown');
    expect(component.transactionForm.get('fromDate')!.disabled).toBe(true);
    expect(component.transactionForm.get('toDate')!.disabled).toBe(true);
    expect(component.transactionForm.get('selectedOption')!.enabled).toBe(true);
  });

  it('should generate transaction data on ngOnInit', () => {
    component.ngOnInit();
    expect(component.TransHistory.length).toBe(60);
  });

  it('should set TransHistory and totalPages on valid form submission', () => {
    component.submitForm();
    expect(component.totalPages.length).toBeGreaterThan(0);
    expect(component.showData).toBe(true);
  });

  it('should reset form and hide data on cancelForm', () => {
    component.cancelForm();
    expect(component.transactionForm.get('selectedOption')!.enabled).toBe(true);
    expect(component.transactionForm.get('fromDate')!.enabled).toBe(true);
    expect(component.transactionForm.get('toDate')!.enabled).toBe(true);
    expect(component.transactionForm.get('selectedOption')!.value).toBe('');
    expect(component.showData).toBe(false);
  });

  it('should update pagination on onPageChange', () => {
    const mockPageNo = 2;
    component.TransHistory = [{
      sno: '01',
      transactionDate: '18/03/2024',
      transctionRemarks:
        'VIN/BLINKIT/202403031436/4063-09545745/Phone pe/Blinkit',
      withDrawalAmount: '314.45',
      depositAmount: '---',
      balance: '1109.82',
    }];
    spyOn(component, 'getpageList').and.returnValue([1, 2]);

    component.onPageChange(mockPageNo);

    expect(component.leftpaginationMode).toBe(false);
    expect(component.rightpaginationMode).toBe(true);
    expect(component.currentPage).toBe(mockPageNo);
    expect(component.rightPaginationItems.length).toBeGreaterThan(0); // Ensure rightPaginationItems is populated
  });

  it('should return page transactions based on selectedShowperPage and currentPage', () => {
    const mockTransactions = [{
      sno: '01',
      transactionDate: '18/03/2024',
      transctionRemarks:
        'VIN/BLINKIT/202403031436/4063-09545745/Phone pe/Blinkit',
      withDrawalAmount: '314.45',
      depositAmount: '---',
      balance: '1109.82',
    }];
    component.TransHistory = mockTransactions;
    spyOn(component, 'getpageList').and.returnValue([1]);

    const pageTransactions = component.getPageTransactions();

    expect(pageTransactions).toEqual(mockTransactions.slice(0, component.selectedShowperPage));
  });

  it('should update selectedShowperPage and pagination on onSelectPageRows', () => {
    expect(component.selectedShowperPage).toBe(10);
    expect(component.leftpaginationMode).toBe(true);
    expect(component.rightpaginationMode).toBe(false);
    expect(component.rightPaginationItems.length).toBeGreaterThan(0); // Ensure rightPaginationItems is populated
  });

  it('should increment currentPage on nextPage', () => {
    const initialPage = component.currentPage;
    component.nextPage();
    expect(component.currentPage).toBe(initialPage + 1);
  });

  it('should decrement currentPage on previousPage', () => {
    const initialPage = component.currentPage;
    component.previousPage();
    expect(component.currentPage).toBe(initialPage - 1);
  });

  it('should navigate to dashboard when back button is clicked', () => {
    const navigateSpy = spyOn(router, 'navigateByUrl');
    const button = fixture.nativeElement.querySelector('#backBtn');
    console.log(button)
    button.click();
    expect(navigateSpy).toHaveBeenCalled();
    expect(navigateSpy.calls.mostRecent().args[0]).toMatch(/\/dashboard$/)
  });

});
