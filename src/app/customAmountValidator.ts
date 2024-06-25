import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';

export function amountLimitValidator(availableBalance: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const amount = control.value;
    if (amount > 20000) {
      return { amountLimitExceeded: true };
    }
    if (amount > availableBalance) {
        return { insufficientFunds: true };
      }
    return null;
  };
}

export function insufficientFunds(availableBalance: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const amount = control.value;
    if (amount > availableBalance) {
        return { insufficientFunds: true };
      }
    return null;
  };
}
