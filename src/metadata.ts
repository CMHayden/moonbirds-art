import metadata from "../assets/metadata.json"; 
import { MoonbirdConfig } from "./assemble";
import { getAvailableAssets } from "./assets";

// A function to fetch a moonbird config
export const getMoonbirdConfigById = async (id: number) => {
  // Find the moonbird by ID
  const moonbird = metadata.find((item) => item.id === id);

  if (!moonbird) {
    throw new Error(`Moonbird with id ${id} not found.`);
  } else {
    // Return a config object
    return {
      background: moonbird.Background,
      beak: moonbird.Beak,
      body: `${moonbird.Body} - ${moonbird.Feathers}`, // Combine body and feathers
      eyes: moonbird.Eyes,
      eyewear: moonbird.Eyewear,
      headwear: moonbird.Headwear,
      outerwear: moonbird.Outerwear,
    };
  }
};

export const validateConfig = (config: MoonbirdConfig) => {
  const availableAssets = getAvailableAssets();

  const valid = Object.keys(config).every((key) => {
    const layerName = key as keyof MoonbirdConfig;  // Assert that key is a valid MoonbirdConfig key
    const assetName = config[layerName];  // Now TypeScript knows config[layerName] is a string
    return availableAssets[layerName]?.includes(`${assetName}.png`);
  });

  if (!valid) {
    throw new Error("Invalid configuration: One or more assets are not valid.");
  }

  return true;
};
