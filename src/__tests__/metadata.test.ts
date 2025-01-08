import { getMoonbirdConfigById } from "../metadata";

describe("getMoonbirdConfigById", () => {
  it("should return the correct config for a valid ID", async () => {
    const id = 8807; // Shout out my bird, best in the collection
    const expectedConfig = {
      background: "Green",
      beak: "Short - Orange",
      body: "Crescent - Black",
      eyes: "Open - White",
      eyewear: "None",
      headwear: "Witch's Hat",
      outerwear: "None",
    };
    const config = await getMoonbirdConfigById(id);
    expect(config).toEqual(expectedConfig);
  });

  it("should throw an error for an invalid ID", async () => {
    const invalidId = 99999;
    await expect(getMoonbirdConfigById(invalidId)).rejects.toThrow(
      "Moonbird with id 99999 not found."
    );
  });
});
