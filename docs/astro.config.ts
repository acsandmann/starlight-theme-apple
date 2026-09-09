import starlight from "@astrojs/starlight";
import { defineConfig } from "astro/config";
import starlightThemeApple from "starlight-theme-apple";

export default defineConfig({
  site: "https://acsandmann.github.io",
  base: "/starlight-theme-apple",
  integrations: [
    starlight({
      editLink: {
        baseUrl:
          "https://github.com/acsandmann/starlight-theme-apple/edit/main/docs/",
      },
      plugins: [
        starlightThemeApple(),
      ],
      sidebar: [
        {
          label: "Start Here",
          items: ["getting-started", "customization"],
        },
        {
          label: "Examples",
          items: [{ autogenerate: { directory: "examples" } }],
        },
      ],
      social: [
        {
          icon: "blueSky",
          label: "BlueSky",
          href: "https://bsky.app/profile/trueberryless.org",
        },
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/acsandmann/starlight-theme-apple",
        },
      ],
      title: "Starlight Theme Apple Docs",
    }),
  ],
});
