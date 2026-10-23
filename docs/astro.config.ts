import starlight from "@astrojs/starlight";
import { defineConfig } from "astro/config";
import starlightThemeApple from "starlight-theme-apple";

export default defineConfig({
  site: "https://acsandmann.github.io",
  base: "/starlight-theme-apple",
  integrations: [
    starlight({
      title: "Starlight Theme Apple",
      description:
        "An Apple Developer Documentation-inspired theme for Astro Starlight.",
      editLink: {
        baseUrl:
          "https://github.com/acsandmann/starlight-theme-apple/edit/main/docs/",
      },
      plugins: [
        starlightThemeApple({
          nav: [
            { label: "Guides", link: "/getting-started/" },
            { label: "Reference", link: "/reference/configuration/" },
            { label: "Components", link: "/examples/kitchen-sink/" },
          ],
          footer: {
            links: [
              {
                label: "GitHub",
                link: "https://github.com/acsandmann/starlight-theme-apple",
              },
              {
                label: "npm",
                link: "https://www.npmjs.com/package/starlight-theme-apple",
              },
              { label: "Starlight", link: "https://starlight.astro.build" },
            ],
            copyright: "MIT License. Not affiliated with Apple Inc.",
          },
        }),
      ],
      sidebar: [
        {
          label: "Start here",
          items: ["getting-started", "configuration", "customization"],
        },
        {
          label: "Reference",
          items: [
            { label: "Configuration", slug: "reference/configuration" },
            { label: "Reference components", slug: "reference/components" },
          ],
        },
        {
          label: "Examples",
          items: [{ autogenerate: { directory: "examples" } }],
        },
      ],
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/acsandmann/starlight-theme-apple",
        },
      ],
    }),
  ],
});
