import { assembleMoonbird } from "../assemble";

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
