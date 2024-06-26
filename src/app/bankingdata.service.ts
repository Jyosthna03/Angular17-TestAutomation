import { Injectable } from '@angular/core';
import { AccountData, CardDetails, tabnames } from './modal';
import { BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BankingdataService {
 
  userData:string[]=['leela@gmail.com','Leela@123','katy@gmail.com','Katy@12354','jyosthna@gmail.com','Jyos@123'];
  registerDetails:Array<Object> = []
  currentUser: string="";
  selectBillerSuccess:Array<Object> = []
  rechargePaymentSuccess:boolean = false;
  balance:number = 50000;
  trimmedString:string = "";
  addPayee:Array<string> = ['Dileep']
  selectPayeeValue:boolean = true;
  isTransactionHistory=false;
  isAccountStatement=false;
  breadCrumb:Array<string>= ["Account Details"] 
  paymentSucess:Array<Object> = [] //for congratulations page data


  private accountNumberpopUp = new BehaviorSubject<string>('');
  private bankNamepopUp = new BehaviorSubject<string>('');
  currentAccountNumber = this.accountNumberpopUp.asObservable();
  currentBankName = this.bankNamepopUp.asObservable();

  changeAccountNumber(accountNumber: string) {
    this.accountNumberpopUp.next(accountNumber);
  }

  userBankName(bankName:string){
    this.bankNamepopUp.next(bankName);
  }

  checkUserInApp(searchUser: string){
    return this.userData.includes(searchUser);
  }

  trimNameFromEmail(email: string): string {
    const parts = email.split('@');
    let name = parts[0].trim();
    name = name.charAt(0).toUpperCase() + name.slice(1);
    return name;
  }

  getUserData() {
    return this.userData;
  }
  setCurrentUser(user: string) {
    this.currentUser = user;
  }

  getCurrentUser() {
    return this.currentUser;
  }
 
  //for multiple accounts and account summary component
  multipleAccountData:CardDetails[] = [{
        id:1,
        AccountHolder: this.trimmedString,
        AccountType:"Savings Account",
        AccountNumber:"1234567890111213",
        AccountBranch:"KPHB",
        AvailableBalanceinRupees: this.balance
  }]

  //only for transfer account summary component
  accountData:AccountData[]= [
    {
        AccountHolder: this.trimmedString,
        AccountType:"Savings Account",
        AccountNumber:"1234567890111213",
        AccountifscCode:"ABCD0001234",
        AccountBranch:"KPHB",
        AvailableBalanceinRupees: this.balance
    }
  ]

  tabNames:tabnames[] = [
    {
      displayName:'Account Details',
      routerLink:'/accountDashboard'
    },
    {
      displayName:'Payments',
      routerLink:'/paymentDashboard'
    },
    {
      displayName:'Fund Transfers',
      routerLink:'/transferDashboard'
    }
  ]

  userSelectedTab:string =this.tabNames[0].displayName;
  userSelectTab(tab:string){
    this.breadCrumb.pop();
    this.breadCrumb.push(tab);
    this.userSelectedTab = tab;
  }
}
