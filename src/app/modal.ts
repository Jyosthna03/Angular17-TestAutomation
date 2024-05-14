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
    valueDate:string;
    transactionDate:string;
    transctionRemarks:string;
    withDrawalAmount:string;
    depositAmount:string;
    balance:string;
    dayClosingBalance:string;
}

export interface PaymentMode {
    paymentMode: string;
    paymentModeLimit: string;
}