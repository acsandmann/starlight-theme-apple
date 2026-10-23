import { describe, expect, test } from "bun:test";
import { breadcrumbs } from "../libs/breadcrumbs";

const link = (label: string, href: string, isCurrent = false) => ({
  type: "link" as const,
  label,
  href,
  isCurrent,
});
const group = (label: string, entries: unknown[]) => ({ type: "group" as const, label, entries });

const sidebar = (current: string) => [
  group("Start here", [link("Home", "/docs/", current === "/docs/"), link("Install", "/docs/install/", current === "/docs/install/")]),
  group("Guides", [link("Layouts", "/docs/guides/layouts/", current === "/docs/guides/layouts/")]),
  group("CLI", [
    link("Overview", "/docs/cli/", current === "/docs/cli/"),
    group("Execute", [
      link("Execute", "/docs/cli/execute/", current === "/docs/cli/execute/"),
      link("Window", "/docs/cli/execute/window/", current === "/docs/cli/execute/window/"),
    ]),
  ]),
];

describe("breadcrumbs", () => {
  test("links groups to their landing pages", () => {
    expect(breadcrumbs(sidebar("/docs/cli/execute/window/"), "Site", "/docs/")).toEqual([
      { label: "Site", href: "/docs/" },
      { label: "CLI", href: "/docs/cli/" },
      { label: "Execute", href: "/docs/cli/execute/" },
    ]);
  });

  test("leaves groups without a landing page unlinked", () => {
    expect(breadcrumbs(sidebar("/docs/guides/layouts/"), "Site", "/docs/")).toEqual([
      { label: "Site", href: "/docs/" },
      { label: "Guides", href: undefined },
    ]);
  });

  test("omits a group whose landing page is current or the site root", () => {
    expect(breadcrumbs(sidebar("/docs/cli/execute/"), "Site", "/docs/")).toEqual([
      { label: "Site", href: "/docs/" },
      { label: "CLI", href: "/docs/cli/" },
    ]);
    expect(breadcrumbs(sidebar("/docs/install/"), "Site", "/docs/")).toEqual([
      { label: "Site", href: "/docs/" },
    ]);
  });

  test("shows nothing on the home page or pages outside the sidebar", () => {
    expect(breadcrumbs(sidebar("/docs/"), "Site", "/docs/")).toEqual([]);
    expect(breadcrumbs(sidebar("/elsewhere/"), "Site", "/docs/")).toEqual([]);
  });
});
