import { act, renderHook } from "@testing-library/react";

import type { ReactNode } from "react";

import { TranslationProvider, useTranslation } from "../TranslationContext";

describe("useTranslation Hook", () => {
  // Mock localStorage
  const localStorageMock = (() => {
    let store: Record<string, string> = {};

    return {
      getItem: (key: string) => store[key] ?? null,
      setItem: (key: string, value: string) => {
        store[key] = value;
      },
      clear: () => {
        store = {};
      },
    };
  })();

  beforeEach(() => {
    Object.defineProperty(window, "localStorage", {
      value: localStorageMock,
      writable: true,
    });
    localStorageMock.clear();
  });

  const wrapper = ({ children }: { children: ReactNode }) => (
    <TranslationProvider>{children}</TranslationProvider>
  );

  it("should throw error when used outside provider", () => {
    // Suppress console.error for this test
    const consoleSpy = jest.spyOn(console, "error").mockImplementation();

    expect(() => {
      renderHook(() => useTranslation());
    }).toThrow("useTranslation must be used within a TranslationProvider");

    consoleSpy.mockRestore();
  });

  it("should return default locale as 'en'", () => {
    const { result } = renderHook(() => useTranslation(), { wrapper });
    expect(result.current.locale).toBe("en");
  });

  it("should translate keys correctly in English", () => {
    const { result } = renderHook(() => useTranslation(), { wrapper });
    expect(result.current.t("Dashboard")).toBe("Dashboard");
    expect(result.current.t("Budget Management")).toBe("Budget Management");
  });

  it("should change locale to Japanese", () => {
    const { result } = renderHook(() => useTranslation(), { wrapper });

    act(() => {
      result.current.setLocale("ja");
    });

    expect(result.current.locale).toBe("ja");
  });

  it("should translate keys correctly in Japanese", () => {
    const { result } = renderHook(() => useTranslation(), { wrapper });

    act(() => {
      result.current.setLocale("ja");
    });

    expect(result.current.t("Dashboard")).toBe("ダッシュボード");
    expect(result.current.t("Budget Management")).toBe("予算管理");
  });

  it("should save locale to localStorage", () => {
    const { result } = renderHook(() => useTranslation(), { wrapper });

    act(() => {
      result.current.setLocale("ja");
    });

    expect(localStorage.getItem("locale")).toBe("ja");
  });

  it("should return key as fallback for missing translations", () => {
    const { result } = renderHook(() => useTranslation(), { wrapper });

    // @ts-expect-error - Testing with invalid key
    const translation = result.current.t("NonExistentKey");
    expect(translation).toBe("NonExistentKey");
  });
});
