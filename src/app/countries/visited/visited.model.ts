export default interface IVisited {
  id: number;
  year: number;
  country: string;
  duration: number;
}

export class Visited {
  private constructor(
    public id: number,
    public year: number,
    public country: string,
    public duration: number
  ) {}

  static fromObject(visit: IVisited) {
    return new Visited(visit.id, visit.year, visit.country, visit.duration);
  }
}
