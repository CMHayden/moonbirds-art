import { assembleMoonbird, MoonbirdConfig, generateBatchMoonbirds } from "./assemble.js";
import { generateRandomMoonbird } from "./randomizer.js";
import { getMoonbirdConfigById, validateConfig } from "./metadata.js";
import { getAvailableAssets } from "./assets.js";

// Export the key functionalities
export { assembleMoonbird, generateRandomMoonbird, getMoonbirdConfigById, generateBatchMoonbirds, getAvailableAssets, validateConfig, MoonbirdConfig };

export const generateAndSaveRandomMoonbirdBase64 = async () => {
  const randomMoonbird = generateRandomMoonbird();
  const imageBuffer = await assembleMoonbird(randomMoonbird);

  console.log(`Random Moonbird image returned as base64.`);
  return `data:image/png;base64,${imageBuffer.toString("base64")}`;
};

export const generateAndSaveMoonbirdByIDBase64 = async (id: number) => {
  try {
    // Fetch the Moonbird configuration by ID
    const moonbirdByID = await getMoonbirdConfigById(id);

    if (!moonbirdByID) {
      throw new Error(`Moonbird with ID ${id} not found.`);
    }

    // Provide default values for undefined properties
    const completeMoonbirdConfig = {
      background: moonbirdByID.background || "None",
      beak: moonbirdByID.beak || "None",
      body: `${moonbirdByID.body || "None"}`,
      eyes: moonbirdByID.eyes || "None",
      eyewear: moonbirdByID.eyewear || "None",
      headwear: moonbirdByID.headwear || "None",
      outerwear: moonbirdByID.outerwear || "None",
    };

    // Assemble the Moonbird image with the updated configuration
    const imageBuffer = await assembleMoonbird(completeMoonbirdConfig);

    console.log(`Moonbird with ID ${id} image returned as base64.`);
    return `data:image/png;base64,${imageBuffer.toString("base64")}`;
  } catch (error) {
    const e = error as Error;
    console.error(`Error generating Moonbird: ${e.message}`);
  }
};
