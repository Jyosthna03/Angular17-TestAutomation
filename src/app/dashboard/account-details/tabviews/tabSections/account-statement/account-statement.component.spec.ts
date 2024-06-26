import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountStatementComponent } from './account-statement.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { of } from 'rxjs';
import { DatePipe, NgClass } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BankingdataService } from '../../../../../bankingdata.service';

describe('AccountStatementComponent', () => {
  let component: AccountStatementComponent;
  let fixture: ComponentFixture<AccountStatementComponent>;

  let router:Router

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountStatementComponent,ReactiveFormsModule ],
      providers:[
        FormBuilder, DatePipe, RouterLink, NgClass, BankingdataService, 
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({}) 
          }
        }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccountStatementComponent);
    component = fixture.componentInstance;

    router = TestBed.inject(Router)
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize statementForm with required controls', () => {
    expect(component.statementForm).toBeDefined();
    expect(component.statementForm instanceof FormGroup).toBe(true);
    expect(component.statementForm.get('inputType')).toBeTruthy();
    expect(component.statementForm.get('fromDate')).toBeTruthy();
    expect(component.statementForm.get('toDate')).toBeTruthy();
    expect(component.statementForm.get('selectedOption')).toBeTruthy();
    expect(component.statementForm.get('downloadFormat')).toBeTruthy();
  });

  it('should disable and enable form controls based on inputType changes', () => {
    component.statementForm.get('inputType')!.setValue('dateRange');
    expect(component.statementForm.get('selectedOption')!.disabled).toBe(true);
    expect(component.statementForm.get('fromDate')!.enabled).toBe(true);
    expect(component.statementForm.get('toDate')!.enabled).toBe(true);

    component.statementForm.get('inputType')!.setValue('dropdown');
    expect(component.statementForm.get('fromDate')!.disabled).toBe(true);
    expect(component.statementForm.get('toDate')!.disabled).toBe(true);
    expect(component.statementForm.get('selectedOption')!.enabled).toBe(true);
  });

  it('should reset form and enable select and date controls in cancelForm method', () => {
    component.statementForm.get('selectedOption')!.disable();
    component.statementForm.get('fromDate')!.disable();
    component.statementForm.get('toDate')!.disable();

    component.cancelForm();

    expect(component.statementForm.get('selectedOption')!.enabled).toBe(true);
    expect(component.statementForm.get('fromDate')!.enabled).toBe(true);
    expect(component.statementForm.get('toDate')!.enabled).toBe(true);
    expect(component.statementForm.get('selectedOption')!.value).toBe('');
    expect(component.statementForm.get('downloadFormat')!.value).toBe('');
  });

  it('should navigate to dashboard when back button is clicked', () => {
    const navigateSpy = spyOn(router, 'navigateByUrl');
    const button = fixture.nativeElement.querySelector('#back');
    button.click();
    expect(navigateSpy).toHaveBeenCalled();
    expect(navigateSpy.calls.mostRecent().args[0]).toMatch(/\/dashboard$/)
  });


});
