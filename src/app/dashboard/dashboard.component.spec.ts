import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BankingdataService } from '../bankingdata.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let service:BankingdataService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [BankingdataService,{ provide: ActivatedRoute, useValue: {paramMap:of({})} }],
      
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(BankingdataService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have a logo class', () => {
    const linkElement = fixture.debugElement.query(By.css('.logo'));
    expect(linkElement).toBeTruthy();
  });
  it('Check the String is correctly Trimmed or not', () => {
    const email = 'leela@gmail.com';
    service.trimmedString = 'Leela';
    const trimName = service.trimNameFromEmail(email);
    const trimmedString = service.trimmedString;
    expect(trimmedString).toBeDefined();
    expect(trimName).toEqual(service.trimmedString);
  });
  it('should contain a button element with "LogOut" text', () => {
    const buttonElement = fixture.debugElement.query(By.css('.btn.btn-primary'));
    expect(buttonElement.nativeElement.textContent.trim()).toBe('LogOut');
  });

  it('should set userSelectedTab property and navigate to accountDashboard', () => {
    const spyService = spyOn(service, 'userSelectTab').and.stub(); 
    component.gotoAccountDashboard();

    expect(service.userSelectedTab).toEqual(service.tabNames[0].displayName); 
    expect(spyService).toHaveBeenCalledWith(service.userSelectedTab); 
  });

  it('should set userSelectedTab property and navigate to transferDashboard', () => {
    const spyService = spyOn(service, 'userSelectTab').and.stub(); 
    component.gotoTransferDashboard();
    expect(service.userSelectedTab).toEqual(service.tabNames[2].displayName);
    expect(spyService).toHaveBeenCalledWith(service.userSelectedTab); 
  });

  it('should set userSelectedTab property and navigate to paymentDashboard', () => {
    const spyService = spyOn(service, 'userSelectTab').and.stub();
    component.gotoPaymentDashboard();
    expect(service.userSelectedTab).toEqual(service.tabNames[1].displayName);
    expect(spyService).toHaveBeenCalledWith(service.userSelectedTab);
  });

  
});
