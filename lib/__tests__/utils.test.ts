import { cn } from "@/lib/utils";

describe("cn utility function", () => {
  it("should merge class names correctly", () => {
    const result = cn("bg-red-500", "text-white");
    expect(result).toBe("bg-red-500 text-white");
  });

  it("should handle conditional classes", () => {
    const isActive = true;
    const result = cn("base-class", isActive && "active-class");
    expect(result).toBe("base-class active-class");
  });

  it("should filter out falsy values", () => {
    const result = cn("valid-class", false, null, undefined, "another-class");
    expect(result).toBe("valid-class another-class");
  });

  it("should handle empty input", () => {
    const result = cn();
    expect(result).toBe("");
  });

  it("should override conflicting tailwind classes", () => {
    // tailwind-merge should keep the last value
    const result = cn("p-4", "p-8");
    expect(result).toBe("p-8");
  });

  it("should handle array of classes", () => {
    const result = cn(["class-1", "class-2"], "class-3");
    expect(result).toBe("class-1 class-2 class-3");
  });
});
