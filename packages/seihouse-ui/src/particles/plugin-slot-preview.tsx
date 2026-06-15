import type { ReactNode } from "react";
import { Boxes, Cable, Radio, ShieldCheck, SlidersHorizontal, Wrench } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { memo } from "react";

import { SEIBadge } from "../primitives/sei-badge";
import { SEIButton } from "../primitives/sei-button";
import { SEIPanel } from "../primitives/sei-panel";
import { cn } from "../styles/cn";

export type PluginSlotKind =
  | "SAP"
  | "Vault Radio"
  | "Environment Engine"
  | "Registry Seal"
  | "Creator Tools";

const pluginIcons: Record<PluginSlotKind, LucideIcon> = {
  SAP: Cable,
  "Vault Radio": Radio,
  "Environment Engine": SlidersHorizontal,
  "Registry Seal": ShieldCheck,
  "Creator Tools": Wrench,
};

const pluginStatusVariant = {
  planned: "registry",
  mocked: "soft",
  experimental: "media-test",
  disabled: "outline",
} as const;

export interface PluginSlotPreviewProps {
  slotName: PluginSlotKind | string;
  description: string;
  status?: keyof typeof pluginStatusVariant;
  placeholder?: ReactNode;
  className?: string;
}

export function PluginSlotPreview({
  slotName,
  description,
  status = "mocked",
  placeholder,
  className,
}: PluginSlotPreviewProps) {
  const Icon = pluginIcons[slotName as PluginSlotKind] ?? Boxes;

  return (
    <SEIPanel as="article" variant="glass-test" padding="md" className={cn("h-full", className)}>
      <div className="space-y-5">
        <div className="flex items-start justify-between gap-4">
          <div className="grid size-12 place-items-center rounded-2xl border border-white/12 bg-white/[0.055] text-white">
            <Icon aria-hidden="true" className="size-5" />
          </div>
          <SEIBadge variant={pluginStatusVariant[status]} size="sm">
            {status}
          </SEIBadge>
        </div>

        <div className="space-y-2">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--sh-color-mist)]">
            Future plugin slot
          </p>
          <h3 className="text-xl font-semibold tracking-[-0.04em]">{slotName}</h3>
          <p className="text-sm leading-relaxed text-[var(--sh-color-cloud)]">{description}</p>
        </div>

        <div className="min-h-28 rounded-[1.1rem] border border-dashed border-white/15 bg-white/[0.035] p-4">
          {placeholder ?? (
            <div className="grid h-full min-h-20 place-items-center text-center text-sm text-[var(--sh-color-mist)]">
              Placeholder only — no plugin runtime or backend connection.
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-2 border-t border-white/10 pt-4">
          <SEIButton size="sm" variant="outline">
            Preview slot
          </SEIButton>
          <SEIButton size="sm" variant="ghost">
            Configure later
          </SEIButton>
        </div>
      </div>
    </SEIPanel>
  );
}

export default memo(PluginSlotPreview, (prevProps, nextProps) => {
  // Simple prop comparison for scalar values and ReactNode placeholders
  return (
    prevProps.slotName === nextProps.slotName &&
    prevProps.description === nextProps.description &&
    prevProps.status === nextProps.status &&
    prevProps.placeholder === nextProps.placeholder &&
    prevProps.className === nextProps.className
  );
});
