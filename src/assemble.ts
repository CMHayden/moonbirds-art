import sharp from 'sharp';
import path from 'path';

export interface MoonbirdConfig {
  background: string;
  beak: string;
  body: string;
  eyes: string;
  eyewear: string;
  headwear: string;
  outerwear: string;
}

const basePath = path.join(__dirname, '../assets');

export const assembleMoonbird = async (config: MoonbirdConfig): Promise<Buffer> => {
  const layers = [
    `${basePath}/background/${config.background}.png`,
    `${basePath}/body/${config.body}.png`,
    `${basePath}/beak/${config.beak}.png`,
    `${basePath}/outerwear/${config.outerwear}.png`,
    `${basePath}/headwear/${config.headwear}.png`,
    `${basePath}/eyes/${config.eyes}.png`,
    `${basePath}/eyewear/${config.eyewear}.png`,

  ].filter(Boolean) as string[];

  const compositeLayers = layers.map((input) => ({ input }));

  return sharp(layers[0])
    .composite(compositeLayers.slice(1))
    .toBuffer();
};
