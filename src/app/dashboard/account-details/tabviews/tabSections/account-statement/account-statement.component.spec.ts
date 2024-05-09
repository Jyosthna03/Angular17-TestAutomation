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

  it('should initialize default values', () => {
    const currentDate = new Date();
    expect(component.fromStatementDate()).toEqual('');
    expect(component.toStatementDate()).toEqual('');
    expect(component.showflag()).toEqual('');
    expect(component.todayDate().getDate()).toEqual(currentDate.getDate());
    expect(component.selectStatementPeriod()).toEqual('Last 7 Days');
    expect(component.selectedStatementFormat()).toEqual('PDF File');
  });

  it('should set showflag to Show With Date when calling showWithDate()', () => {
    component.showWithDate();
    expect(component.showflag()).toEqual('Show With Date');
  });

  it('should set showflag to Show With Period when calling showWithPeriod()', () => {
    component.showWithPeriod();
    expect(component.showflag()).toEqual('Show With Period');
  });

  it('should update selectStatementPeriod when calling onSelectStatementPeriod()', () => {
    const selectedValue = { target: { value: 'Last 14 Days' }};
    component.onSelectStatementPeriod(selectedValue);
    expect(component.selectStatementPeriod()).toEqual('Last 14 Days');
  });

  it('should update selectedStatementFormat when calling onSelectStatementFormat()', () => {
    const selectedValue = { target: { value: 'Excel Sheet' }};
    component.onSelectStatementFormat(selectedValue);
    expect(component.selectedStatementFormat()).toEqual('Excel Sheet');
  });

  it('should display alert message when calling submitStatement() with valid data', () => {
    spyOn(window, 'alert');
    component.showflag.set('Show With Date');
    component.fromStatementDate.set('2024-04-20');
    component.toStatementDate.set('2024-04-23');
    component.selectedStatementFormat.set('PDF File');
    component.submitStatement();
    expect(window.alert).toHaveBeenCalledWith(`Downloaded Statement from 2024-04-20 to 2024-04-23 in PDF File Format`);
  });

  it('should display alert message when calling submitStatement() with invalid data', () => {
    spyOn(window, 'alert');
    component.submitStatement();
    expect(window.alert).toHaveBeenCalledWith('Choose Option and Select The Fields To Download');
  });

  it('should reset selectedStatementFormat, fromStatementDate, and toStatementDate when calling cancelStatement()', () => {
    component.selectedStatementFormat.set('PDF File');
    component.fromStatementDate.set('2024-04-20');
    component.toStatementDate.set('2024-04-23');
    component.cancelStatement();
    expect(component.selectedStatementFormat()).toEqual('PDF File');
    expect(component.fromStatementDate()).toEqual('');
    expect(component.toStatementDate()).toEqual('');
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
