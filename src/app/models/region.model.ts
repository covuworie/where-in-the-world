export type Region =
  | 'Africa'
  | 'Americas'
  | 'Asia'
  | 'Europe'
  | 'Oceania'
  | 'Polar';
const REGIONS: Set<Region> = new Set([
  'Africa',
  'Americas',
  'Asia',
  'Europe',
  'Oceania',
  'Polar',
]);
export const SORTED_REGIONS = Array.from(REGIONS).sort();
