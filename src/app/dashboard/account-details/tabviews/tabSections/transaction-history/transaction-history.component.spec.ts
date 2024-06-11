import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransactionHistoryComponent } from './transaction-history.component';
import { BankingdataService } from '../../../../../bankingdata.service';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';

describe('TransactionHistoryComponent', () => {
  let component: TransactionHistoryComponent;
  let fixture: ComponentFixture<TransactionHistoryComponent>;
  let myservice:BankingdataService;

  let router:Router

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionHistoryComponent,HttpClientModule,ReactiveFormsModule],
      providers:[BankingdataService,{
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
    spyOn(myservice, 'getData').and.returnValue(of({ TransHistory: [{}] }));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize default values on ngOnInit', () => {
    expect(component.leftpaginationMode).toBeFalse();
    expect(component.rightpaginationMode).toBeTrue();
    expect(component.TransHistory.length).toEqual(60);
    
  });

  it('should generate transaction data', () => {
    expect(component.TransHistory.length).toEqual(60);
  });

  it('should initialize selectedShowperPage to 5', () => {
    expect(component.selectedShowperPage).toEqual(5);
  });

  it('should initialize startIndex to 0', () => {
    expect(component.startIndex).toEqual(0);
  });

  it('should initialize endIndex to 5', () => {
    expect(component.endIndex).toEqual(5);
  });

  it('should initialize currentPage to 1', () => {
    expect(component.currentPage).toEqual(1);
  });

  it('should update leftpaginationMode, rightpaginationMode, currentPage, and rightPaginationItems when onPageChange is called', () => {
    spyOn(component, 'getpageList').and.returnValue([1, 2, 3]);
    const pageNo = 2;
    component.TransHistory = []; 
    component.selectedShowperPage = 5;
    component.onPageChange(pageNo);
    expect(component.leftpaginationMode).toBeFalse();
    expect(component.rightpaginationMode).toBeTrue();
    expect(component.currentPage).toEqual(pageNo);
    expect(component.rightPaginationItems).toEqual([1, 2, 3]);
    expect(component.getpageList).toHaveBeenCalledWith(component.TransHistory.length, component.selectedShowperPage);
  });

  it('should return an array of page numbers based on totRecords and pageItems', () => {
    const totRecords = 10;
    const pageItems = 3;
    const expectedResult = [1, 2, 3, 4];
    expect(component.getpageList(totRecords, pageItems)).toEqual(expectedResult);
  });

  it('should return an empty array if totRecords is 0', () => {
    const totRecords = 0;
    const pageItems = 5;
    expect(component.getpageList(totRecords, pageItems)).toEqual([]);
  });

  it('should update selectedShowperPage and set pagination modes correctly', () => {
    const event = { target: { value: 10 } };
    spyOn(component, 'getpageList').and.returnValue([1, 2]); 
    component.TransHistory = []; 

    component.onSelectPageRows(event);

    expect(component.selectedShowperPage).toEqual(10);
    expect(component.leftpaginationMode).toBeTrue();
    expect(component.rightpaginationMode).toBeFalse();
    expect(component.endIndex).toEqual(10);
    expect(component.getpageList).toHaveBeenCalledWith(component.TransHistory.length, 10);
  });

  it('should increment currentPage by 1 if not exceeding the total number of pages', () => {
    component.currentPage = 2;
    component.rightPaginationItems = [1, 2, 3];
    component.nextPage();
    expect(component.currentPage).toEqual(3);
  });

  it('should set currentPage to 1 if it exceeds the total number of pages', () => {
    component.currentPage = 3;
    component.rightPaginationItems = [1, 2, 3];
    component.nextPage();
    expect(component.currentPage).toEqual(1);
  });

  it('should decrement currentPage by 1 if not less than 1', () => {
    component.currentPage = 2;
    component.previousPage();
    expect(component.currentPage).toEqual(1);
  });

  it('should set currentPage to 1 if it becomes less than 1', () => {
    component.currentPage = 1;
    component.previousPage();
    expect(component.currentPage).toEqual(1);
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
