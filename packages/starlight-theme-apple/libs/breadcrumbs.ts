interface SidebarLink {
  type: "link";
  label: string;
  href: string;
  isCurrent: boolean;
}
interface SidebarGroup {
  type: "group";
  label: string;
  entries: SidebarEntry[];
}
type SidebarEntry = SidebarLink | SidebarGroup;

export interface Crumb {
  label: string;
  href?: string | undefined;
}

const isInternal = (href: string) =>
  href.startsWith("/") && !href.startsWith("//");

function links(entries: SidebarEntry[]): SidebarLink[] {
  return entries.flatMap((entry) =>
    entry.type === "link" ? [entry] : links(entry.entries)
  );
}

/**
 * A group’s landing page is a direct child link whose path contains every other page in the
 * group, such as an “Overview” at `/guides/` above `/guides/install/`.
 */
function landingPage(group: SidebarGroup): SidebarLink | undefined {
  const pages = links(group.entries).filter((link) => isInternal(link.href));
  if (pages.length < 2) return undefined;
  return group.entries.find(
    (entry): entry is SidebarLink =>
      entry.type === "link" &&
      isInternal(entry.href) &&
      pages.every((page) => page.href.startsWith(entry.href))
  );
}

function ancestors(
  entries: SidebarEntry[],
  trail: SidebarGroup[] = []
): SidebarGroup[] | undefined {
  for (const entry of entries) {
    if (entry.type === "link") {
      if (entry.isCurrent) return trail;
    } else {
      const found = ancestors(entry.entries, [...trail, entry]);
      if (found) return found;
    }
  }
  return undefined;
}

/**
 * Breadcrumbs from the site root through the sidebar groups containing the current page.
 * Groups link to their landing page when they have one. A group whose landing page is the
 * current page, or the site root itself, is omitted because it would repeat the title or root.
 */
export function breadcrumbs(
  sidebar: unknown,
  siteTitle: string,
  siteHref: string
): Crumb[] {
  const entries = sidebar as SidebarEntry[];
  const trail = ancestors(entries);
  const current = links(entries).find((link) => link.isCurrent);
  if (!trail || current?.href === siteHref) return [];

  const crumbs: Crumb[] = [{ label: siteTitle, href: siteHref }];
  for (const group of trail) {
    const landing = landingPage(group);
    if (landing?.isCurrent || landing?.href === siteHref) continue;
    crumbs.push({ label: group.label, href: landing?.href });
  }
  return crumbs;
}
