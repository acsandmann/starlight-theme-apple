import starlight from "@astrojs/starlight";
import { defineConfig } from "astro/config";
import starlightLinksValidator from "starlight-links-validator";
import starlightThemeApple from "starlight-theme-apple";

export default defineConfig({
  integrations: [
    starlight({
      editLink: {
        baseUrl:
          "https://github.com/acsandmann/starlight-theme-apple/edit/main/docs/",
      },
      plugins: [
        starlightThemeApple(),
        starlightLinksValidator({
          exclude: ["#_"],
        }),
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
