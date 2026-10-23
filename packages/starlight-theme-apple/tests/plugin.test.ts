import { describe, expect, test } from "bun:test";
import starlightThemeApple from "../index";

type Updates = Record<string, any>;

function setup(config: Record<string, unknown>, options?: Parameters<typeof starlightThemeApple>[0]) {
  const updates: Updates = {};
  const plugin = starlightThemeApple(options);
  (plugin.hooks["config:setup"] as Function)({
    config,
    updateConfig: (update: Updates) => Object.assign(updates, update),
    addIntegration: () => {},
  });
  return updates;
}

describe("plugin", () => {
  test("provides components without replacing consumer overrides", () => {
    const { components } = setup({ components: { PageTitle: "./src/MyTitle.astro" } });
    expect(components.PageTitle).toBe("./src/MyTitle.astro");
    expect(components.Header).toEndWith("components/Header.astro");
    expect(components.Footer).toEndWith("components/Footer.astro");
  });

  test("loads theme CSS before consumer CSS", () => {
    const { customCss } = setup({ customCss: ["./src/custom.css"] });
    expect(customCss).toEqual(["starlight-theme-apple/styles.css", "./src/custom.css"]);
  });

  test("merges Expressive Code options beneath the consumer's", () => {
    const { expressiveCode } = setup({
      expressiveCode: { themes: ["github-dark"], styleOverrides: { borderRadius: "0", frames: { shadowColor: "red" } } },
    });
    expect(expressiveCode.themes).toEqual(["github-dark"]);
    expect(expressiveCode.styleOverrides.borderRadius).toBe("0");
    expect(expressiveCode.styleOverrides.frames.shadowColor).toBe("red");
    expect(expressiveCode.styleOverrides.frames.editorTabBarBorderBottomColor).toBeDefined();
    expect(setup({ expressiveCode: false }).expressiveCode).toBe(false);
  });

  test("rejects invalid options with a readable error", () => {
    expect(() => starlightThemeApple({ nav: [{ label: "", link: "/" }] })).toThrow(/nav\.0\.label/);
  });
});
