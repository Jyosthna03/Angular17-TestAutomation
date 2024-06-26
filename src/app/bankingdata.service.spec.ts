import { TestBed } from '@angular/core/testing';

import { BankingdataService } from './bankingdata.service';
import { zip } from 'rxjs';

describe('BankingdataService', () => {
  let service: BankingdataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [BankingdataService],
  });
  service = TestBed.inject(BankingdataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize userData', () => {
    expect(service.userData).toEqual(['leela@gmail.com', 'Leela@123', 'katy@gmail.com', 'Katy@12354', 'jyosthna@gmail.com', 'Jyos@123']);
  });

  it('should initialize registerDetails as an empty array', () => {
    expect(service.registerDetails).toEqual([]);
  });

  it('should initialize currentUser as an empty string', () => {
    expect(service.currentUser).toEqual('');
  });

  it('should initialize selectBillerSuccess as an empty array', () => {
    expect(service.selectBillerSuccess).toEqual([]);
  });

  it('should initialize rechargePaymentSuccess as false', () => {
    expect(service.rechargePaymentSuccess).toEqual(false);
  });

  it('should initialize balance to 50000', () => {
    expect(service.balance).toEqual(50000);
  });

  it('should initialize trimmedString as an empty string', () => {
    expect(service.trimmedString).toEqual('');
  });

  it('should initialize addPayee with initial value', () => {
    expect(service.addPayee).toEqual(['Dileep']);
  });

  it('should initialize selectPayeeValue as true', () => {
    expect(service.selectPayeeValue).toEqual(true);
  });

  it('should initialize isTransactionHistory as false', () => {
    expect(service.isTransactionHistory).toEqual(false);
  });

  it('should initialize isAccountStatement as false', () => {
    expect(service.isAccountStatement).toEqual(false);
  });

  it('should initialize breadCrumb with "Account Details"', () => {
    expect(service.breadCrumb).toEqual(['Account Details']);
  });

  it('should initialize paymentSucess as an empty array', () => {
    expect(service.paymentSucess).toEqual([]);
  });

  it('should initialize currentAccountNumber and currentBankName observables with empty strings', (done: DoneFn) => {
    zip(service.currentAccountNumber, service.currentBankName).subscribe(([accountNumber, bankName]) => {
      expect(accountNumber).toEqual('');
      expect(bankName).toEqual('');
      done();
    });
  });

  it('should change account number using changeAccountNumber method', (done: DoneFn) => {
    const newAccountNumber = '1234567890';

    service.changeAccountNumber(newAccountNumber);

    service.currentAccountNumber.subscribe(value => {
      expect(value).toEqual(newAccountNumber);
      done();
    });
  });

  it('should change bank name using userBankName method', (done: DoneFn) => {
    const newBankName = 'Sample Bank';

    service.userBankName(newBankName);

    service.currentBankName.subscribe(value => {
      expect(value).toEqual(newBankName);
      done();
    });
  });

  it('should return true if user exists in userData', () => {
    const existingUser = 'leela@gmail.com';
    const result = service.checkUserInApp(existingUser);
    expect(result).toBeTrue();
  });

  it('should return false if user does not exist in userData', () => {
    const nonExistingUser = 'randomuser@gmail.com';
    const result = service.checkUserInApp(nonExistingUser);
    expect(result).toBeFalse();
  });

  it('should correctly trim and capitalize the name from email', () => {
    const email = 'leela@gmail.com';
    const expectedName = 'Leela';
    const result = service.trimNameFromEmail(email);
    expect(result).toEqual(expectedName);
  });

  it('should handle emails with leading or trailing spaces', () => {
    const emailWithSpaces = '  katy@gmail.com  ';
    const expectedName = 'Katy';
    const result = service.trimNameFromEmail(emailWithSpaces);
    expect(result).toEqual(expectedName);
  });

  it('should handle mixed case emails', () => {
    const mixedCaseEmail = 'Jyosthna@Gmail.com';
    const expectedName = 'Jyosthna';
    const result = service.trimNameFromEmail(mixedCaseEmail);
    expect(result).toEqual(expectedName);
  });

  it('should return the correct user data array', () => {
    const expectedUserData = ['leela@gmail.com', 'Leela@123', 'katy@gmail.com', 'Katy@12354', 'jyosthna@gmail.com', 'Jyos@123'];

    const result = service.getUserData();

    expect(result).toEqual(expectedUserData);
  });

  it('should set the current user correctly', () => {
    const user = 'jyosthna@gmail.com';

    service.setCurrentUser(user);

    const result = service.getCurrentUser();

    expect(result).toEqual(user);
  });

  it('should return the current user', () => {
    const user = 'leela@gmail.com';
    service.setCurrentUser(user);

    const result = service.getCurrentUser();

    expect(result).toEqual(user);
  });

  it('should initialize multipleAccountData array with correct structure', () => {
    expect(service.multipleAccountData.length).toBe(1);
    const accountData = service.multipleAccountData[0];
    expect(accountData.id).toBe(1);
    expect(accountData.AccountType).toBe("Savings Account");
    expect(accountData.AccountNumber).toBe("1234567890111213");
    expect(accountData.AccountBranch).toBe("KPHB");
    expect(accountData.AvailableBalanceinRupees).toBe(50000);
  });

  it('should initialize accountData array with correct structure', () => {
    expect(service.accountData.length).toBe(1);

    const account = service.accountData[0];

    expect(account.AccountType).toBe("Savings Account");
    expect(account.AccountNumber).toBe("1234567890111213");
    expect(account.AccountifscCode).toBe("ABCD0001234");
    expect(account.AccountBranch).toBe("KPHB");
    expect(account.AvailableBalanceinRupees).toBe(50000);
  });

  it('should initialize tabNames array with correct structure', () => {
    expect(service.tabNames.length).toBe(3); // Assuming there are three tabs

    const firstTab = service.tabNames[0];
    const secondTab = service.tabNames[1];
    const thirdTab = service.tabNames[2];

    expect(firstTab.displayName).toBe('Account Details');
    expect(firstTab.routerLink).toBe('/accountDashboard');

    expect(secondTab.displayName).toBe('Payments');
    expect(secondTab.routerLink).toBe('/paymentDashboard');

    expect(thirdTab.displayName).toBe('Fund Transfers');
    expect(thirdTab.routerLink).toBe('/transferDashboard');
  });

  it('should update breadCrumb array and userSelectedTab correctly', () => {
    const initialBreadCrumbLength = service.breadCrumb.length;
    const newTab = 'Payments';
    service.userSelectTab(newTab);
    expect(service.breadCrumb.length).toBe(initialBreadCrumbLength); 
    expect(service.breadCrumb[service.breadCrumb.length - 1]).toBe(newTab); 
    expect(service.userSelectedTab).toBe(newTab); 
  });
});
