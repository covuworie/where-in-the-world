import { Pipe, PipeTransform } from '@angular/core';
import ICurrency from './currency';

@Pipe({
  name: 'currenciesToNameSymbol',
})
export class CurrenciesToNameSymbolPipe implements PipeTransform {
  transform(currencies: ICurrency[]) {
    const currencyNamesAndSymbols: string[] = [];
    for (const currency of currencies) {
      currencyNamesAndSymbols.push(`${currency.name} (${currency.symbol})`);
    }
    return currencyNamesAndSymbols.join(', ');
  }
}