import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MultipleAccountsComponent } from './multiple-accounts.component';
import { BankingdataService } from '../../../bankingdata.service';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('MultipleAccountsComponent', () => {
  let component: MultipleAccountsComponent;
  let fixture: ComponentFixture<MultipleAccountsComponent>;
  let myservice:BankingdataService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[HttpClientModule],
      providers: [
        BankingdataService,
         {
           provide: ActivatedRoute,
           useValue: {
             paramMap: of({}) 
           }
         }
       ]
      
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MultipleAccountsComponent);
    component = fixture.componentInstance;
    myservice=TestBed.inject(BankingdataService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should call selectedCard with first cardDetails item on ngOnInit', () => {
  //   spyOn(component, 'selectedCard');
  //   component.ngOnInit();
  //   expect(component.selectedCard).toHaveBeenCalledWith(component.cardDetails[0]);
  // });

  // it('should return true if isSelected called with selectedData', () => {
  //   const testData = { id: 1 };
  //   component.selectedData = testData;
  //   expect(component.isSelected(testData)).toBeTrue();
  // });

  // it('should return false if isSelected called with non-selectedData', () => {
  //   const testData1 = { id: 1 };
  //   const testData2 = { id: 2 };
  //   component.selectedData = testData1;
  //   expect(component.isSelected(testData2)).toBeFalse();
  // });

  // it('should set selectedData and update accountData when selectedCard is called', () => {
  //   const testData = { id: 1 };
  //   component.selectedCard(testData);
  //   expect(component.selectedData).toEqual(testData);
  //   expect(myservice.accountData.pop()).toEqual(testData);
  // });

});
