import { generateRandomMoonbird } from "../randomizer";

describe("generateRandomMoonbird", () => {
  it("should return a valid Moonbird configuration", () => {
    const config = generateRandomMoonbird();

    // Check that all required traits exist
    expect(config).toHaveProperty("background");
    expect(config).toHaveProperty("beak");
    expect(config).toHaveProperty("body");
    expect(config).toHaveProperty("eyes");
    expect(config).toHaveProperty("eyewear");
    expect(config).toHaveProperty("headwear");
    expect(config).toHaveProperty("outerwear");

    // Example of additional checks:
    expect(config.background).not.toBeUndefined();
    expect(config.headwear).not.toBeUndefined();
  });
});
