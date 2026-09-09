import type { StarlightPlugin } from "@astrojs/starlight/types";
import { fileURLToPath } from "node:url";

const doccLight = {
  name: "apple-docc-light",
  type: "light" as const,
  colors: {
    "editor.background": "#f5f5f7",
    "editor.foreground": "#000000",
  },
  settings: [
    { settings: { foreground: "#000000", background: "#f5f5f7" } },
    {
      scope: ["comment", "punctuation.definition.comment"],
      settings: { foreground: "#707f8c" },
    },
    {
      scope: ["keyword", "storage", "storage.type"],
      settings: { foreground: "#ad3da4" },
    },
    {
      scope: ["string", "string.quoted", "constant.other.symbol"],
      settings: { foreground: "#d12f1b" },
    },
    {
      scope: ["constant.numeric", "constant.character"],
      settings: { foreground: "#272ad8" },
    },
    {
      scope: ["entity.name.type", "entity.name.class", "support.type"],
      settings: { foreground: "#703daa" },
    },
    {
      scope: ["entity.name.function", "support.function", "variable.function"],
      settings: { foreground: "#4b21b0" },
    },
    {
      scope: ["entity.other.attribute-name", "variable.other.constant"],
      settings: { foreground: "#947100" },
    },
    {
      scope: ["meta.preprocessor", "keyword.control.directive"],
      settings: { foreground: "#78492a" },
    },
  ],
};

const doccDark = {
  name: "apple-docc-dark",
  type: "dark" as const,
  colors: {
    "editor.background": "#1c1c1e",
    "editor.foreground": "#ffffff",
  },
  settings: [
    { settings: { foreground: "#ffffff", background: "#1c1c1e" } },
    {
      scope: ["comment", "punctuation.definition.comment"],
      settings: { foreground: "#7f8c98" },
    },
    {
      scope: ["keyword", "storage", "storage.type"],
      settings: { foreground: "#ff7ab2" },
    },
    {
      scope: ["string", "string.quoted", "constant.other.symbol"],
      settings: { foreground: "#ff8170" },
    },
    {
      scope: ["constant.numeric", "constant.character"],
      settings: { foreground: "#d9c97c" },
    },
    {
      scope: ["entity.name.type", "entity.name.class", "support.type"],
      settings: { foreground: "#dabaff" },
    },
    {
      scope: ["entity.name.function", "support.function", "variable.function"],
      settings: { foreground: "#b281eb" },
    },
    {
      scope: ["entity.other.attribute-name", "variable.other.constant"],
      settings: { foreground: "#cc9768" },
    },
    {
      scope: ["meta.preprocessor", "keyword.control.directive"],
      settings: { foreground: "#ffa14f" },
    },
  ],
};

export default function starlightThemeApple(): StarlightPlugin {
  return {
    name: "starlight-theme-apple",
    hooks: {
      "config:setup"({ config, updateConfig }) {
        const userExpressiveCodeConfig =
          !config.expressiveCode || config.expressiveCode === true
            ? {}
            : config.expressiveCode;

        updateConfig({
          components: {
            ...config.components,
            PageTitle: fileURLToPath(
              new URL("./components/PageTitle.astro", import.meta.url)
            ),
            Pagination: fileURLToPath(
              new URL("./components/Pagination.astro", import.meta.url)
            ),
          },
          customCss: [
            ...(config.customCss ?? []),
            "starlight-theme-apple/styles.css",
          ],
          expressiveCode:
            config.expressiveCode === false
              ? false
              : {
                  themes: [doccDark, doccLight],
                  ...userExpressiveCodeConfig,
                  styleOverrides: {
                    borderColor: "var(--apple-hairline)",
                    borderRadius: "var(--apple-radius-sm)",
                    ...userExpressiveCodeConfig.styleOverrides,
                    frames: {
                      editorActiveTabIndicatorTopColor: "unset",
                      editorActiveTabIndicatorBottomColor: "var(--apple-link)",
                      editorTabBarBorderBottomColor: "var(--apple-hairline)",
                      frameBoxShadowCssValue: "unset",
                      ...userExpressiveCodeConfig.styleOverrides?.frames,
                    },
                  },
                },
        });
      },
    },
  };
}
