import { MoonbirdConfig, assembleMoonbird, generateBatchMoonbirds } from "../assemble";

type Result = {
  config: MoonbirdConfig; // The input configuration used to generate the Moonbird
  base64Image: string;    // The base64 string representation of the Moonbird image
};

// Sample assets to use in the test
const validConfigs: MoonbirdConfig[] = [
  {
    background: "Cosmic",
    body: "Brave - Black",
    beak: "Long - Golden",
    outerwear: "Hoodie",
    headwear: "Top Hat",
    eyes: "Discerning - Blue",
    eyewear: "None",
  },
  {
    background: "Gray",
    body: "Crescent - Red",
    beak: "Short - Skeleton",
    outerwear: "None",
    headwear: "Beanie",
    eyes: "Diamond - Epic",
    eyewear: "3D Glasses",
  },
];

const invalidConfigs: MoonbirdConfig[] = [
  {
    background: "Nonexistent",
    body: "Brave - Black",
    beak: "Long - Golden",
    outerwear: "Hoodie",
    headwear: "Top Hat",
    eyes: "Discerning - Blue",
    eyewear: "None",
  },
  {
    background: "Gray",
    body: "Crescent - Red",
    beak: "Nonexistent",
    outerwear: "None",
    headwear: "Beanie",
    eyes: "Diamond - Epic",
    eyewear: "3D Glasses",
  },
];

describe('generateBatchMoonbirds', () => {
  it('should generate base64 images for valid configs', async () => {
    const results = await generateBatchMoonbirds(validConfigs);

    // Ensure the length matches the number of valid configs
    expect(results).toHaveLength(validConfigs.length);

    // Validate each result contains a base64 image string
    results.forEach((result: Result, index: number) => {
      expect(result.config).toEqual(validConfigs[index]);
      expect(result.base64Image).toMatch(/^([A-Za-z0-9+/=]+)$/); // Simple regex for base64
    });
  });

  it('should handle invalid configs gracefully', async () => {
    const results = await generateBatchMoonbirds(invalidConfigs);

    // Since invalid configs should log errors but not crash, results will be empty
    expect(results).toHaveLength(0);
  });

  it('should handle a mix of valid and invalid configs', async () => {
    const mixedConfigs = [...validConfigs, ...invalidConfigs];
    const results = await generateBatchMoonbirds(mixedConfigs);

    // Results should contain only the valid configs
    expect(results).toHaveLength(validConfigs.length);

    // Validate each result contains a base64 image string for valid configs
    results.forEach((result: Result, index: number) => {
      expect(result.config).toEqual(validConfigs[index]);
      expect(result.base64Image).toMatch(/^([A-Za-z0-9+/=]+)$/); // Simple regex for base64
    });
  });
});

describe("assembleMoonbird", () => {
  it("should return an image buffer for valid traits", async () => {
    const config = {
      background: "Green",
      beak: "Short - Orange",
      body: "Crescent - Black",
      eyes: "Open - White",
      eyewear: "None",
      headwear: "Witch's Hat",
      outerwear: "None",
    };

    const buffer = await assembleMoonbird(config);

    // Assert that the buffer is a valid non-empty Buffer object
    expect(Buffer.isBuffer(buffer)).toBe(true);
    expect(buffer.length).toBeGreaterThan(0);
  });

  it("should throw an error if a layer image is missing", async () => {
    const invalidConfig = {
      background: "NonexistentBackground",
      beak: "Short - Gray",
      body: "Crescent - Brown",
      eyes: "Angry - Red",
      eyewear: "None",
      headwear: "Cowboy Hat",
      outerwear: "None",
    };

    await expect(assembleMoonbird(invalidConfig)).rejects.toThrow(
      "Input file is missing"
    );
  });
});
