
export const getRandomInRange = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const feetToMeters = (input: string): number | null => {
  const match = input.match(/(\d+(\.\d+)?)\s*ft\.?/i);
  
  if (!match) return null;

  const feet = parseFloat(match[1]);
  const meters = feet * 0.3048;

  return roundToDecimalPlaces(meters, 1);
}

export const roundToDecimalPlaces = (num: number, decimalPlaces: number): number => {
  const factor = Math.pow(10, decimalPlaces);
  return Math.round(num * factor) / factor;
}
