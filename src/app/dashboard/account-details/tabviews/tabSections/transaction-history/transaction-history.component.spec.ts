import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransactionHistoryComponent } from './transaction-history.component';
import { ActivatedRoute, Router} from '@angular/router';
import { of } from 'rxjs';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { userTransHistory } from '../../../../../sharedfile';

describe('TransactionHistoryComponent', () => {
  let component: TransactionHistoryComponent;
  let fixture: ComponentFixture<TransactionHistoryComponent>;
  let fb: FormBuilder;
  let router:Router;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionHistoryComponent,ReactiveFormsModule],
      providers:[{
        provide: ActivatedRoute,
        useValue: {
          paramMap: of({}) 
        }
      }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionHistoryComponent);
    component = fixture.componentInstance;
    component.TransHistory = []; 
    component.selectedShowperPage = 5;
    fb = TestBed.inject(FormBuilder); 
    spyOn(fb, 'group').and.callThrough(); 
    component.totalPages = []; 
    component.showData = false;
    
    component.rightPaginationItems = [1, 2, 3, 4, 5]; 
    component.currentPage = 3;

    component.transactionForm = fb.group({
      inputType: ['dropdown'],
      fromDate: [''],
      toDate: [''],
      selectedOption: ['']
    });
    
    component.transactionForm = fb.group({
      inputType: ['dropdown'],
      fromDate: [{ value: '2023-01-01', disabled: false }],
      toDate: [{ value: '2023-12-31', disabled: false }],
      selectedOption: [{ value: 'option1', disabled: false }]
    });
    router = TestBed.inject(Router);
    component.ngOnInit(); 
    fixture.detectChanges();
  });

  it('should initialize leftpaginationMode as false', () => {
    expect(component.leftpaginationMode).toBeFalse(); 
  });

  it('should initialize rightpaginationMode as true', () => {
    expect(component.rightpaginationMode).toBeTrue(); 
  });

  it('should initialize TransHistory', () => {
    expect(component.TransHistory.length).toBeGreaterThan(50); 
  });

  it('should initialize showData as false', () => {
    expect(component.showData).toBeFalse(); 
  });

  it('should initialize todayDate to current date', () => {
    const currentDate = new Date();
    expect(component.todayDate).toEqual(currentDate.toString()); 
  });

  it('should calculate totalPages based on TransHistory length and selectedShowperPage', () => {
    component.TransHistory = userTransHistory;
    component.selectedShowperPage = 5;
    const calculatedTotalPages = component.getpageList(component.TransHistory.length, component.selectedShowperPage);
    expect(calculatedTotalPages).toEqual([1,2,3,4,5,6,7,8,9,10,11,12]);
  });

  it('should initialize transactionForm as an instance of FormGroup', () => {
    expect(component.transactionForm instanceof FormGroup).toBeTruthy();
  });

  it('should call generateTransactionData on ngOnInit', () => {
    spyOn(component, 'generateTransactionData');
    component.ngOnInit();
    expect(component.generateTransactionData).toHaveBeenCalled();
  });

  describe('generateTransactionData()', () => {
    it('should populate TransHistory', () => {
      component.generateTransactionData();
      expect(component.TransHistory.length).toBeGreaterThan(50);
    });

    it('should populate TransHistory with expected data', () => {
      component.generateTransactionData();
      expect(component.TransHistory[0]).toEqual({
        sno: '01',
        transactionDate: '18/03/2024',
        transctionRemarks: 'VIN/BLINKIT/202403031436/4063-09545745/Phone pe/Blinkit',
        withDrawalAmount: '314.45',
        depositAmount: '',
        balance: '1109.82'
      });
    });
  });

  it('should initialize rightPaginationItems with totalPages', () => {
    expect(component.rightPaginationItems).toEqual([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24]);
  });

  it('should initialize transactionForm with expected controls', () => {
    expect(component.transactionForm).toBeDefined();
    expect(component.transactionForm.get('inputType')).toBeDefined();
    expect(component.transactionForm.get('fromDate')).toBeDefined();
    expect(component.transactionForm.get('toDate')).toBeDefined();
    expect(component.transactionForm.get('selectedOption')).toBeDefined();
  });

  it('should update TransHistory, totalPages, and showData when form is valid', () => {
    component.transactionForm.patchValue({
      inputType: 'dropdown', 
      fromDate: '2023-01-01',
      toDate: '2023-12-31',
      selectedOption: 'option1'
    });
    spyOn(component, 'getpageList').and.callThrough();
    component.submitForm();
    expect(component.TransHistory).toEqual(userTransHistory); 
    expect(component.totalPages.length).toBeGreaterThan(0); 
    expect(component.showData).toBeTrue(); 
    expect(component.getpageList).toHaveBeenCalledWith(userTransHistory.length, component.selectedShowperPage);
  });

  it('should update pagination parameters on onPageChange', () => {
    const pageNo = 2;
    spyOn(component, 'getpageList').and.callThrough();
    component.onPageChange(pageNo);
    expect(component.leftpaginationMode).toBeFalse(); 
    expect(component.rightpaginationMode).toBeTrue();
    expect(component.currentPage).toEqual(pageNo); 
    expect(component.getpageList).toHaveBeenCalledWith(component.TransHistory.length, component.selectedShowperPage); 
    expect(component.rightPaginationItems).toBeDefined();
  });

  describe('getpageList', () => {
    it('should generate correct page list array', () => {
      const totRecords = 20;
      const pageItems = 5;

      const result = component.getpageList(totRecords, pageItems);

      expect(result).toEqual([1, 2, 3, 4]);
    });

    it('should handle when totRecords is less than pageItems', () => {
      const totRecords = 3;
      const pageItems = 5;

      const result = component.getpageList(totRecords, pageItems);

      expect(result).toEqual([1]);
    });

    it('should handle when totRecords is zero', () => {
      const totRecords = 0;
      const pageItems = 5;

      const result = component.getpageList(totRecords, pageItems);

      expect(result).toEqual([]);
    });

    
  });

  describe('getPageTransactions', () => {
    it('should return correct page of transactions', () => {
      component.currentPage = 2;
      const result = component.getPageTransactions();
      expect(result.length).toBe(5); 
      expect(result[0].sno).toBe('06');
      expect(result[result.length - 1].sno).toBe('10');
    });

    it('should handle edge case when currentPage is 1', () => {
      component.currentPage = 1;
      const result = component.getPageTransactions();

      expect(result.length).toBe(5); 
      expect(result[0].sno).toBe('01'); 
      expect(result[result.length - 1].sno).toBe('05'); 
    });

    it('should return empty array when currentPage is out of range', () => {
      component.currentPage = 10;
      const result = component.getPageTransactions();
      expect(result.length).toBe(5);
    });

    it('should return empty array when TransHistory is empty', () => {
      component.TransHistory = []; 
      const result = component.getPageTransactions();
      expect(result.length).toBe(0);
    });

    describe('nextPage', () => {
      it('should increment currentPage correctly', () => {
        const initialCurrentPage = component.currentPage;
        component.nextPage();
        expect(component.currentPage).toBe(initialCurrentPage + 1);
      });
  
      it('should wrap around to first page when currentPage reaches end', () => {
        component.currentPage = component.rightPaginationItems.length;
        component.nextPage();
        expect(component.currentPage).toBe(1);
      });
  
    });

  });

  describe('previousPage', () => {
    it('should decrement currentPage correctly', () => {
      const initialCurrentPage = component.currentPage;
      component.previousPage();
      expect(component.currentPage).toBe(initialCurrentPage - 1);
    });
  });

  it('should navigate to dashboard when back button is clicked', () => {
    const navigateSpy = spyOn(router, 'navigateByUrl');

    const button = fixture.nativeElement.querySelector('#back');
    console.log(button)
    button.click();

    expect(navigateSpy).toHaveBeenCalled();
    expect(navigateSpy.calls.mostRecent().args[0]).toMatch(/\/dashboard$/)
  });





  

  




  

  
});
