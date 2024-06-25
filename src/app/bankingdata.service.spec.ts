import { TestBed } from '@angular/core/testing';

import { BankingdataService } from './bankingdata.service';

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

  describe('changeAccountNumber', () => {
    it('should update currentAccountNumber observable', (done: DoneFn) => {
      const newAccountNumber = '1234567890';

      service.currentAccountNumber.subscribe(accountNumber => {
        expect(accountNumber).toBe(newAccountNumber);
        done();
      });

      service.changeAccountNumber(newAccountNumber);
    });
  });

  describe('userBankName', () => {
    it('should update currentBankName observable', (done: DoneFn) => {
      const newBankName = 'New Bank';

      service.currentBankName.subscribe(bankName => {
        expect(bankName).toBe(newBankName);
        done();
      });

      service.userBankName(newBankName);
    });
  });

  describe('changeAccountNumber', () => {
    it('should update accountNumberpopUp with new account number', () => {
      const newAccountNumber = '1234567890';

      service.changeAccountNumber(newAccountNumber);

      service['accountNumberpopUp'].subscribe(accountNumber => {
        expect(accountNumber).toBe(newAccountNumber);
      });
    });
  });

  describe('userBankName', () => {
    it('should update bankNamepopUp with new bank name', () => {
      const newBankName = 'New Bank';
      service.userBankName(newBankName);
      service['bankNamepopUp'].subscribe(bankName => {
        expect(bankName).toBe(newBankName);
      });
    });
  });

  it('should initialize userData array', () => {
    expect(service.userData).toBeDefined();
    expect(service.userData.length).toBe(6);
    expect(service.userData).toEqual([
      'leela@gmail.com',
      'Leela@123',
      'katy@gmail.com',
      'Katy@12354',
      'jyosthna@gmail.com',
      'Jyos@123'
    ]);
  });

  it('should initialize registerDetails array', () => {
    expect(service.registerDetails).toBeDefined();
    expect(service.registerDetails.length).toBe(0);
    expect(service.registerDetails).toEqual([]);
  });

  it('should initialize currentUser to empty string', () => {
    expect(service.currentUser).toBeDefined();
    expect(service.currentUser).toBe('');
  });

  it('should initialize selectBillerSuccess array', () => {
    expect(service.selectBillerSuccess).toBeDefined();
    expect(service.selectBillerSuccess.length).toBe(0); // Check initial array length
    expect(service.selectBillerSuccess).toEqual([]);
  });

  it('should initialize rechargePaymentSuccess to false', () => {
    expect(service.rechargePaymentSuccess).toBeDefined();
    expect(service.rechargePaymentSuccess).toBe(false);
  });

  describe('checkUserInApp', () => {
    it('should return true if user exists in userData', () => {
      const existingUser = 'leela@gmail.com';
      const result = service.checkUserInApp(existingUser);
      expect(result).toBe(true);
    });

    it('should return false if user does not exist in userData', () => {
      const nonExistingUser = 'testuser@gmail.com';
      const result = service.checkUserInApp(nonExistingUser);
      expect(result).toBe(false);
    });

    it('should handle case sensitivity in user search', () => {
      const existingUserLowerCase = 'leela@gmail.com';
      const existingUserUpperCase = 'Leela@gmail.com';
      const resultLowerCase = service.checkUserInApp(existingUserLowerCase);
      const resultUpperCase = service.checkUserInApp(existingUserUpperCase);
      expect(resultLowerCase).toBe(true);
      expect(resultUpperCase).toBe(true);
    });
  });

  describe('trimNameFromEmail', () => {
    it('should trim and capitalize the name from email', () => {
      const email = 'testuser@example.com';
      const expectedName = 'Testuser';
      const trimmedName = service.trimNameFromEmail(email);
      expect(trimmedName).toBe(expectedName);
    });

    it('should handle emails without domain part', () => {
      const email = 'testuser';
      const expectedName = 'Testuser';
      const trimmedName = service.trimNameFromEmail(email);
      expect(trimmedName).toBe(expectedName);
    });

    it('should handle emails with multiple @ symbols', () => {
      const email = 'test@user@example.com';
      const expectedName = 'Test@user';
      const trimmedName = service.trimNameFromEmail(email);
      expect(trimmedName).toBe(expectedName);
    });

    it('should handle empty email string', () => {
      const email = '';
      const expectedName = '';
      const trimmedName = service.trimNameFromEmail(email);
      expect(trimmedName).toBe(expectedName);
    });
  });

  describe('setCurrentUser and getCurrentUser', () => {
    it('should set and get current user', () => {
      const user = 'testuser';
      service.setCurrentUser(user);
      const currentUser = service.getCurrentUser();
      expect(currentUser).toBe(user);
    });

    it('should return empty string if currentUser is not set', () => {
      const currentUser = service.getCurrentUser();
      expect(currentUser).toBe('');
    });
  });

  it('should initialize balance property', () => {
    expect(service.balance).toBeDefined();
    expect(service.balance).toBe(50000);
  });

  it('should initialize trimmedString property', () => {
    expect(service.trimmedString).toBeDefined();
    expect(service.trimmedString).toBe('');
  });

  it('should initialize addPayee array', () => {
    expect(service.addPayee).toBeDefined();
    expect(service.addPayee.length).toBe(1);
    expect(service.addPayee).toEqual(['Dileep']);
  });

  it('should initialize accountData array with correct structure', () => {
    const expectedAccountData = [
      {
        AccountHolder: service.trimmedString,
        AccountType: "Savings Account",
        AccountNumber: "1234567890111213",
        AccountifscCode: "ABCD0001234",
        AccountBranch: "KPHB",
        AvailableBalanceinRupees: service.balance
      }
    ];
    expect(service.accountData).toBeDefined();
    expect(service.accountData.length).toBe(1); // Assuming there's one object in accountData array
    expect(service.accountData).toEqual(expectedAccountData);
  });

  it('should initialize selectPayeeValue property', () => {
    expect(service.selectPayeeValue).toBeDefined();
    expect(service.selectPayeeValue).toBe(true); // Assuming initial value is true
  });

  it('should initialize isTransactionHistory property', () => {
    expect(service.isTransactionHistory).toBeDefined();
    expect(service.isTransactionHistory).toBe(false); // Assuming initial value is false
  });

  it('should initialize isAccountStatement property', () => {
    expect(service.isAccountStatement).toBeDefined();
    expect(service.isAccountStatement).toBe(false); // Assuming initial value is false
  });

  it('should initialize breadCrumb array', () => {
    expect(service.breadCrumb).toBeDefined();
    expect(service.breadCrumb.length).toBe(1); // Assuming initial array has one element
    expect(service.breadCrumb).toEqual(['Account Details']);
  });

  it('should initialize paymentSucess array', () => {
    expect(service.paymentSucess).toBeDefined();
    expect(service.paymentSucess.length).toBe(0); // Assuming initial array is empty
    expect(service.paymentSucess).toEqual([]);
  });

  it('should initialize tabNames array with correct structure', () => {
    const expectedTabNames = [
      {
        displayName: 'Account Details',
        routerLink: '/accountDashboard'
      },
      {
        displayName: 'Payments',
        routerLink: '/paymentDashboard'
      },
      {
        displayName: 'Fund Transfers',
        routerLink: '/transferDashboard'
      }
    ];
    expect(service.tabNames).toBeDefined();
    expect(service.tabNames.length).toBe(3); // Assuming there are three tabs initially
    expect(service.tabNames).toEqual(expectedTabNames);
  });

  it('should initialize userSelectedTab with the first tab name', () => {
    const firstTabName = 'Account Details';
    expect(service.userSelectedTab).toBeDefined();
    expect(service.userSelectedTab).toBe(firstTabName);
  });

  describe('userSelectTab', () => {
    it('should update breadCrumb and userSelectedTab correctly', () => {
      const newTab = 'Payments';
      service.userSelectTab(newTab);
      expect(service.breadCrumb.length).toBe(1); // Assuming breadCrumb initially has one element
      expect(service.breadCrumb[0]).toBe(newTab);
      expect(service.userSelectedTab).toBe(newTab);
    });
  });
});
