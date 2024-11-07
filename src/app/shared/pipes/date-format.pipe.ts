import { Pipe, PipeTransform } from '@angular/core';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

@Pipe({
  name: 'dateFormat',
})
export class DateFormatPipe implements PipeTransform {
  transform(
    value: Date | string | number,
    formatString: string = 'yyyy-MM-dd'
  ): string {
    const date = value instanceof Date ? value : new Date(value);
    if (!date.getTime()) {
      console.log('Invalid date provided to customDateFormat');
      return '';
    }

    return format(date, formatString, {locale: fr});
  }
}
