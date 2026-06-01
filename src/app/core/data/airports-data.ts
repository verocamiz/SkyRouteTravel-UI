export interface AirportsData {
  code: string;
  city: string;
  country: string;
}
export const AIRPORTS: AirportsData[] = [
  { code: 'EZE', city: 'Buenos Aires', country: 'AR' },
  { code: 'AEP', city: 'Buenos Aires', country: 'AR' },
  { code: 'COR', city: 'Córdoba', country: 'AR' },
  { code: 'MDZ', city: 'Mendoza', country: 'AR' },
  { code: 'MIA', city: 'Miami', country: 'US' },
  { code: 'JFK', city: 'New York', country: 'US' },
  { code: 'GRU', city: 'São Paulo', country: 'BR' },
];

export function isInternationalRoute(originCode: string, destinationCode: string): boolean {
  const origin = AIRPORTS.find((a) => a.code === originCode);
  const destination = AIRPORTS.find((a) => a.code === destinationCode);
  if (!origin || !destination) {
    return false;
  }
  return origin.country !== destination.country;
}
