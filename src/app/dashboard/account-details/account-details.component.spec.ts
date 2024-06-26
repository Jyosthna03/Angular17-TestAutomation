import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountDetailsComponent } from './account-details.component';
import { HttpClientModule } from '@angular/common/http';
import { By } from '@angular/platform-browser';
import { BankingdataService } from '../../bankingdata.service';

describe('AccountDetailsComponent', () => {
  let component: AccountDetailsComponent;
  let fixture: ComponentFixture<AccountDetailsComponent>;
  let service: BankingdataService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule],
    }).compileComponents();

    fixture = TestBed.createComponent(AccountDetailsComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(BankingdataService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the image element with correct attributes', () => {
    const imgElement = fixture.debugElement.query(By.css('img'));
    expect(imgElement).toBeTruthy();
    expect(imgElement.nativeElement.getAttribute('src')).toBe('assets/Images/account-pin-circle-line.png')
    expect(imgElement.nativeElement.getAttribute('alt')).toBe('Account-Details');
    expect(imgElement.nativeElement.style.maxHeight).toBe('fit-content');
  });

  it('should render paragraph with correct text and class for Account No', () => {
    const paragraphElement = fixture.debugElement.query(By.css('#accountNo'));
    expect(paragraphElement).toBeTruthy();
    expect(paragraphElement.nativeElement.textContent.trim()).toBe(
      'Account Number'
    );
    expect(paragraphElement.nativeElement.getAttribute('class')).toContain(
      'card-text'
    );
  });

  it('should render paragraph with correct text and class for Account Balance', () => {
    const paragraphElement = fixture.debugElement.query(
      By.css('#accountBalance')
    );
    expect(paragraphElement).toBeTruthy();
    expect(paragraphElement.nativeElement.textContent.trim()).toBe(
      'Account Balance'
    );
    expect(paragraphElement.nativeElement.getAttribute('class')).toContain(
      'card-text'
    );
  });

  it('should render paragraph with correct text and class for Transaction History', () => {
    const paragraphElement = fixture.debugElement.query(
      By.css('#transHistory')
    );
    expect(paragraphElement).toBeTruthy();
    expect(paragraphElement.nativeElement.textContent.trim()).toBe(
      'Transaction History'
    );
    expect(paragraphElement.nativeElement.getAttribute('class')).toContain(
      'card-text'
    );
  });

  it('should render paragraph with correct text and class for Statements', () => {
    const paragraphElement = fixture.debugElement.query(By.css('#statements'));
    expect(paragraphElement).toBeTruthy();
    expect(paragraphElement.nativeElement.textContent.trim()).toBe('Account Statement');
    expect(paragraphElement.nativeElement.getAttribute('class')).toContain('card-text');
  });

  it('should set isAccountStatement to true', () => {
    component.getStatements();
    expect(service.isAccountStatement).toBeTrue();
  });

  it('should set isTransactionHistory to true', () => {
    component.getTransction();
    expect(service.isTransactionHistory).toBeTrue();
  });
});
