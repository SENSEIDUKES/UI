import { ArrowRight, Fingerprint, History, ShieldCheck } from "lucide-react";
import { tv, type VariantProps } from "tailwind-variants";
import { memo } from "react";

import type { RegistryItem } from "../types/music";
import { SEIBadge } from "../primitives/sei-badge";
import { SEIButton } from "../primitives/sei-button";
import { SEIPanel } from "../primitives/sei-panel";
import { RegistrySeal } from "../particles/registry-seal";
import { cn } from "../styles/cn";

const registryPanelStyles = tv({
  slots: {
    panel: "h-full",
    header:
      "flex flex-col gap-4 border-b border-white/10 pb-5 sm:flex-row sm:items-start sm:justify-between",
    idLine:
      "flex flex-wrap items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-3 py-2 font-mono text-xs uppercase tracking-[0.12em] text-[var(--sh-color-mist)]",
  },
  variants: {
    state: {
      draft: {},
      registered: {
        panel: "shadow-[0_24px_70px_rgba(0,122,255,0.12)]",
      },
      verified: {
        panel: "shadow-[0_24px_70px_rgba(52,199,89,0.12)]",
      },
      archived: {
        panel: "opacity-90",
      },
      experimental: {
        panel: "shadow-[0_24px_70px_rgba(255,107,53,0.12)]",
      },
    },
  },
  defaultVariants: { state: "draft" },
});

const registrySurface = {
  draft: "default",
  registered: "soft",
  verified: "solid",
  archived: "outline",
  experimental: "media-test",
} as const;

export interface RegistryPanelProps extends VariantProps<typeof registryPanelStyles> {
  item: RegistryItem;
  className?: string;
}

export function RegistryPanel({ item, state = item.state, className }: RegistryPanelProps) {
  const styles = registryPanelStyles({ state });
  const currentState = state ?? item.state;

  return (
    <SEIPanel
      as="article"
      variant={registrySurface[currentState]}
      padding="md"
      className={cn(styles.panel(), className)}
    >
      <div className="space-y-5">
        <div className={styles.header()}>
          <div className="space-y-2">
            <div className="flex flex-wrap gap-2">
              <SEIBadge variant="registry" size="sm" icon={ShieldCheck}>
                {item.type}
              </SEIBadge>
              <RegistrySeal status={currentState} compact />
            </div>
            <h3 className="text-2xl font-semibold leading-tight tracking-[-0.05em]">
              {item.title}
            </h3>
          </div>
          <SEIButton size="sm" variant="ghost" iconRight={<ArrowRight className="size-3.5" />}>
            Open panel
          </SEIButton>
        </div>

        <p className="text-sm leading-relaxed text-[var(--sh-color-cloud)]">{item.verification}</p>

        <div className="grid gap-3 md:grid-cols-2">
          <div className={styles.idLine()}>
            <Fingerprint aria-hidden="true" className="size-3.5" />
            {item.mockId}
          </div>
          <div className={styles.idLine()}>
            <History aria-hidden="true" className="size-3.5" />
            {item.timestamp}
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {item.seals.map((seal) => (
            <SEIBadge
              key={seal}
              variant={currentState === "verified" ? "success" : "outline"}
              size="sm"
            >
              {seal}
            </SEIBadge>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 border-t border-white/10 pt-4">
          <SEIButton size="sm" variant="solid">
            Review mock record
          </SEIButton>
          <SEIButton size="sm" variant="outline">
            Copy ID
          </SEIButton>
        </div>
      </div>
    </SEIPanel>
  );
}

export default memo(RegistryPanel, (prevProps, nextProps) => {
  // Custom comparison for RegistryItem object
  if (prevProps.item !== nextProps.item) {
    // Deep compare registry item properties that affect rendering
    return (
      prevProps.item.title === nextProps.item.title &&
      prevProps.item.type === nextProps.item.type &&
      prevProps.item.verification === nextProps.item.verification &&
      prevProps.item.mockId === nextProps.item.mockId &&
      prevProps.item.timestamp === nextProps.item.timestamp &&
      JSON.stringify(prevProps.item.seals) === JSON.stringify(nextProps.item.seals) &&
      prevProps.item.state === nextProps.item.state
    );
  }
  return (
    prevProps.state === nextProps.state &&
    prevProps.className === nextProps.className
  );
});
