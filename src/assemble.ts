import { fileURLToPath } from "url";
import path from "path";
import sharp from "sharp";

// Define the headwearWithoutEars array
const headwearWithoutEars = [
  "Aviator's Cap",
  "Backwards Hat",
  "Baker Boy",
  "Beanie",
  "Beret",
  "Biker Hat",
  "Blue Backwards Hat",
  "Blue Witch's Hat",
  "Bucket Hat",
  "Captain's Cap",
  "Cowboy Hat",
  "Durag",
  "Forest Ranger",
  "Green Backwards Hat",
  "Head Wrap",
  "Hero's Cap",
  "Leprechaun's Hat",
  "Lincoln",
  "Miner",
  "Moon Hat",
  "Mushroom Cap",
  "Pink Witch's Hat",
  "Pirate's Hat",
  "Police Hat",
  "Queen's Crown",
  "Skull Cap",
  "Top Hat",
  "Trucker Hat",
  "Witch's Hat",
  "Wizard's Hat (Jade)",
  "Wizard's Hat",
];

export interface MoonbirdConfig {
  background: string;
  beak: string;
  body: string;
  eyes: string;
  eyewear: string;
  headwear: string;
  outerwear: string;
}

export const assembleMoonbird = async (
  config: MoonbirdConfig
): Promise<Buffer> => {
  const basePath = path.resolve(process.cwd(), "node_modules/moonbirds-art/dist/assets");

  // Conditional logic for body selection based on headwear
  const bodyImage = headwearWithoutEars.includes(config.headwear)
    ? `${basePath}/body/WithHat/${config.body}.png` // Use WithHat body if headwear is in the array
    : `${basePath}/body/${config.body}.png`; // Otherwise, use regular body

  // Define layers to be used for composition
  const layers = [
    `${basePath}/background/${config.background}.png`,
    bodyImage, // Use the selected body image
    `${basePath}/beak/${config.beak}.png`,
    `${basePath}/outerwear/${config.outerwear}.png`,
    `${basePath}/headwear/${config.headwear}.png`,
    `${basePath}/eyes/${config.eyes}.png`,
    `${basePath}/eyewear/${config.eyewear}.png`,
  ].filter(Boolean) as string[];

  // Prepare layers for sharp composition
  const compositeLayers = layers.map((input) => ({ input }));

  // Return the composed image buffer
  return sharp(layers[0]).composite(compositeLayers.slice(1)).toBuffer();
};

export const generateBatchMoonbirds = async (configs: MoonbirdConfig[]) => {
  const results = [];

  for (const config of configs) {
    try {
      const imageBuffer = await assembleMoonbird(config);
      const base64Image = imageBuffer.toString("base64");
      results.push({ config, base64Image });
    } catch (error) {
      const e = error as Error;
      console.error(`Error generating Moonbird for config ${JSON.stringify(config)}: ${e.message}`);
    }
  }

  return results;
};