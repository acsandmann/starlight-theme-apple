declare module "virtual:starlight-theme-apple/config" {
  const config: import("./libs/config").StarlightThemeAppleConfig;
  export default config;
}

declare namespace StarlightApp {
  type ThemeAppleTranslations =
    (typeof import("./translations").translations)["en"];
  interface I18n extends ThemeAppleTranslations {}
}
