"use client";

import { useState } from "react";
import { Compass, Disc3, ListMusic, Settings, Sparkles, UserRound } from "lucide-react";

import {
  cn,
  seiExperienceMeta,
  seiExperiences,
  SEIBottomNavigation,
  SEIButton,
  SEICard,
  SEIField,
  SEIInput,
  SEINavigationDrawerPanel,
  SEIPanel,
  SEITextarea,
  type SEIExperience,
} from "@seihouse/ui";

import { DiagBlock } from "./shared";

/* ------------------------------------------------------------------ */
/* Experience proof                                                     */
/* The same approved components, rendered three times under different   */
/* `data-experience` roots. Nothing here is forked per experience: each  */
/* column is identical markup, so any visual difference comes entirely   */
/* from the token layer in @seihouse/ui/styles/tokens.css.               */
/* ------------------------------------------------------------------ */

type ProofTheme = "dark" | "light";

function Specimen({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <p className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-[var(--sh-text-subtle)]">
        {label}
      </p>
      {children}
    </div>
  );
}

/** One column of specimens. Identical for every experience — by design. */
function ExperienceColumn({ experience, theme }: { experience: SEIExperience; theme: ProofTheme }) {
  const meta = seiExperienceMeta[experience];

  const navSections = [
    {
      id: "browse",
      label: "Browse",
      items: [
        { id: "home", label: "Home", icon: <Compass className="size-5" />, active: true },
        { id: "vault", label: "Vault", icon: <ListMusic className="size-5" /> },
      ],
    },
  ];

  return (
    <section
      data-experience={experience}
      data-theme={theme}
      aria-label={`${meta.name} — ${meta.register}`}
      className="min-w-0 space-y-5 rounded-[var(--sh-radius-panel)] border border-[var(--sh-border)] bg-[var(--sh-page-background)] [background-image:var(--sh-atmosphere)] p-4 text-[var(--sh-text-primary)]"
    >
      <header className="border-b border-[var(--sh-border)] pb-3">
        <p className="font-[family-name:var(--sh-font-display)] text-base font-semibold tracking-[var(--sh-tracking-display)]">
          {meta.name} — {meta.register}
        </p>
        <p className="mt-1 text-xs leading-[var(--sh-leading-reading)] text-[var(--sh-text-muted)]">
          {meta.description}
        </p>
        <code className="mt-2 block font-mono text-[0.62rem] text-[var(--sh-text-subtle)]">
          data-experience=&quot;{experience}&quot;
        </code>
      </header>

      <Specimen label="Button">
        <div className="flex flex-wrap gap-2">
          <SEIButton variant="solid" size="sm">
            Register
          </SEIButton>
          <SEIButton variant="soft" size="sm">
            Preview
          </SEIButton>
          <SEIButton variant="outline" size="sm">
            Outline
          </SEIButton>
          <SEIButton variant="ghost" size="sm">
            Ghost
          </SEIButton>
        </div>
      </Specimen>

      <Specimen label="Card">
        <SEICard
          eyebrow="Release"
          title="Midnight Sessions"
          description="Nine tracks recorded live over three nights, mixed for late listening."
          metadata={<span className="text-[var(--sh-text-subtle)]">2026 · Album · 9 tracks</span>}
          media={
            <div
              aria-hidden="true"
              className="h-24 w-full [background-image:var(--sh-atmosphere)] bg-[var(--sh-surface-elevated)]"
            />
          }
          actions={
            <SEIButton variant="solid" size="sm">
              Open
            </SEIButton>
          }
          elevateOnHover
        />
      </Specimen>

      <Specimen label="Panel">
        <div className="space-y-3">
          <SEIPanel padding="sm">
            <p className="text-xs leading-[var(--sh-leading-reading)] text-[var(--sh-text-muted)]">
              Default panel — surface, border, and elevation from the experience tokens.
            </p>
          </SEIPanel>
          <SEIPanel variant="glass" padding="sm" glow>
            <p className="text-xs leading-[var(--sh-leading-reading)] text-[var(--sh-text-muted)]">
              Glass panel — body tint, sheen, rim light, and blur all shift per experience.
            </p>
          </SEIPanel>
        </div>
      </Specimen>

      <Specimen label="Input · Textarea">
        <div className="space-y-3">
          <SEIField label="Title" htmlFor={`exp-${experience}-title`} size="compact">
            <SEIInput
              id={`exp-${experience}-title`}
              size="compact"
              placeholder="Midnight Sessions"
            />
          </SEIField>
          <SEIField label="Notes" htmlFor={`exp-${experience}-notes`} size="compact">
            <SEITextarea id={`exp-${experience}-notes`} rows={2} placeholder="Liner notes…" />
          </SEIField>
        </div>
      </Specimen>

      <Specimen label="Bottom navigation">
        <div className="overflow-hidden rounded-[var(--sh-radius-panel)] border border-[var(--sh-border)] bg-[var(--sh-surface)]">
          <div className="h-10" aria-hidden="true" />
          <SEIBottomNavigation
            aria-label={`${meta.name} demo app`}
            items={[
              { id: "home", label: "Home", icon: <Compass className="size-5" />, active: true },
              { id: "vault", label: "Vault", icon: <Disc3 className="size-5" /> },
              { id: "dojo", label: "Dojo", icon: <Sparkles className="size-5" /> },
            ]}
          />
        </div>
      </Specimen>

      <Specimen label="Navigation drawer">
        <div className="overflow-hidden rounded-[var(--sh-radius-panel)] border border-[var(--sh-border)] bg-[var(--sh-surface-elevated)]">
          <SEINavigationDrawerPanel
            aria-label={`${meta.name} demo navigation`}
            account={{ name: "Sensei Dukes", detail: "sensei@seihouse.app" }}
            sections={navSections}
            actions={[
              { id: "settings", label: "Settings", icon: <Settings className="size-5" /> },
              { id: "profile", label: "Profile", icon: <UserRound className="size-5" /> },
            ]}
          />
        </div>
      </Specimen>
    </section>
  );
}

export function ExperienceSection() {
  const [theme, setTheme] = useState<ProofTheme>("dark");

  return (
    <div className="space-y-6">
      <DiagBlock title="Default · SEA · SEN" hint='data-experience="default" | "sea" | "sen"'>
        <div className="space-y-4">
          <p className="max-w-3xl text-sm leading-relaxed text-[var(--sh-color-cloud)]">
            One UI system, three expressions. Every column below renders the <em>same</em>{" "}
            components with the same props — only the{" "}
            <code className="font-mono text-[var(--sh-interactive-text)]">data-experience</code>{" "}
            attribute on the column root differs. Contrast stays with{" "}
            <code className="font-mono text-[var(--sh-interactive-text)]">data-theme</code>, so the
            two compose: switch the theme here to check every experience in both.
          </p>

          <div
            role="group"
            aria-label="Proof theme"
            className="flex flex-wrap items-center gap-1.5"
          >
            {(["dark", "light"] as const).map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setTheme(option)}
                aria-pressed={theme === option}
                className={cn(
                  "rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sh-color-sea)]",
                  theme === option
                    ? "border-[rgba(0,122,255,0.45)] bg-[rgba(0,122,255,0.14)] text-white"
                    : "border-white/10 bg-white/[0.03] text-[var(--sh-color-cloud)] hover:border-white/20 hover:text-white",
                )}
              >
                {option}
              </button>
            ))}
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            {seiExperiences.map((experience) => (
              <ExperienceColumn key={experience} experience={experience} theme={theme} />
            ))}
          </div>
        </div>
      </DiagBlock>
    </div>
  );
}
