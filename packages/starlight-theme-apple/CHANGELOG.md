# Changelog

## 0.8.0

A redesign that brings the theme much closer to Apple’s developer documentation and moves common site structure into the theme.

### Added

- Full-width site footer outside the article columns, with optional `footer.groups` navigation columns. Without groups it renders a compact bottom row. A thin `PageFrame` wrapper preserves Starlight’s native frame and places the site footer after it. Article metadata and pagination stay in `Footer`.

- Theme-provided `Header`, `Sidebar`, `SocialIcons`, and `Footer` components. Header links, an optional emphasized action, and footer links are configured through new plugin options: `nav`, `action`, `socialAttrs`, and `footer`.
- Header links are repeated at the top of the small-screen navigation menu.
- Reference components exported from `starlight-theme-apple/components`: `ReferenceEntry`, `Declaration`, `ReferenceMeta`, `ParameterList`, `Parameter`, `ValueList`, `Availability`, `TopicList`, `TopicLink`, and `Figure`, plus the equivalent `apple-*` HTML classes for generated Markdown.
- Breadcrumbs link sidebar groups to their overview page when the group has one.
- Xcode-inspired code colors, applied through Expressive Code’s `styleOverrides` instead of `!important` CSS.

### Changed


- Typography, palette, spacing, sidebar, table of contents, asides, cards, buttons, tabs, steps, badges, search, and the splash hero follow Apple’s documentation more closely. Dark mode uses Apple’s black background.
- The appearance control is Starlight’s native `ThemeSelect`, shown as an icon button. It keeps Light, Dark, and Auto.
- Component overrides set by you or by earlier plugins now take precedence over the theme’s components. Previously `PageTitle` and `Pagination` were always replaced.
- The theme stylesheet is loaded before your `customCss`.
- Layout uses Starlight’s own `--sl-content-width` and `--sl-sidebar-width` instead of fighting Starlight’s layout. The content column is 51.25rem.
- Shell code blocks render as plain listings rather than empty terminal windows. Add `frame="terminal"` to restore the terminal frame.
- Peer dependencies are now `@astrojs/starlight >=0.41.0` and `astro >=7.0.0`.

### Removed and renamed tokens

- `--apple-content-width`: use `--sl-content-width`.
- `--apple-header-height`: use `--sl-nav-height`.
- `--apple-sidebar-width`, `--apple-toc-width`: use `--sl-sidebar-width`; the table of contents follows Starlight’s layout.
- `--apple-hover-surface`, `--apple-active-surface`, `--apple-surface`, `--apple-card-background`, `--apple-navigator-background`: use `--apple-fill-secondary`, `--apple-fill`, and `--apple-secondary-background`.
- `--apple-aside-background`, `--apple-header-background`: replaced by `--apple-secondary-background` and `--apple-background`.
- `--apple-control-primary-text`: renamed `--apple-button-foreground`.
- `--apple-warning`: renamed `--apple-caution`; `--apple-tip` and `--apple-note` were added.
- `--apple-border`, `--apple-link-hover`, `--apple-row-height`, `--apple-section-spacing`, `--apple-disabled-opacity`: removed.
