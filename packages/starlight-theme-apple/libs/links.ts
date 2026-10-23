import type { StarlightThemeAppleLink } from "./config";

const base = import.meta.env.BASE_URL.replace(/\/$/, "");
const hasProtocol = (link: string) => /^[a-z][a-z\d+.-]*:/i.test(link);

/** Resolve a configured link against the site `base`, as Starlight does for sidebar links. */
export function resolveHref(link: string): string {
  if (hasProtocol(link) || link.startsWith("//") || link.startsWith("#"))
    return link;
  const path = link.startsWith("/") ? link : `/${link}`;
  return `${base}${path}`;
}

const normalize = (path: string) => path.replace(/\/?(index\.html)?$/, "/");

/**
 * A header link is current when the page is the link target or lives below it.
 * The site root only matches itself so it does not mark every page as current.
 */
export function isCurrentSection(href: string, pathname: string): boolean {
  if (hasProtocol(href) || href.startsWith("//") || href.startsWith("#"))
    return false;
  const target = normalize(href.split(/[?#]/)[0] ?? href);
  const current = normalize(pathname);
  if (target === normalize(`${base}/`)) return current === target;
  return current.startsWith(target);
}

export function linkProps(item: StarlightThemeAppleLink, pathname: string) {
  const href = resolveHref(item.link);
  const external = hasProtocol(href) || href.startsWith("//");
  return {
    href,
    current: isCurrentSection(href, pathname),
    external,
    attrs: item.attrs ?? {},
  };
}
