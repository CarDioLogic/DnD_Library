export const HABITATS = [
  "Arctic",
  "Coastal",
  "Desert",
  "Forest",
  "Grassland",
  "Hill",
  "Mountain",
  "Planar (Abyss)",
  "Planar (Acheron)",
  "Planar (Astral Plane)",
  "Planar (Beastlands)",
  "Planar (Elemental Chaos)",
  "Planar (Elemental Plane of Air)",
  "Planar (Elemental Plane of Earth)",
  "Planar (Elemental Plane of Fire)",
  "Planar (Elemental Plane of Water)",
  "Planar (Elemental Planes)",
  "Planar (Ethereal Plane)",
  "Planar (Feywild)",
  "Planar (Gehenna)",
  "Planar (Limbo)",
  "Planar (Lower Planes)",
  "Planar (Mechanus)",
  "Planar (Nine Hells)",
  "Planar (Shadowfell)",
  "Planar (Upper Planes)",
  "Swamp",
  "Underdark",
  "Underwater",
  "Urban",
] as const;

export type Habitat = typeof HABITATS[number];

export const HABITAT_TO_SLUG = Object.fromEntries(
  HABITATS.map((h) => [
    h,
    h
      .toLowerCase()
      .replace(/[()]/g, "")
      .replace(/\s+/g, "-"),
  ])
) as Record<Habitat, string>;

export type HabitatSlug = (typeof HABITAT_TO_SLUG)[Habitat];