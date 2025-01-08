import metadata from "../assets/metadata.json"; // Assuming the metadata is static and imported

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
