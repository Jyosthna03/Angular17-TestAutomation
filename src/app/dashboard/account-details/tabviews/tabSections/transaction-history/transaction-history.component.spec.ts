import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransactionHistoryComponent } from './transaction-history.component';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { userTransHistory } from '../../../../../sharedfile';

describe('TransactionHistoryComponent', () => {
  let component: TransactionHistoryComponent;
  let fixture: ComponentFixture<TransactionHistoryComponent>;
  let fb: FormBuilder;
  

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

    // Spy on getpageList method to check interactions
    spyOn(component, 'getpageList').and.callThrough();

    // Call onPageChange method with pageNo
    component.onPageChange(pageNo);

    // Assert expected behavior
    expect(component.leftpaginationMode).toBeFalse(); // Ensure leftpaginationMode is false
    expect(component.rightpaginationMode).toBeTrue(); // Ensure rightpaginationMode is true
    expect(component.currentPage).toEqual(pageNo); // Ensure currentPage is updated correctly
    expect(component.getpageList).toHaveBeenCalledWith(component.TransHistory.length, component.selectedShowperPage); // Check if getpageList method was called with correct arguments
    expect(component.rightPaginationItems).toBeDefined(); // Ensure rightPaginationItems is updated (assuming getpageList correctly sets this)
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


  

  




  

  
});
