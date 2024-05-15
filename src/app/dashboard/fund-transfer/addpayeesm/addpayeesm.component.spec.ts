import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddpayeesmComponent } from './addpayeesm.component';

describe('AddpayeesmComponent', () => {
  let component: AddpayeesmComponent;
  let fixture: ComponentFixture<AddpayeesmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddpayeesmComponent]
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
