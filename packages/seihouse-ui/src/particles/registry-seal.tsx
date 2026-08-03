import type { HTMLAttributes } from "react";
import {
  Archive,
  BadgeCheck,
  CircleDot,
  FileText,
  FlaskConical,
  type LucideIcon,
} from "lucide-react";
import { memo } from "react";

import { cn } from "../styles/cn";
import { registrySealVariants, type RegistrySealVariantProps } from "../styles/variants";

export type RegistryStatus = "draft" | "registered" | "verified" | "archived" | "experimental";

export interface RegistrySealProps
  extends HTMLAttributes<HTMLDivElement>, RegistrySealVariantProps {
  label?: string;
  registryId?: string;
}

const statusMeta: Record<RegistryStatus, { label: string; icon: LucideIcon; dot: string }> = {
  draft: {
    label: "Draft",
    icon: FileText,
    dot: "bg-[var(--sh-color-mist)]",
  },
  registered: {
    label: "Registered",
    icon: CircleDot,
    dot: "bg-[var(--sh-color-sea)] shadow-[0_0_18px_rgba(0,122,255,0.85)]",
  },
  verified: {
    label: "Verified",
    icon: BadgeCheck,
    dot: "bg-[var(--sh-color-success)] shadow-[0_0_18px_rgba(52,199,89,0.75)]",
  },
  archived: {
    label: "Archived",
    icon: Archive,
    dot: "bg-[var(--sh-color-cloud)]",
  },
  experimental: {
    label: "Experimental",
    icon: FlaskConical,
    dot: "bg-[var(--sh-color-accent)] shadow-[0_0_18px_rgba(255,107,53,0.7)]",
  },
};

export function RegistrySeal({
  status = "draft",
  compact,
  label,
  registryId,
  className,
  ...props
}: RegistrySealProps) {
  const meta = statusMeta[status as RegistryStatus];
  const Icon = meta.icon;

  return (
    <div
      className={cn(registrySealVariants({ status, compact }), className)}
      data-registry-status={status}
      {...props}
    >
      <span className={cn("size-2 rounded-full", meta.dot)} aria-hidden="true" />
      <Icon aria-hidden="true" className={cn("shrink-0", compact ? "size-3.5" : "size-4")} />
      <span>{label ?? meta.label}</span>
      {registryId ? (
        <span className="font-mono text-[0.68rem] uppercase tracking-[0.12em] opacity-70">
          {registryId}
        </span>
      ) : null}
    </div>
  );
}

export default memo(RegistrySeal, (prevProps, nextProps) => {
  // Simple prop comparison for scalar values
  return (
    prevProps.status === nextProps.status &&
    prevProps.compact === nextProps.compact &&
    prevProps.label === nextProps.label &&
    prevProps.registryId === nextProps.registryId &&
    prevProps.className === nextProps.className
  );
});
