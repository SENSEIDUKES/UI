/**
 * SEIHouse experiences — the `data-experience` layer.
 *
 * One UI system, three expressions. `data-theme` stays in charge of contrast
 * (dark / light); `data-experience` carries product personality. The visual
 * definition lives entirely in `styles/tokens.css`; this module is only the
 * shared vocabulary (names, labels, guards) so apps do not hand-roll strings.
 *
 * Apply the attribute at the document root so portal-based overlays — dialogs,
 * drawers, popovers, menus, toasts — inherit the same expression:
 *
 * ```ts
 * document.documentElement.dataset.experience = "sea";
 * ```
 */

export const seiExperiences = ["default", "sea", "sen"] as const;

export type SEIExperience = (typeof seiExperiences)[number];

export const SEI_DEFAULT_EXPERIENCE: SEIExperience = "default";

export interface SEIExperienceMeta {
  /** Short name, as shown on a control. */
  name: string;
  /** The product register this expression serves. */
  register: string;
  /** One-line description of the visual direction. */
  description: string;
}

export const seiExperienceMeta: Record<SEIExperience, SEIExperienceMeta> = {
  default: {
    name: "Default",
    register: "Modern",
    description: "Neutral, premium SEIHouse foundation.",
  },
  sea: {
    name: "SEA",
    register: "Music",
    description: "Artwork-forward, energetic, immersive.",
  },
  sen: {
    name: "SEN",
    register: "Narrative",
    description: "Reading-first, cinematic, calm.",
  },
};

export function isSEIExperience(value: unknown): value is SEIExperience {
  return seiExperiences.some((experience) => experience === value);
}
