/// <reference path="./virtual.d.ts" />
import type { StarlightPlugin } from "@astrojs/starlight/types";
import type { AstroIntegration } from "astro";
import { fileURLToPath } from "node:url";

import {
  type StarlightThemeAppleConfig,
  type StarlightThemeAppleUserConfig,
  configSchema,
} from "./libs/config";
import { expressiveCodeConfig } from "./libs/expressive-code";
import { translations } from "./translations";

export type {
  StarlightThemeAppleConfig,
  StarlightThemeAppleLink,
  StarlightThemeAppleUserConfig,
} from "./libs/config";

const component = (name: string) =>
  fileURLToPath(new URL(`./components/${name}.astro`, import.meta.url));

/** Components the theme provides. Consumer and earlier-plugin overrides always win. */
const themeComponents = {
  Header: component("Header"),
  PageFrame: component("PageFrame"),
  Sidebar: component("Sidebar"),
  SocialIcons: component("SocialIcons"),
  PageTitle: component("PageTitle"),
  Footer: component("Footer"),
  EditLink: component("Empty"),
  Pagination: component("Empty"),
};

function configIntegration(
  config: StarlightThemeAppleConfig
): AstroIntegration {
  const moduleId = "virtual:starlight-theme-apple/config";
  const resolvedId = `\0${moduleId}`;
  return {
    name: "starlight-theme-apple-config",
    hooks: {
      "astro:config:setup"({ updateConfig }) {
        updateConfig({

          vite: {
            plugins: [
              {
                name: "vite-plugin-starlight-theme-apple-config",
                resolveId: (id) => (id === moduleId ? resolvedId : undefined),
                load: (id) =>
                  id === resolvedId
                    ? `export default ${JSON.stringify(config)};`
                    : undefined,
              },
            ],

          },
        });
      },
    },
  };
}

export default function starlightThemeApple(
  userConfig?: StarlightThemeAppleUserConfig
): StarlightPlugin {
  const parsed = configSchema.safeParse(userConfig);
  if (!parsed.success) {
    throw new Error(
      `Invalid starlight-theme-apple configuration:\n${parsed.error.issues
        .map(
          (issue) => `- ${issue.path.join(".") || "(root)"}: ${issue.message}`
        )
        .join("\n")}`
    );
  }
  const config = parsed.data;

  return {
    name: "starlight-theme-apple",
    hooks: {
      "i18n:setup"({ injectTranslations }) {
        injectTranslations(translations);
      },
      "config:setup"({
        config: starlightConfig,
        updateConfig,
        addIntegration,
      }) {
        addIntegration(configIntegration(config));
        updateConfig({
          components: { ...themeComponents, ...starlightConfig.components },
          customCss: [
            "starlight-theme-apple/styles.css",
            ...(starlightConfig.customCss ?? []),
          ],
          expressiveCode: expressiveCodeConfig(starlightConfig.expressiveCode),
        });
      },
    },
  };
}
