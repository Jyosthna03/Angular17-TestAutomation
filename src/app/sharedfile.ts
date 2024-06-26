import { BankingdataService } from './bankingdata.service';
import { AccountData, CardDetails, history, recent } from './modal';

export class SharedFile {
  constructor(private service: BankingdataService) {}

  cardDetails: CardDetails[] = [
    {
      id: 1,
      AccountHolder: this.service.trimmedString,
      AccountType: 'Savings Account',
      AccountNumber: '1234567890111213',
      AccountBranch: 'KPHB',
      AvailableBalanceinRupees: this.service.balance,
    },
    {
      id: 2,
      AccountHolder: this.service.trimmedString,
      AccountType: 'Loan Account',
      AccountNumber: '1234567890111213',
      AccountBranch: 'KPHB',
      AvailableBalanceinRupees: this.service.balance,
    },
    {
      id: 3,
      AccountHolder: this.service.trimmedString,
      AccountType: 'Credit Card',
      AccountNumber: '1234567890111213',
      AccountBranch: 'KPHB',
      AvailableBalanceinRupees: this.service.balance,
    },
    {
      id: 4,
      AccountHolder: this.service.trimmedString,
      AccountType: 'OverDraft Account',
      AccountNumber: '1234567890111213',
      AccountBranch: 'KPHB',
      AvailableBalanceinRupees: this.service.balance,
    },
  ];

  userBankDetails: AccountData[] = [
    {
      AccountHolder: this.service.trimmedString,
      AccountType: 'Savings Account',
      AccountNumber: '1234567890111213',
      AccountifscCode: 'ABCD0001234',
      AccountBranch: 'KPHB',
      AvailableBalanceinRupees: this.service.balance,
    },
  ];
  selectOptions = ['Credit Card', 'Debit Card', 'Utilities', 'Mobile Recharge'];
  biller = ['Credit Card', 'Debit Card'];
  networkProviders = ['Airtel Post-paid', 'Airtel Pre-paid'];
  banks=['ICICI', 'SBI', 'HDFC', 'Axis', 'StandardCharted'];

  countries = ['Select Country', 'India','USA', 'Canada', 'UK', 'Australia', 'Poland', 'Other'];
  states = ['Select State','Telangana','Andhra Pradesh','Karnataka','Tamil Nadu','Himachal Pradesh']


  
  
  userRecentTrans: recent[] = [
    {
      symbol: 'assets/Images/down-arrow.svg',
      name: 'Natasha Davel',
      transDate: '15/03/2024',
      transtype: 'Credited',
      transDesc: 'IMPS 1234/UPI123456/DIleep Thotakura/PhonePe',
      amountcredit: '1,256.00',
      totAmount: '₹1,11,256.00',
    },
    {
      symbol: 'assets/Images/upward-arrow.svg',
      name: 'Fusion Restro',
      transDate: '15/03/2024',
      transtype: 'Debited',
      transDesc: '123456/Fusion Restro',
      amountcredit: '1,256.00',
      totAmount: '₹1,10,256.00',
    },
    {
      symbol: 'assets/Images/down-arrow.svg',
      name: 'Evoke Technologies',
      transDate: '15/03/2024',
      transtype: 'Credited',
      transDesc: 'IMPS 1234/UPI123456/DIleep Thotakura/PhonePe',
      amountcredit: '1,256.00',
      totAmount: '₹1,11,256.00',
    },
    {
      symbol: 'assets/Images/down-arrow.svg',
      name: 'Bilnk It',
      transDate: '15/03/2024',
      transtype: 'Credited',
      transDesc: 'IMPS 1234/UPI123456/DIleep Thotakura/PhonePe',
      amountcredit: '1,256.00',
      totAmount: '₹1,11,256.00',
    },
    {
      symbol: 'assets/Images/down-arrow.svg',
      name: 'Bilnk It',
      transDate: '15/03/2024',
      transtype: 'Credited',
      transDesc: 'IMPS 1234/UPI123456/DIleep Thotakura/PhonePe',
      amountcredit: '1,256.00',
      totAmount: '₹1,11,256.00',
    },
    {
      symbol: 'assets/Images/upward-arrow.svg',
      name: 'Zerofourty Brewering',
      transDate: '15/03/2024',
      transtype: 'Debited',
      transDesc: '123456/Fusion Restro',
      amountcredit: '1,256.00',
      totAmount: '₹1,10,256.00',
    },
    {
      symbol: 'assets/Images/down-arrow.svg',
      name: 'Bilnk It',
      transDate: '15/03/2024',
      transtype: 'Credited',
      transDesc: 'IMPS 1234/UPI123456/DIleep Thotakura/PhonePe',
      amountcredit: '1,256.00',
      totAmount: '₹1,11,256.00',
    },
    {
      symbol: 'assets/Images/upward-arrow.svg',
      name: 'Zerofourty Brewering',
      transDate: '15/03/2024',
      transtype: 'Debited',
      transDesc: '123456/Fusion Restro',
      amountcredit: '1,256.00',
      totAmount: '₹1,10,256.00',
    },
    {
      symbol: 'assets/Images/upward-arrow.svg',
      name: 'Zerofourty Brewering',
      transDate: '15/03/2024',
      transtype: 'Debited',
      transDesc: '123456/Fusion Restro',
      amountcredit: '1,256.00',
      totAmount: '₹1,10,256.00',
    },
    {
      symbol: 'assets/Images/down-arrow.svg',
      name: 'Bilnk It',
      transDate: '15/03/2024',
      transtype: 'Credited',
      transDesc: 'IMPS 1234/UPI123456/DIleep Thotakura/PhonePe',
      amountcredit: '1,256.00',
      totAmount: '₹1,11,256.00',
    },
  ];
}

export const userTransHistory: history[] = [
  {
    sno: '01',
    transactionDate: '18/03/2024',
    transctionRemarks:
      'VIN/BLINKIT/202403031436/4063-09545745/Phone pe/Blinkit',
    withDrawalAmount: '314.45',
    depositAmount: '---',
    balance: '1109.82',
  },
  {
    sno: '02',
    transactionDate: '18/03/2024',
    transctionRemarks:
      'VIN/BLINKIT/202403031436/4063-09545745/Phone pe/Blinkit',
    withDrawalAmount: '---',
    depositAmount: '217.56',
    balance: '1109.82',
  },
  {
    sno: '03',
    transactionDate: '18/03/2024',
    transctionRemarks:
      'VIN/BLINKIT/202403031436/4063-09545745/Phone pe/Blinkit',
    withDrawalAmount: '314.45',
    depositAmount: '---',
    balance: '1109.82',
  },
  {
    sno: '04',
    transactionDate: '18/03/2024',
    transctionRemarks:
      'VIN/BLINKIT/202403031436/4063-09545745/Phone pe/Blinkit',
    withDrawalAmount: '---',
    depositAmount: '275.67',
    balance: '1109.82',
  },
  {
    sno: '05',
    transactionDate: '18/03/2024',
    transctionRemarks:
      'VIN/BLINKIT/202403031436/4063-09545745/Phone pe/Blinkit',
    withDrawalAmount: '314.45',
    depositAmount: '---',
    balance: '1109.82',
  },
  {
    sno: '06',
    transactionDate: '18/03/2024',
    transctionRemarks:
      'VIN/BLINKIT/202403031436/4063-09545745/Phone pe/Blinkit',
    withDrawalAmount: '---',
    depositAmount: '234.67',
    balance: '1109.82',
  },
  {
    sno: '07',
    transactionDate: '18/03/2024',
    transctionRemarks:
      'VIN/BLINKIT/202403031436/4063-09545745/Phone pe/Blinkit',
    withDrawalAmount: '314.45',
    depositAmount: '---',
    balance: '1109.82',
  },
  {
    sno: '08',
    transactionDate: '18/03/2024',
    transctionRemarks:
      'VIN/BLINKIT/202403031436/4063-09545745/Phone pe/Blinkit',
    withDrawalAmount: '---',
    depositAmount: '256.78',
    balance: '1109.82',
  },
  {
    sno: '09',
    transactionDate: '18/03/2024',
    transctionRemarks:
      'VIN/BLINKIT/202403031436/4063-09545745/Phone pe/Blinkit',
    withDrawalAmount: '314.45',
    depositAmount: '---',
    balance: '1109.82',
  },
  {
    sno: '10',
    transactionDate: '18/03/2024',
    transctionRemarks:
      'VIN/BLINKIT/202403031436/4063-09545745/Phone pe/Blinkit',
    withDrawalAmount: '---',
    depositAmount: '134.67',
    balance: '1109.82',
  },
  {
    sno: '11',
    transactionDate: '18/03/2024',
    transctionRemarks:
      'VIN/BLINKIT/202403031436/4063-09545745/Phone pe/Blinkit',
    withDrawalAmount: '314.45',
    depositAmount: '---',
    balance: '1109.82',
  },
  {
    sno: '12',
    transactionDate: '18/03/2024',
    transctionRemarks:
      'VIN/BLINKIT/202403031436/4063-09545745/Phone pe/Blinkit',
    withDrawalAmount: '---',
    depositAmount: '314.45',
    balance: '1109.82',
  },
  {
    sno: '13',
    transactionDate: '18/03/2024',
    transctionRemarks:
      'VIN/BLINKIT/202403031436/4063-09545745/Phone pe/Blinkit',
    withDrawalAmount: '314.45',
    depositAmount: '---',
    balance: '1109.82',
  },
  {
    sno: '14',
    transactionDate: '18/03/2024',
    transctionRemarks:
      'VIN/BLINKIT/202403031436/4063-09545745/Phone pe/Blinkit',
    withDrawalAmount: '---',
    depositAmount: '156.78',
    balance: '1109.82',
  },
  {
    sno: '15',
    transactionDate: '18/03/2024',
    transctionRemarks:
      'VIN/BLINKIT/202403031436/4063-09545745/Phone pe/Blinkit',
    withDrawalAmount: '314.45',
    depositAmount: '---',
    balance: '1109.82',
  },
  {
    sno: '16',
    transactionDate: '18/03/2024',
    transctionRemarks:
      'VIN/BLINKIT/202403031436/4063-09545745/Phone pe/Blinkit',
    withDrawalAmount: '---',
    depositAmount: '245.78',
    balance: '1109.82',
  },
  {
    sno: '17',
    transactionDate: '18/03/2024',
    transctionRemarks:
      'VIN/BLINKIT/202403031436/4063-09545745/Phone pe/Blinkit',
    withDrawalAmount: '314.45',
    depositAmount: '---',
    balance: '1109.82',
  },
  {
    sno: '18',
    transactionDate: '18/03/2024',
    transctionRemarks:
      'VIN/BLINKIT/202403031436/4063-09545745/Phone pe/Blinkit',
    withDrawalAmount: '---',
    depositAmount: '355.78',
    balance: '1109.82',
  },
  {
    sno: '19',
    transactionDate: '18/03/2024',
    transctionRemarks:
      'VIN/BLINKIT/202403031436/4063-09545745/Phone pe/Blinkit',
    withDrawalAmount: '314.45',
    depositAmount: '---',
    balance: '1109.82',
  },
  {
    sno: '20',
    transactionDate: '18/03/2024',
    transctionRemarks:
      'VIN/BLINKIT/202403031436/4063-09545745/Phone pe/Blinkit',
    withDrawalAmount: '---',
    depositAmount: '456.78',
    balance: '1109.82',
  },
  {
    sno: '21',
    transactionDate: '18/03/2024',
    transctionRemarks:
      'VIN/BLINKIT/202403031436/4063-09545745/Phone pe/Blinkit',
    withDrawalAmount: '314.45',
    depositAmount: '---',
    balance: '1109.82',
  },
  {
    sno: '22',
    transactionDate: '18/03/2024',
    transctionRemarks:
      'VIN/BLINKIT/202403031436/4063-09545745/Phone pe/Blinkit',
    withDrawalAmount: '---',
    depositAmount: '988.78',
    balance: '1109.82',
  },
  {
    sno: '23',
    transactionDate: '18/03/2024',
    transctionRemarks:
      'VIN/BLINKIT/202403031436/4063-09545745/Phone pe/Blinkit',
    withDrawalAmount: '314.45',
    depositAmount: '---',
    balance: '1109.82',
  },
  {
    sno: '24',
    transactionDate: '18/03/2024',
    transctionRemarks:
      'VIN/BLINKIT/202403031436/4063-09545745/Phone pe/Blinkit',
    withDrawalAmount: '---',
    depositAmount: '245.78',
    balance: '1109.82',
  },
  {
    sno: '25',
    transactionDate: '18/03/2024',
    transctionRemarks:
      'VIN/BLINKIT/202403031436/4063-09545745/Phone pe/Blinkit',
    withDrawalAmount: '314.45',
    depositAmount: '---',
    balance: '1109.82',
  },
  {
    sno: '26',
    transactionDate: '18/03/2024',
    transctionRemarks:
      'VIN/BLINKIT/202403031436/4063-09545745/Phone pe/Blinkit',
    withDrawalAmount: '---',
    depositAmount: '998.76',
    balance: '1109.82',
  },
  {
    sno: '27',
    transactionDate: '18/03/2024',
    transctionRemarks:
      'VIN/BLINKIT/202403031436/4063-09545745/Phone pe/Blinkit',
    withDrawalAmount: '314.45',
    depositAmount: '---',
    balance: '1109.82',
  },
  {
    sno: '28',
    transactionDate: '18/03/2024',
    transctionRemarks:
      'VIN/BLINKIT/202403031436/4063-09545745/Phone pe/Blinkit',
    withDrawalAmount: '---',
    depositAmount: '876.90',
    balance: '1109.82',
  },
  {
    sno: '29',
    transactionDate: '18/03/2024',
    transctionRemarks:
      'VIN/BLINKIT/202403031436/4063-09545745/Phone pe/Blinkit',
    withDrawalAmount: '314.45',
    depositAmount: '---',
    balance: '1109.82',
  },
  {
    sno: '30',
    transactionDate: '18/03/2024',
    transctionRemarks:
      'VIN/BLINKIT/202403031436/4063-09545745/Phone pe/Blinkit',
    withDrawalAmount: '---',
    depositAmount: '342.76',
    balance: '1109.82',
  },
  {
    sno: '31',
    transactionDate: '18/03/2024',
    transctionRemarks:
      'VIN/BLINKIT/202403031436/4063-09545745/Phone pe/Blinkit',
    withDrawalAmount: '314.45',
    depositAmount: '---',
    balance: '1109.82',
  },
  {
    sno: '32',
    transactionDate: '18/03/2024',
    transctionRemarks:
      'VIN/BLINKIT/202403031436/4063-09545745/Phone pe/Blinkit',
    withDrawalAmount: '---',
    depositAmount: '234.67',
    balance: '1109.82',
  },
  {
    sno: '33',
    transactionDate: '18/03/2024',
    transctionRemarks:
      'VIN/BLINKIT/202403031436/4063-09545745/Phone pe/Blinkit',
    withDrawalAmount: '314.45',
    depositAmount: '---',
    balance: '1109.82',
  },
  {
    sno: '34',
    transactionDate: '18/03/2024',
    transctionRemarks:
      'VIN/BLINKIT/202403031436/4063-09545745/Phone pe/Blinkit',
    withDrawalAmount: '---',
    depositAmount: '888.98',
    balance: '1109.82',
  },
  {
    sno: '35',
    transactionDate: '18/03/2024',
    transctionRemarks:
      'VIN/BLINKIT/202403031436/4063-09545745/Phone pe/Blinkit',
    withDrawalAmount: '314.45',
    depositAmount: '---',
    balance: '1109.82',
  },
  {
    sno: '36',
    transactionDate: '18/03/2024',
    transctionRemarks:
      'VIN/BLINKIT/202403031436/4063-09545745/Phone pe/Blinkit',
    withDrawalAmount: '---',
    depositAmount: '564.87',
    balance: '1109.82',
  },
  {
    sno: '37',
    transactionDate: '18/03/2024',
    transctionRemarks:
      'VIN/BLINKIT/202403031436/4063-09545745/Phone pe/Blinkit',
    withDrawalAmount: '314.45',
    depositAmount: '---',
    balance: '1109.82',
  },
  {
    sno: '38',
    transactionDate: '18/03/2024',
    transctionRemarks:
      'VIN/BLINKIT/202403031436/4063-09545745/Phone pe/Blinkit',
    withDrawalAmount: '---',
    depositAmount: '998.90',
    balance: '1109.82',
  },
  {
    sno: '39',
    transactionDate: '18/03/2024',
    transctionRemarks:
      'VIN/BLINKIT/202403031436/4063-09545745/Phone pe/Blinkit',
    withDrawalAmount: '314.45',
    depositAmount: '---',
    balance: '1109.82',
  },
  {
    sno: '40',
    transactionDate: '18/03/2024',
    transctionRemarks:
      'VIN/BLINKIT/202403031436/4063-09545745/Phone pe/Blinkit',
    withDrawalAmount: '---',
    depositAmount: '444.56',
    balance: '1109.82',
  },
  {
    sno: '41',
    transactionDate: '18/03/2024',
    transctionRemarks:
      'VIN/BLINKIT/202403031436/4063-09545745/Phone pe/Blinkit',
    withDrawalAmount: '314.45',
    depositAmount: '---',
    balance: '1109.82',
  },
  {
    sno: '42',
    transactionDate: '18/03/2024',
    transctionRemarks:
      'VIN/BLINKIT/202403031436/4063-09545745/Phone pe/Blinkit',
    withDrawalAmount: '---',
    depositAmount: '766.76',
    balance: '1109.82',
  },
  {
    sno: '43',
    transactionDate: '18/03/2024',
    transctionRemarks:
      'VIN/BLINKIT/202403031436/4063-09545745/Phone pe/Blinkit',
    withDrawalAmount: '314.45',
    depositAmount: '---',
    balance: '1109.82',
  },
  {
    sno: '44',
    transactionDate: '18/03/2024',
    transctionRemarks:
      'VIN/BLINKIT/202403031436/4063-09545745/Phone pe/Blinkit',
    withDrawalAmount: '---',
    depositAmount: '877.90',
    balance: '1109.82',
  },
  {
    sno: '45',
    transactionDate: '18/03/2024',
    transctionRemarks:
      'VIN/BLINKIT/202403031436/4063-09545745/Phone pe/Blinkit',
    withDrawalAmount: '314.45',
    depositAmount: '---',
    balance: '1109.82',
  },
  {
    sno: '46',
    transactionDate: '18/03/2024',
    transctionRemarks:
      'VIN/BLINKIT/202403031436/4063-09545745/Phone pe/Blinkit',
    withDrawalAmount: '---',
    depositAmount: '867.90',
    balance: '1109.82',
  },
  {
    sno: '47',
    transactionDate: '18/03/2024',
    transctionRemarks:
      'VIN/BLINKIT/202403031436/4063-09545745/Phone pe/Blinkit',
    withDrawalAmount: '314.45',
    depositAmount: '---',
    balance: '1109.82',
  },
  {
    sno: '48',
    transactionDate: '18/03/2024',
    transctionRemarks:
      'VIN/BLINKIT/202403031436/4063-09545745/Phone pe/Blinkit',
    withDrawalAmount: '---',
    depositAmount: '988.78',
    balance: '1109.82',
  },
  {
    sno: '49',
    transactionDate: '18/03/2024',
    transctionRemarks:
      'VIN/BLINKIT/202403031436/4063-09545745/Phone pe/Blinkit',
    withDrawalAmount: '314.45',
    depositAmount: '---',
    balance: '1109.82',
  },
  {
    sno: '50',
    transactionDate: '18/03/2024',
    transctionRemarks:
      'VIN/BLINKIT/202403031436/4063-09545745/Phone pe/Blinkit',
    withDrawalAmount: '---',
    depositAmount: '765.89',
    balance: '1109.82',
  },
  {
    sno: '51',
    transactionDate: '18/03/2024',
    transctionRemarks:
      'VIN/BLINKIT/202403031436/4063-09545745/Phone pe/Blinkit',
    withDrawalAmount: '314.45',
    depositAmount: '---',
    balance: '1109.82',
  },
  {
    sno: '52',
    transactionDate: '18/03/2024',
    transctionRemarks:
      'VIN/BLINKIT/202403031436/4063-09545745/Phone pe/Blinkit',
    withDrawalAmount: '---',
    depositAmount: '244.87',
    balance: '1109.82',
  },
  {
    sno: '53',
    transactionDate: '18/03/2024',
    transctionRemarks:
      'VIN/BLINKIT/202403031436/4063-09545745/Phone pe/Blinkit',
    withDrawalAmount: '314.45',
    depositAmount: '---',
    balance: '1109.82',
  },
  {
    sno: '54',
    transactionDate: '18/03/2024',
    transctionRemarks:
      'VIN/BLINKIT/202403031436/4063-09545745/Phone pe/Blinkit',
    withDrawalAmount: '---',
    depositAmount: '988.87',
    balance: '1109.82',
  },
  {
    sno: '55',
    transactionDate: '18/03/2024',
    transctionRemarks:
      'VIN/BLINKIT/202403031436/4063-09545745/Phone pe/Blinkit',
    withDrawalAmount: '314.45',
    depositAmount: '---',
    balance: '1109.82',
  },
  {
    sno: '56',
    transactionDate: '18/03/2024',
    transctionRemarks:
      'VIN/BLINKIT/202403031436/4063-09545745/Phone pe/Blinkit',
    withDrawalAmount: '---',
    depositAmount: '445.89',
    balance: '1109.82',
  },
  {
    sno: '57',
    transactionDate: '18/03/2024',
    transctionRemarks:
      'VIN/BLINKIT/202403031436/4063-09545745/Phone pe/Blinkit',
    withDrawalAmount: '314.45',
    depositAmount: '---',
    balance: '1109.82',
  },
  {
    sno: '58',
    transactionDate: '18/03/2024',
    transctionRemarks:
      'VIN/BLINKIT/202403031436/4063-09545745/Phone pe/Blinkit',
    withDrawalAmount: '---',
    depositAmount: '887.56',
    balance: '1109.82',
  },
  {
    sno: '59',
    transactionDate: '18/03/2024',
    transctionRemarks:
      'VIN/BLINKIT/202403031436/4063-09545745/Phone pe/Blinkit',
    withDrawalAmount: '314.45',
    depositAmount: '---',
    balance: '1109.82',
  },
  {
    sno: '60',
    transactionDate: '18/03/2024',
    transctionRemarks:
      'VIN/BLINKIT/202403031436/4063-09545745/Phone pe/Blinkit',
    withDrawalAmount: '---',
    depositAmount: '344.68',
    balance: '1109.82',
  },
];

export const userviewByPeriod=['Last 7 Days', 'Last 14 Days'];

export const userviewByFormat=['PDF File', 'Excel Sheet'];
