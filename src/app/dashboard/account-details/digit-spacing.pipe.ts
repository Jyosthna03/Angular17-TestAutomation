import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'digitSpacing',
  standalone: true
})
export class DigitSpacingPipe implements PipeTransform {

  transform(value: string): string {
    return value.replace(/(\d{4})/g, '$1 ');
  }

}
