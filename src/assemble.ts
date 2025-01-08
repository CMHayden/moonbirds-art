import sharp from "sharp";
import path from "path";

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
  const basePath = path.join(__dirname, "../assets");

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
