// Assuming the getAvailableAssets function looks something like this:
import { getAvailableAssets } from "../assets";

describe("getAvailableAssets", () => {
  it("should return a correctly structured object with layer names as keys and asset lists as values", () => {
    const availableAssets = getAvailableAssets();

    expect(availableAssets).toHaveProperty("background");
    expect(availableAssets).toHaveProperty("body");
    expect(availableAssets).toHaveProperty("headwear");
    expect(availableAssets).toHaveProperty("eyes");

    expect(availableAssets.background).toContain("Cosmic.png");
    expect(availableAssets.body).toContain("Brave - Black.png");
    expect(availableAssets.headwear).toContain("Bow.png");
    expect(availableAssets.eyes).toContain("Fire - Epic.png");
  });
});
