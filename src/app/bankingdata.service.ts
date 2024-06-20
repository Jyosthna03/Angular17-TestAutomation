import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { recent } from './modal';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BankingdataService {
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

  constructor(private http:HttpClient) { }

  userData:string[]=['leela@gmail.com','Leela@123','katy@gmail.com','Katy@12354','jyosthna@gmail.com','Jyos@123'];
  registerDetails:Array<Object> = []
  currentUser: any;
  selectBillerSuccess:Array<Object> = []
  rechargePaymentSuccess:boolean = false;

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
  setCurrentUser(user: any) {
    this.currentUser = user;
  }

  getCurrentUser() {
    return this.currentUser;
  }

  balance:number = 50000;

  trimmedString:string = "";

  addPayee:any = ['Dileep']

  

  accountData:any= [
    {
        AccountHolder: this.trimmedString,
        AccountType:"Savings Account",
        AccountNumber:"1234567890111213",
        AccountifscCode:"ABCD0001234",
        AccountBranch:"KPHB",
        AvailableBalanceinRupees: this.balance
    }
  ]

  selectPayeeValue:boolean = true;
  isTransactionHistory=false;
  isAccountStatement=false;
  breadCrumb:any[] = ["Account Details"] 
  paymentSucess:Array<Object> = [] //for congratulations page data


  tabNames = [
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

  userSelectedTab=this.tabNames[0].displayName;

  userSelectTab(tab:string){
    this.breadCrumb.pop();
    this.breadCrumb.push(tab);
    this.userSelectedTab = tab;
    console.log("Service-Tab: ",this.userSelectedTab);
  }


}
