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

export interface CardDetails {
    id: number;
    AccountHolder: string;
    AccountType: string;
    AccountNumber: string;
    AccountBranch: string;
    AvailableBalanceinRupees: number;
  }

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
  }
  
  export interface RechargeFormValues {
    billerType: string;
    networkProvider: string;
    PayingFrom: string;
  }

  export interface successData {
    payee:string;
    accountNumber:number;
    bankName:string;
    amount:number;
    remarks:string;
    paymentModeInput:string;
  }
 