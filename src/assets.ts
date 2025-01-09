import fs from 'fs';
import path from 'path';

export const getAvailableAssets = () => {
  const basePath = path.join(__dirname, "../assets");

  const assets = {
    background: fs.readdirSync(`${basePath}/background`),
    body: fs.readdirSync(`${basePath}/body`),
    beak: fs.readdirSync(`${basePath}/beak`),
    outerwear: fs.readdirSync(`${basePath}/outerwear`),
    headwear: fs.readdirSync(`${basePath}/headwear`),
    eyes: fs.readdirSync(`${basePath}/eyes`),
    eyewear: fs.readdirSync(`${basePath}/eyewear`),
  };

  return assets;
};