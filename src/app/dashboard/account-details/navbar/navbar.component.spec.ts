import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { BankingdataService } from '../../../bankingdata.service';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  let router:Router
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [BankingdataService,{ provide: ActivatedRoute, useValue: {paramMap:of({})} }],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;

    router = TestBed.inject(Router)
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should have a nav-item class', () => {
    const linkElement = fixture.debugElement.query(By.css('.nav-item'));
    expect(linkElement).toBeTruthy();
  });

  it('should have a logo class', () => {
    const linkElement = fixture.debugElement.query(By.css('.logo'));
    expect(linkElement).toBeTruthy();
  });

  it('should display Test Automation text', () => {
    const linkElement: HTMLElement = fixture.debugElement.query(By.css('.logo')).nativeElement;
    expect(linkElement.textContent).toContain('Test Automation');
  });

  it('should have 5 nav items', () => {
    const navItems = fixture.debugElement.queryAll(By.css('.nav-item'));
    expect(navItems.length).toBe(5);
  });

  it('should have a logout button', () => {
    const logoutButton = fixture.debugElement.query(By.css('.logOutBtn'));
    expect(logoutButton).toBeTruthy();
  });

  it('should call selectTab method when clicking on a nav-link', () => {
    spyOn(component, 'selectTab');
    const navLink = fixture.debugElement.query(By.css('.accountDetails'));
    navLink.nativeElement.click();
    expect(component.selectTab).toHaveBeenCalled();
  });

  it('should have a logout button with routerLink', () => {
    const logoutButton = fixture.debugElement.query(By.css('.logOutBtn'));
    expect(logoutButton).toBeTruthy();
    const routerLink = logoutButton.nativeElement.getAttribute('routerLink');
    expect(routerLink).toBe('/');
  });

  it('should navigate to login when back button is clicked', () => {
    const navigateSpy = spyOn(router, 'navigateByUrl');

    const button = fixture.nativeElement.querySelector('#logout');
    button.click();

    expect(navigateSpy).toHaveBeenCalled();
    expect(navigateSpy.calls.mostRecent().args[0]).toMatch('/')
  });
  



});
