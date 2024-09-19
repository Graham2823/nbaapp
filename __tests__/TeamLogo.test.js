// __tests__/getTeamLogo.test.js

import getTeamLogo from "@/utils/getLogo"; // Assuming your utility is here

jest.mock("../teams", () => [
  { teamName: "Memphis Grizzlies", teamLogo: "memphis-logo.png" },
  { teamName: "Milwaukee Bucks", teamLogo: "milwaukee-logo.png" },
]);

describe("getTeamLogo", () => {
  it("should return the correct logo for a valid team name", () => {
    const result = getTeamLogo("Memphis Grizzlies");
    expect(result).toBe("/../memphis-logo.png");
  });

  it("should return the correct logo for a team name with '-ps' suffix", () => {
    const result = getTeamLogo("Memphis Grizzlies-ps");
    expect(result).toBe("/../memphis-logo.png");
  });

  it("should return undefined and log 'Team not found' for an invalid team name", () => {
    console.log = jest.fn(); // Mock console.log
    const result = getTeamLogo("Invalid Team");
    expect(result).toBeUndefined();
    expect(console.log).toHaveBeenCalledWith("Team not found");
  });

  it("should return undefined if no team name is passed", () => {
    const result = getTeamLogo(null);
    expect(result).toBeUndefined();
  });
});
