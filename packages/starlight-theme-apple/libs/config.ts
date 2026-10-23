import type { StarlightIcon } from "@astrojs/starlight/types";
import { z } from "astro/zod";

const attrsSchema = z
  .record(z.string(), z.union([z.string(), z.number(), z.boolean()]))
  .optional();

const linkSchema = z.object({
  /** Visible text for the link. */
  label: z.string().min(1),
  /**
   * Destination. Paths starting with `/` are resolved against Astro's `base`, the same way
   * Starlight resolves sidebar links. Full URLs are used as they are.
   */
  link: z.string().min(1),
  /** Optional Starlight icon name shown before the label. */
  icon: z
    .custom<StarlightIcon>((value) => typeof value === "string")
    .optional(),
  /** Extra HTML attributes for the rendered `<a>`, e.g. analytics `data-*` attributes. */
  attrs: attrsSchema,
});

export const configSchema = z
  .object({
    /** Primary navigation shown in the header and, on small screens, in the navigation menu. */
    nav: z.array(linkSchema).default([]),
    /** One emphasized header action, such as “Download”. */
    action: linkSchema.optional(),
    /** Extra HTML attributes for Starlight `social` links, keyed by their `icon` name. */
    socialAttrs: z.record(z.string(), attrsSchema.unwrap()).default({}),
    footer: z
      .object({
        /** Optional columns of site navigation. */
        groups: z
          .array(
            z.object({
              label: z.string().min(1),
              links: z.array(linkSchema),
            })
          )
          .default([]),
        /** Supporting links shown in the site footer. */
        links: z.array(linkSchema).default([]),
        /** A short line of text such as a copyright notice. */
        copyright: z.string().optional(),
      })
      .default({ groups: [], links: [] }),
  })
  .default({ nav: [], socialAttrs: {}, footer: { groups: [], links: [] } });

export type StarlightThemeAppleUserConfig = z.input<typeof configSchema>;
export type StarlightThemeAppleConfig = z.output<typeof configSchema>;
export type StarlightThemeAppleLink = z.output<typeof linkSchema>;
