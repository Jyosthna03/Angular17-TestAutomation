import { TestBed } from '@angular/core/testing';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { loginguardGuard } from './loginguard.guard';

describe('loginguardGuard', () => {
  let guard: loginguardGuard;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [loginguardGuard]
    });
    guard = TestBed.inject(loginguardGuard);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow activation when localStorage contains "logindata"', () => {
    spyOn(localStorage, 'getItem').and.returnValue('dummy data');
    const canActivate = guard.canActivate(new ActivatedRouteSnapshot(), <RouterStateSnapshot>{});
    expect(canActivate).toBe(true);
  });

  it('should navigate to "/" and block activation when localStorage is empty', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null); // Simulate empty localStorage
    const navigateByUrlSpy = spyOn(router, 'navigateByUrl');
    const canActivate = guard.canActivate(new ActivatedRouteSnapshot(), <RouterStateSnapshot>{});
    expect(canActivate).toBe(false);
    expect(navigateByUrlSpy).toHaveBeenCalledWith('/');
  });

  it('should navigate to "/" and block activation when "logindata" is not present in localStorage', () => {
    spyOn(localStorage, 'getItem').and.callFake((key: string) => {
      if (key === 'logindata') {
        return null; 
      }
      return 'dummyToken';
    });
    const navigateByUrlSpy = spyOn(router, 'navigateByUrl');
    const canActivate = guard.canActivate(new ActivatedRouteSnapshot(), <RouterStateSnapshot>{});
    expect(canActivate).toBe(false);
    expect(navigateByUrlSpy).toHaveBeenCalledWith('/');
  });

  it('should allow activation when "logindata" is present in localStorage', () => {
    spyOn(localStorage, 'getItem').and.callFake((key: string) => {
      if (key === 'logindata') {
        return 'dummyToken'; // Simulate "logindata" present
      }
      return null; // Simulate other data not present
    });
    const navigateByUrlSpy = spyOn(router, 'navigateByUrl');
    const canActivate = guard.canActivate(new ActivatedRouteSnapshot(), <RouterStateSnapshot>{});
    expect(canActivate).toBe(true);
    expect(navigateByUrlSpy).not.toHaveBeenCalled();
  });


  it('should navigate to "/" and block activation when localStorage is an empty string', () => {
    spyOn(localStorage, 'getItem').and.returnValue('');
    const navigateByUrlSpy = spyOn(router, 'navigateByUrl');
    const canActivate = guard.canActivate(new ActivatedRouteSnapshot(), <RouterStateSnapshot>{});
    expect(canActivate).toBe(false);
    expect(navigateByUrlSpy).toHaveBeenCalledWith('/');
  });

});

