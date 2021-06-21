import ICurrency from './currency';
import ILanguage from './language';

export default interface ICountry {
  name: string;
  population: number;
  region: string;
  capital: string;
  flag: string;
  alpha3Code: string;
  nativeName?: string;
  subregion?: string;
  topLevelDomain?: string;
  callingCodes?: number[];
  timezones?: string[];
  borders?: string[];
  currencies?: { code: string; name: string; symbol: string }[];
  languages?: {
    iso639_1: string;
    iso639_2: string;
    name: string;
    nativeName: string;
  }[];
}

export class Country {
  constructor(
    public name: string,
    public population: number,
    public region: string,
    public capital: string,
    public flag: string,
    public alpha3Code: string,
    public nativeName?: string,
    public subregion?: string,
    public topLevelDomain?: string,
    public callingCodes?: number[],
    public timezones?: string[],
    public borders?: string[],
    public currencies?: ICurrency[],
    public languages?: ILanguage[]
  ) {}

  static fromRestCountry(restCountry: ICountry, all_fields = true) {
    if (all_fields) {
      const country = new Country(
        restCountry.name,
        restCountry.population,
        restCountry.region,
        restCountry.capital,
        restCountry.flag,
        restCountry.alpha3Code,
        restCountry.nativeName,
        restCountry.subregion,
        restCountry.topLevelDomain,
        restCountry.callingCodes,
        restCountry.timezones,
        restCountry.borders,
        restCountry.currencies,
        restCountry.languages
      );
      return country;
    }

    const country = new Country(
      restCountry.name,
      restCountry.population,
      restCountry.region,
      restCountry.capital,
      restCountry.flag,
      restCountry.alpha3Code
    );
    return country;
  }
}

export type Alpha3CodeToCountry = {
  [key: string]: { name: string; flag: string };
};
