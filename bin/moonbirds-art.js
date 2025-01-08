const { assembleMoonbird } = require("../dist/assemble");
const { generateRandomMoonbird } = require("../dist/randomizer");
const { getMoonbirdConfigById } = require("../dist/metadata");

const fs = require("fs");

(async () => {
  const randomMoonbird = await getMoonbirdConfigById(8807);
  console.log(randomMoonbird);
  const imageBuffer = await assembleMoonbird(randomMoonbird);

  fs.writeFileSync("./random-moonbird.png", imageBuffer);
  console.log("Random Moonbird generated as random-moonbird.png");
  console.log("Random Moonbirds traits: ", randomMoonbird);
})();
