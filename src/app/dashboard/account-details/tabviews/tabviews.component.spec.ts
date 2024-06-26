import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TabviewsComponent } from './tabviews.component';
import { BankingdataService } from '../../../bankingdata.service';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

describe('TabviewsComponent', () => {
  let component: TabviewsComponent;
  let fixture: ComponentFixture<TabviewsComponent>;
  let myservice:BankingdataService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers:[BankingdataService,{
        provide: ActivatedRoute,
        useValue: {
          paramMap: of({}) 
        }
      }]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TabviewsComponent);
    component = fixture.componentInstance;
    myservice = TestBed.inject(BankingdataService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize activeTab to 1 in constructor', () => {
    expect(component.activeTab).toBe(1);
  });

  it('should set activeTab to 2 if isTransactionHistory is true in ngOnInit', () => {
    myservice.isTransactionHistory = true;
    component.ngOnInit();
    expect(component.activeTab).toBe(2);
    expect(myservice.isTransactionHistory).toBe(false); 
  });

  it('should set activeTab to 3 if isAccountStatement is true in ngOnInit', () => {
    myservice.isAccountStatement = true;
    component.ngOnInit();
    expect(component.activeTab).toBe(3);
    expect(myservice.isAccountStatement).toBe(false); 
  });

  it('should set activeTab to the provided tab number in activateTab method', () => {
    const tabNo = 2;
    component.activateTab(tabNo);
    expect(component.activeTab).toBe(tabNo);
  });
});
