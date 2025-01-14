import fs from "fs";
import path from "path";

export const getAvailableAssets = (): Record<string, string[]> => {
  // Resolve the path relative to the current directory (dist or built location)
  const basePath = path.resolve(process.cwd(), "node_modules/moonbirds-art/dist/assets");

  try {
    const assets = {
      background: fs.readdirSync(path.join(basePath, "background")),
      body: fs.readdirSync(path.join(basePath, "body")),
      beak: fs.readdirSync(path.join(basePath, "beak")),
      outerwear: fs.readdirSync(path.join(basePath, "outerwear")),
      headwear: fs.readdirSync(path.join(basePath, "headwear")),
      eyes: fs.readdirSync(path.join(basePath, "eyes")),
      eyewear: fs.readdirSync(path.join(basePath, "eyewear")),
    };

    return assets;
  } catch (err) {
    // Narrow the type of the error
    if (err instanceof Error) {
      throw new Error(`Failed to load assets from ${basePath}: ${err.message}`);
    } else {
      throw new Error(`Failed to load assets from ${basePath}: ${String(err)}`);
    }
  }
};
