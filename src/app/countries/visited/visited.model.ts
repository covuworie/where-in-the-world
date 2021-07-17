export default interface IVisited {
  year: number;
  countryName: string;
  durationDays: number;
}

export class Visited {
  constructor(
    public year: number,
    public countryName: string,
    public durationDays: number
  ) {}
}
