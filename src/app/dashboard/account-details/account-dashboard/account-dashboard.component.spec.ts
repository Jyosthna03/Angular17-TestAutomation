import { ComponentFixture, TestBed} from '@angular/core/testing';
import { AccountDashboardComponent } from './account-dashboard.component';

describe('AccountDashboardComponent', () => {
  let component: AccountDashboardComponent;
  let fixture: ComponentFixture<AccountDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccountDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Defining Loader Flag',()=>{
    expect(component.isloaded).toBeDefined();
  });

  it('Initialzing Loader',()=>{
    expect(component.isloaded).toBe(false);
  });

  it('Defining Loader Flag',()=>{
    expect(component.isloaded).toBeDefined();
  });

  it('Initialzing Loader',()=>{
    expect(component.isloaded).toBe(false);
  });

  
});
