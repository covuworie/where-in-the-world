import { Pipe, PipeTransform } from '@angular/core';
import ILanguage from './language';

@Pipe({
  name: 'languagesToNames',
})
export class LanguagesToNamePipe implements PipeTransform {
  transform(languages: ILanguage[]) {
    const languageNames: string[] = [];
    for (const language of languages) {
      languageNames.push(language.name);
    }
    return languageNames.join(', ');
  }
}
