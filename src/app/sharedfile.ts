import { BankingdataService } from "./bankingdata.service";
import { CardDetails } from "./modal";

export class SharedFile{
    constructor(private service:BankingdataService){}

    cardDetails:CardDetails[] = [
        {
          id:1,
          AccountHolder: this.service.trimmedString,
          AccountType:"Savings Account",
          AccountNumber:"1234567890111213",
          AccountBranch:"KPHB",
          AvailableBalanceinRupees: this.service.balance
        },
        {
          id:2,
          AccountHolder: this.service.trimmedString,
          AccountType:"Loan Account",
          AccountNumber:"1234567890111213",
          AccountBranch:"KPHB",
          AvailableBalanceinRupees: this.service.balance
        },
        {
          id:3,
          AccountHolder: this.service.trimmedString,
          AccountType:"Credit Card",
          AccountNumber:"1234567890111213",
          AccountBranch:"KPHB",
          AvailableBalanceinRupees: this.service.balance
        },
        {
          id:4,
          AccountHolder: this.service.trimmedString,
          AccountType:"OverDraft Account",
          AccountNumber:"1234567890111213",
          AccountBranch:"KPHB",
          AvailableBalanceinRupees: this.service.balance
        }]
}

