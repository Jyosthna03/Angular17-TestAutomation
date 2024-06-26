import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransferDashboardComponent } from './transfer-dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { BankingdataService } from '../../../bankingdata.service';

describe('TransferDashboardComponent', () => {
  let component: TransferDashboardComponent;
  let fixture: ComponentFixture<TransferDashboardComponent>;

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
    
    fixture = TestBed.createComponent(TransferDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  
});
