import { assembleMoonbird } from "./assemble";
import { generateRandomMoonbird } from "./randomizer";
import { getMoonbirdConfigById } from "./metadata";

// Export the key functionalities
export { assembleMoonbird, generateRandomMoonbird, getMoonbirdConfigById }

export const generateAndSaveRandomMoonbird = async (filePath: string) => {
  const randomMoonbird = generateRandomMoonbird();
  const imageBuffer = await assembleMoonbird(randomMoonbird);
  const fs = require("fs");

  fs.writeFileSync(filePath, imageBuffer);
  console.log(`Generated and saved as ${filePath}`);
};
