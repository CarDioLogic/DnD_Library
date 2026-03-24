// Returns a random integer between min and max (inclusive)
export const getRandomInRange = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Converts a string containing feet (e.g., "30 ft.") to meters (rounded to 1 decimal)
// Returns null if no valid feet value is found
export const feetToMeters = (input: string): number | null => {
  const match = input.match(/(\d+(\.\d+)?)\s*ft\.?/i);
  
  if (!match) return null;

  const feet = parseFloat(match[1]);
  const meters = feet * 0.3048;

  return roundToDecimalPlaces(meters, 1);
};

// Rounds a number to a specified number of decimal places
export const roundToDecimalPlaces = (num: number, decimalPlaces: number): number => {
  const factor = Math.pow(10, decimalPlaces);
  return Math.round(num * factor) / factor;
};

// Calculates and formats an ability modifier from a score (e.g., 15 → "+2")
export const formatAbilityModifier = (score:number) => {
  const mod = Math.floor((score - 10) / 2);
  return mod >= 0 ? `+${mod}` : mod;
}

// Formats armor class entries into a readable string (e.g., "17 (natural), 12 (armor)")
export const formatArmorClass = (acArray:array) => {
  return acArray
    .map(ac => {
      let label = ac.type;
      return `${ac.value} (${label})`;
    })
    .join(", ");
}

// Formats proficiency entries into a readable string (e.g., "Perception (+4)")
export const formatProficiencies = (profArray:array) => {
  return profArray
    .map(pf => {
      let value = pf.value;
      return `${pf.proficiency.name} (${value})`;
    })
    .join(", ");
}

// Formats senses object into a readable string, skipping null values
// (e.g., "darkvision (60), passive perception (12)")
export const formatSenses = (sensesObj: Record<string, number | null>) => {
  return Object.entries(sensesObj)
    .filter(([_, value]) => value != null)
    .map(([key, value]) => {
      const label = key.replace(/_/g, " ");
      return `${label} (${value})`;
    })
    .join(", ");
};