import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddpayeesmComponent } from './addpayeesm.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('AddpayeesmComponent', () => {
  let component: AddpayeesmComponent;
  let fixture: ComponentFixture<AddpayeesmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddpayeesmComponent],
      providers : [{
        provide: ActivatedRoute,
        useValue: {
          paramMap: of({}) 
        }
      }]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddpayeesmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
