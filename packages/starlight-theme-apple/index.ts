import type { StarlightPlugin } from "@astrojs/starlight/types";
import { fileURLToPath } from "node:url";

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
          },
          customCss: [
            ...(config.customCss ?? []),
            "starlight-theme-apple/styles.css",
          ],
          expressiveCode:
            config.expressiveCode === false
              ? false
              : {
                  themes: ["github-dark", "github-light"],
                  ...userExpressiveCodeConfig,
                  styleOverrides: {
                    borderColor: "var(--apple-border-subtle)",
                    borderRadius: "var(--apple-radius-sm)",
                    ...userExpressiveCodeConfig.styleOverrides,
                    frames: {
                      editorActiveTabIndicatorTopColor: "unset",
                      editorActiveTabIndicatorBottomColor: "var(--apple-link)",
                      editorTabBarBorderBottomColor:
                        "var(--apple-border-subtle)",
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
