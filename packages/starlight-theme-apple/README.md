# `starlight-theme-apple`

An [Astro Starlight](https://starlight.astro.build) theme modeled on Apple’s developer documentation: system typography on Apple’s documentation scale, a quiet navigator, breadcrumbs, a hairline “On this page” rail, Xcode-colored code, and components for dense API and configuration references. Light and dark appearances are both included.

## Install

```sh
npm install starlight-theme-apple
```

```js
// astro.config.mjs
import starlight from "@astrojs/starlight";
import starlightThemeApple from "starlight-theme-apple";

export default {
  integrations: [starlight({ title: "My Docs", plugins: [starlightThemeApple()] })],
};
```

That is the whole setup. No custom CSS is required.

## Optional configuration

```js
starlightThemeApple({
  nav: [{ label: "Guides", link: "/guides/" }], // header links, also shown in the mobile menu
  action: { label: "Download", link: "https://example.com/download" }, // emphasized header button
  socialAttrs: { github: { "data-analytics": "github" } }, // attributes for Starlight social links
  footer: {
    links: [{ label: "GitHub", link: "https://github.com/example/project" }],
    copyright: "© 2026 Example",
  },
});
```

Paths starting with `/` are resolved against Astro’s `base`.

## Reference components

```mdx
import { ReferenceEntry, Declaration, ReferenceMeta } from "starlight-theme-apple/components";
```

`ReferenceEntry`, `Declaration`, `ReferenceMeta`, `ParameterList`, `Parameter`, `ValueList`, `Availability`, `TopicList`, `TopicLink`, and `Figure`. Generators that write Markdown can emit the equivalent `apple-*` HTML classes instead.

## Documentation

See the [documentation site](https://acsandmann.github.io/starlight-theme-apple/) for configuration, customization tokens, component overrides, and examples.

Requires Starlight 0.41 or later and Astro 7. Not affiliated with Apple Inc.

## License

MIT © acsandmann. See [LICENSE](https://github.com/acsandmann/starlight-theme-apple/blob/main/LICENSE).

The site footer spans the page below article navigation. Use `footer.groups` for columns (`{ label, links }`); without groups it renders only the bottom row. `footer.links` and `footer.copyright` populate the bottom row. The theme’s `PageFrame` wrapper supplies this outer footer, while the `Footer` override supplies article metadata and pagination.
