import ICurrency from './currency';
import ILanguage from './language';

export default interface ICountry {
  numericCode: number;
  name: string;
  population: number;
  region: string;
  capital: string;
  flag: string;
  alpha3Code: string;
  nativeName: string;
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
  static fromRestCountry(restCountry: ICountry, all_fields = true) {
    if (all_fields) {
      const country = new Country(
        restCountry.numericCode,
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
      restCountry.numericCode,
      restCountry.name,
      restCountry.population,
      restCountry.region,
      restCountry.capital,
      restCountry.flag,
      restCountry.alpha3Code,
      restCountry.nativeName
    );
    return country;
  }

  private constructor(
    public numericCode: number,
    public name: string,
    public population: number,
    public region: string,
    public capital: string,
    public flag: string,
    public alpha3Code: string,
    public nativeName: string,
    public subregion?: string,
    public topLevelDomain?: string,
    public callingCodes?: number[],
    public timezones?: string[],
    public borders?: string[],
    public currencies?: ICurrency[],
    public languages?: ILanguage[]
  ) {}
}

export type Alpha3CodeToCountry = {
  [key: string]: { name: string; flag: string };
};

export const simpleFields = [
  'numericCode',
  'name',
  'population',
  'region',
  'capital',
  'flag',
  'alpha3Code',
  'nativeName',
];
