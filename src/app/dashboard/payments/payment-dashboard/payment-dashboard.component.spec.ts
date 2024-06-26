import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaymentDashboardComponent } from './payment-dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BankingdataService } from '../../../bankingdata.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('PaymentDashboardComponent', () => {
  let component: PaymentDashboardComponent;
  let fixture: ComponentFixture<PaymentDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
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
    
    fixture = TestBed.createComponent(PaymentDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
