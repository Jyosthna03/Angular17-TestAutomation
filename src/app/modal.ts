export interface tabnames{
  displayName:string;
  routerLink:string;
}

export interface recent{
    symbol:string;
    name:string;
    transDate:string;
    transtype:string;
    transDesc:string;
    amountcredit:string;
    totAmount:string;
}

export interface history{
    sno:string;
    transactionDate:string;
    transctionRemarks:string;
    withDrawalAmount:string;
    depositAmount:string;
    balance:string;
}

export interface PaymentMode {
    paymentMode: string;
    paymentModeLimit: string;
}

export interface addPayee{
    fullname:string,
    nickname:string,
    bankName:string,
    ifscCode:string,
    accountNo:string,
    reEnteraccountNo:string
}

//multiple accounts data 
export interface CardDetails {
    id: number;
    AccountHolder: string;
    AccountType: string;
    AccountNumber: string;
    AccountBranch: string;
    AvailableBalanceinRupees: number;
  }

  //accountSummary data
export interface AccountData {
    AccountHolder: string;
    AccountType: string;
    AccountNumber: string;
    AccountBranch: string;
    AccountifscCode:string;
    AvailableBalanceinRupees: number;
}
  export interface BillerFormValues {
    billerType: string;
    billerdetails: string;
    PayingFrom: string;
    billDetailsAmount : string;
    }
  
  export interface RechargeFormValues {
    PayingFrom: string;
    amount:string;
    mobileNumber:string;
    networkProvider: string;
    
  }
  export interface successData {
    payee:string;
    accountNumber:number;
    bankName:string;
    amount:number;
    remarks:string;
    paymentModeInput:string;
  }

  export interface accountData{
    AccountHolder:string;
    AccountType:string;
    AccountNumber:string;
    AccountifscCode:string;
    AccountBranch:string;
    AvailableBalanceinRupees:number;


  }
 