import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BankingdataService {

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

  getData(){
    return this.http.get('assets/DataBase/data.json');
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

  addPayee:any = ['Select Payee','Dileep']

  accountData:any= [
    {
        AccountHolder: this.trimmedString,
        AccountType:"Savings Account",
        AccountNumber:"1234567890111213",
        AccountIFSCCode:"ABCD0001234",
        AccountBranch:"KPHB",
        AvailableBalanceinRupees: this.balance
    }
  ]

  isTransactionHistory=false;
  isAccountStatement=false;
  breadCrumb:any[] = ["Account Details"]
  paymentHistory:number[] = [] // to calculate total transcations amount 
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
