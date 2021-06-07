export interface ICountry {
  name: string;
  population: number;
  region: string;
  capital: string;
  flag: string;
}

export class Country {
  constructor(
    public name: string,
    public population: number,
    public region: string,
    public capital: string,
    public flag: string
  ) {}
}
