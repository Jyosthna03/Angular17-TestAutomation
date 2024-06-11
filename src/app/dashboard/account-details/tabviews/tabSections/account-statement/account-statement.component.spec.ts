import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountStatementComponent } from './account-statement.component';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';

describe('AccountStatementComponent', () => {
  let component: AccountStatementComponent;
  let fixture: ComponentFixture<AccountStatementComponent>;

  let router:Router

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountStatementComponent],
      providers:[
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

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should disable selectedOption and enable fromDate and toDate when inputType is dateRange', () => {
    component.statementForm.get('inputType')!.setValue('dateRange');

    expect(component.statementForm.get('selectedOption')!.disabled).toBe(true);
    expect(component.statementForm.get('fromDate')!.enabled).toBe(true);
    expect(component.statementForm.get('toDate')!.enabled).toBe(true);
  });

  it('should disable fromDate and toDate and enable selectedOption when inputType is dropdown', () => {
    component.statementForm.get('inputType')!.setValue('dropdown');

    expect(component.statementForm.get('selectedOption')!.enabled).toBe(true);
    expect(component.statementForm.get('fromDate')!.disabled).toBe(true);
    expect(component.statementForm.get('toDate')!.disabled).toBe(true);
  });

  it('should reset form values and enable selectedOption, fromDate, and toDate on cancelForm()', () => {
    component.cancelForm();

    expect(component.statementForm.get('selectedOption')!.enabled).toBe(true);
    expect(component.statementForm.get('fromDate')!.enabled).toBe(true);
    expect(component.statementForm.get('toDate')!.enabled).toBe(true);
    expect(component.statementForm.value).toEqual({
      inputType: '',
      fromDate: '',
      toDate: '',
      selectedOption: '',
      downloadFormat: ''
    });
  });

  it('should log form value on submitForm()', () => {
    spyOn(console, 'log');
    component.statementForm.setValue({
      inputType: 'dateRange',
      fromDate: '2024-06-01',
      toDate: '2024-06-10',
      selectedOption: 'Last 7 Days',
      downloadFormat: 'PDF File'
    });
    component.submitForm();
    expect(console.log).toHaveBeenCalledWith({
      inputType: 'dateRange',
      fromDate: '2024-06-01',
      toDate: '2024-06-10',
      selectedOption: 'Last 7 Days',
      downloadFormat: 'PDF File'
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
