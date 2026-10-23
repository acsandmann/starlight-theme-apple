import type { StarlightUserConfig } from "@astrojs/starlight/types";

type ExpressiveCodeConfig = Exclude<
  NonNullable<StarlightUserConfig["expressiveCode"]>,
  boolean
>;

interface Palette {
  background: string;
  foreground: string;
  comment: string;
  keyword: string;
  string: string;
  number: string;
  type: string;
  function: string;
  property: string;
  attribute: string;
  preprocessor: string;
}

/** Syntax colors modeled on Xcode's default light and dark themes. */
function xcodeTheme(name: string, type: "light" | "dark", p: Palette) {
  return {
    name,
    type,
    colors: {
      "editor.background": p.background,
      "editor.foreground": p.foreground,
    },
    settings: [
      { settings: { foreground: p.foreground, background: p.background } },
      {
        scope: ["comment", "punctuation.definition.comment"],
        settings: { foreground: p.comment },
      },
      {
        scope: [
          "keyword",
          "storage",
          "storage.type",
          "storage.modifier",
          "constant.language",
        ],
        settings: { foreground: p.keyword, fontStyle: "bold" },
      },
      {
        scope: ["keyword.operator", "punctuation", "meta.brace"],
        settings: { foreground: p.foreground, fontStyle: "" },
      },
      {
        scope: [
          "string",
          "string.quoted",
          "constant.other.symbol",
          "markup.inline.raw",
        ],
        settings: { foreground: p.string },
      },
      {
        scope: [
          "constant.numeric",
          "constant.character",
          "constant.other.boolean",
        ],
        settings: { foreground: p.number },
      },
      {
        scope: [
          "entity.name.type",
          "entity.name.class",
          "support.type",
          "support.class",
          "entity.name.tag",
        ],
        settings: { foreground: p.type },
      },
      {
        scope: [
          "entity.name.function",
          "support.function",
          "variable.function",
          "meta.function-call",
        ],
        settings: { foreground: p.function },
      },
      {
        scope: [
          "support.type.property-name",
          "meta.object-literal.key",
          "variable.other.property",
          "variable.other.key",
          "entity.name.section",
          "variable.other.constant",
        ],
        settings: { foreground: p.property },
      },
      {
        scope: [
          "entity.other.attribute-name",
          "meta.attribute",
          "variable.parameter",
        ],
        settings: { foreground: p.attribute },
      },
      {
        scope: [
          "meta.preprocessor",
          "keyword.control.directive",
          "entity.name.function.preprocessor",
        ],
        settings: { foreground: p.preprocessor },
      },
      {
        scope: ["markup.heading", "markup.bold"],
        settings: { fontStyle: "bold" },
      },
      { scope: ["markup.italic"], settings: { fontStyle: "italic" } },
      { scope: ["markup.deleted"], settings: { foreground: p.string } },
      { scope: ["markup.inserted"], settings: { foreground: p.property } },
    ],
  };
}

export const xcodeLight = xcodeTheme("apple-xcode-light", "light", {
  background: "#f5f5f7",
  foreground: "#1d1d1f",
  comment: "#5d6c79",
  keyword: "#9b2393",
  string: "#c41a16",
  number: "#1c00cf",
  type: "#703daa",
  function: "#3900a0",
  property: "#326d74",
  attribute: "#815f03",
  preprocessor: "#643820",
});

export const xcodeDark = xcodeTheme("apple-xcode-dark", "dark", {
  background: "#1d1d1f",
  foreground: "#f5f5f7",
  comment: "#7f8c98",
  keyword: "#ff7ab2",
  string: "#ff8170",
  number: "#d9c97c",
  type: "#dabaff",
  function: "#b281eb",
  property: "#78c2b3",
  attribute: "#cc9768",
  preprocessor: "#ffa14f",
});

/**
 * Apple code listings are flat, borderless panels. Colors come from theme tokens so code
 * follows the page palette and any token a consumer overrides.
 */
const styleOverrides = {
  borderWidth: "0px",
  borderRadius: "var(--apple-radius-panel)",
  borderColor: "var(--apple-hairline)",
  codeBackground: "var(--apple-code-background)",
  codeFontFamily: "var(--apple-font-mono)",
  codeFontSize: "0.875rem",
  codeLineHeight: "1.65",
  codePaddingBlock: "0.875rem",
  codePaddingInline: "1.125rem",
  uiFontFamily: "var(--apple-font-sans)",
  uiFontSize: "0.8125rem",
  focusBorder: "var(--apple-link)",
  scrollbarThumbColor: "var(--apple-hairline)",
  textMarkers: {
    lineMarkerAccentWidth: "0.1875rem",
    markBackground: "color-mix(in srgb, var(--apple-link) 12%, transparent)",
    markBorderColor: "color-mix(in srgb, var(--apple-link) 55%, transparent)",
    insBackground: "color-mix(in srgb, var(--apple-success) 13%, transparent)",
    insBorderColor: "color-mix(in srgb, var(--apple-success) 60%, transparent)",
    insDiffIndicatorColor: "var(--apple-success)",
    delBackground: "color-mix(in srgb, var(--apple-danger) 11%, transparent)",
    delBorderColor: "color-mix(in srgb, var(--apple-danger) 55%, transparent)",
    delDiffIndicatorColor: "var(--apple-danger)",
  },
  frames: {
    shadowColor: "transparent",
    frameBoxShadowCssValue: "none",
    editorBackground: "var(--apple-code-background)",
    editorTabBarBackground: "var(--apple-code-background)",
    editorTabBarBorderColor: "transparent",
    editorTabBarBorderBottomColor: "var(--apple-hairline)",
    editorActiveTabBackground: "var(--apple-code-background)",
    editorActiveTabForeground: "var(--apple-secondary-foreground)",
    editorActiveTabBorderColor: "transparent",
    editorActiveTabIndicatorHeight: "0px",
    editorActiveTabIndicatorTopColor: "transparent",
    editorActiveTabIndicatorBottomColor: "transparent",
    editorTabBorderRadius: "0px",
    editorTabsMarginInlineStart: "0.375rem",
    terminalBackground: "var(--apple-code-background)",
    terminalTitlebarBackground: "var(--apple-code-background)",
    terminalTitlebarForeground: "var(--apple-secondary-foreground)",
    terminalTitlebarBorderBottomColor: "var(--apple-hairline)",
    terminalTitlebarDotsForeground: "var(--apple-tertiary-foreground)",
    terminalTitlebarDotsOpacity: "0.35",
    inlineButtonBackground: "var(--apple-background)",
    inlineButtonForeground: "var(--apple-secondary-foreground)",
    inlineButtonBorder: "var(--apple-hairline)",
    inlineButtonBorderOpacity: "1",
    inlineButtonBackgroundIdleOpacity: "0.85",
    inlineButtonBackgroundHoverOrFocusOpacity: "1",
    inlineButtonBackgroundActiveOpacity: "1",
    tooltipSuccessBackground: "var(--apple-success)",
    tooltipSuccessForeground: "#fff",
  },
};

/** Merge the theme's Expressive Code defaults beneath the consumer's own configuration. */
export function expressiveCodeConfig(
  user: StarlightUserConfig["expressiveCode"]
): StarlightUserConfig["expressiveCode"] {
  if (user === false) return false;
  const config: ExpressiveCodeConfig = user === true || !user ? {} : user;
  const userStyles = (config.styleOverrides ?? {}) as Record<
    string,
    unknown
  > & {
    frames?: Record<string, unknown>;
    textMarkers?: Record<string, unknown>;
  };
  return {
    themes: [xcodeDark, xcodeLight],
    // Shell snippets render as plain code listings rather than empty terminal windows.
    // Use `frame="terminal"` on a block, or set `defaultProps`, to restore the window chrome.
    defaultProps: {
      overridesByLang: {
        "ansi,bash,sh,shell,shellscript,shellsession,zsh,fish,powershell,ps,ps1":
          { frame: "code" },
      },
    },
    ...config,
    styleOverrides: {
      ...styleOverrides,
      ...userStyles,
      frames: { ...styleOverrides.frames, ...userStyles.frames },
      textMarkers: { ...styleOverrides.textMarkers, ...userStyles.textMarkers },
    },
  } as ExpressiveCodeConfig;
}
