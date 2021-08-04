import { Pipe, PipeTransform } from '@angular/core';
import ICurrency from 'src/app/models/currency.model';

@Pipe({
  name: 'currenciesToNameSymbol',
})
export class CurrenciesToNameSymbolPipe implements PipeTransform {
  transform(currencies: ICurrency[] | undefined) {
    if (currencies === undefined) {
      return '';
    }
    const currencyNamesAndSymbols: string[] = [];
    for (const currency of currencies) {
      currencyNamesAndSymbols.push(`${currency.name} (${currency.symbol})`);
    }
    return currencyNamesAndSymbols.join(', ');
  }
}
