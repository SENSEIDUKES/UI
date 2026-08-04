import type {
  AnchorHTMLAttributes,
  ElementType,
  HTMLAttributes,
  KeyboardEvent,
  MouseEvent,
  ReactNode,
} from "react";

import { cn } from "../styles/cn";
import { focusRing, seiCardVariants, type SEICardVariantProps } from "../styles/variants";

type SEICardElement = "article" | "div" | "section";

interface SEICardContentProps extends SEICardVariantProps {
  eyebrow?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  metadata?: ReactNode;
  media?: ReactNode;
  actions?: ReactNode;
  footer?: ReactNode;
  children?: ReactNode;
  className?: string;
  contentClassName?: string;
}

type StaticSEICardProps = SEICardContentProps &
  Omit<HTMLAttributes<HTMLElement>, "children" | "className" | "onClick" | "title"> & {
    as?: SEICardElement;
    /** Keep this false for static cards; use elevateOnHover for visual feedback. */
    interactive?: false;
    href?: never;
    disabled?: never;
  };

type InteractiveButtonCardProps = SEICardContentProps &
  Omit<HTMLAttributes<HTMLDivElement>, "children" | "className" | "onClick" | "title"> & {
    /**
     * Enables the button-card contract. Provide an action; Enter and Space both
     * activate it, and disabled cards are removed from the tab order.
     */
    interactive: true;
    href?: never;
    disabled?: boolean;
    onClick: (event: MouseEvent<HTMLDivElement>) => void;
  };

type InteractiveLinkCardProps = SEICardContentProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "children" | "className" | "href" | "title"> & {
    /** Enables the link-card contract. */
    interactive: true;
    href: string;
    disabled?: boolean;
  };

/**
 * A semantic card surface.
 *
 * Use elevateOnHover for a visual-only hover treatment. To make a whole card
 * actionable, set interactive and supply either href (a native link) or
 * onClick (a keyboard-operable button role). Do not place interactive
 * descendants inside an interactive card.
 */
export type SEICardProps =
  | StaticSEICardProps
  | InteractiveButtonCardProps
  | InteractiveLinkCardProps;

const interactiveCardStates = cn(
  "cursor-pointer active:translate-y-0",
  "aria-disabled:pointer-events-none aria-disabled:cursor-not-allowed aria-disabled:opacity-45",
  "motion-reduce:active:translate-y-0",
  focusRing,
);

interface CardContentProps {
  eyebrow?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  metadata?: ReactNode;
  media?: ReactNode;
  actions?: ReactNode;
  footer?: ReactNode;
  children?: ReactNode;
  contentClassName?: string;
}

function CardContent({
  eyebrow,
  title,
  description,
  metadata,
  media,
  actions,
  footer,
  children,
  contentClassName,
}: CardContentProps) {
  return (
    <>
      {media ? <div className="-m-5 mb-5 overflow-hidden">{media}</div> : null}
      <div className={cn("space-y-4", contentClassName)}>
        {(eyebrow || metadata) && (
          <div className="flex flex-wrap items-center justify-between gap-2">
            {eyebrow ? (
              <div className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--sh-text-subtle)]">
                {eyebrow}
              </div>
            ) : null}
            {metadata ? (
              <div className="text-sm text-[var(--sh-text-subtle)]">{metadata}</div>
            ) : null}
          </div>
        )}

        {(title || actions) && (
          <div className="flex items-start justify-between gap-4">
            {title ? (
              <h3 className="text-lg font-semibold leading-tight tracking-[-0.03em] text-current">
                {title}
              </h3>
            ) : null}
            {actions ? <div className="shrink-0">{actions}</div> : null}
          </div>
        )}

        {description ? (
          <p className="text-sm leading-relaxed text-[var(--sh-text-muted)]">{description}</p>
        ) : null}

        {children}

        {footer ? (
          <div className="border-t border-[var(--sh-border)] pt-4 text-sm text-[var(--sh-text-subtle)]">
            {footer}
          </div>
        ) : null}
      </div>
    </>
  );
}

function getCardClassName(
  { className, variant, padding, elevateOnHover }: SEICardContentProps,
  interactive = false,
) {
  return cn(
    seiCardVariants({
      variant,
      padding,
      elevateOnHover: interactive || elevateOnHover,
    }),
    interactive ? interactiveCardStates : undefined,
    className,
  );
}

function getCardContent({
  eyebrow,
  title,
  description,
  metadata,
  media,
  actions,
  footer,
  children,
  contentClassName,
}: SEICardContentProps) {
  return (
    <CardContent
      eyebrow={eyebrow}
      title={title}
      description={description}
      metadata={metadata}
      media={media}
      actions={actions}
      footer={footer}
      contentClassName={contentClassName}
    >
      {children}
    </CardContent>
  );
}

function StaticCard({
  as = "article",
  className,
  contentClassName,
  variant,
  padding,
  elevateOnHover,
  eyebrow,
  title,
  description,
  metadata,
  media,
  actions,
  footer,
  children,
  interactive: _interactive,
  ...rootProps
}: StaticSEICardProps) {
  const Component = as as ElementType;

  return (
    <Component
      {...rootProps}
      className={getCardClassName({ className, variant, padding, elevateOnHover })}
    >
      {getCardContent({
        eyebrow,
        title,
        description,
        metadata,
        media,
        actions,
        footer,
        children,
        contentClassName,
      })}
    </Component>
  );
}

function InteractiveLinkCard({
  className,
  contentClassName,
  variant,
  padding,
  elevateOnHover,
  eyebrow,
  title,
  description,
  metadata,
  media,
  actions,
  footer,
  children,
  disabled,
  href,
  onClick,
  interactive: _interactive,
  ...linkProps
}: InteractiveLinkCardProps) {
  const handleLinkClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (disabled) {
      event.preventDefault();
      return;
    }
    onClick?.(event);
  };

  return (
    <a
      {...linkProps}
      href={href}
      onClick={handleLinkClick}
      aria-disabled={disabled || undefined}
      tabIndex={disabled ? -1 : linkProps.tabIndex}
      className={getCardClassName({ className, variant, padding, elevateOnHover }, true)}
    >
      {getCardContent({
        eyebrow,
        title,
        description,
        metadata,
        media,
        actions,
        footer,
        children,
        contentClassName,
      })}
    </a>
  );
}

function InteractiveButtonCard({
  className,
  contentClassName,
  variant,
  padding,
  elevateOnHover,
  eyebrow,
  title,
  description,
  metadata,
  media,
  actions,
  footer,
  children,
  disabled,
  onClick,
  onKeyDown,
  interactive: _interactive,
  ...buttonProps
}: InteractiveButtonCardProps) {
  const handleButtonKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (disabled) return;
    onKeyDown?.(event);
    if (event.defaultPrevented || (event.key !== "Enter" && event.key !== " ")) return;

    event.preventDefault();
    event.currentTarget.click();
  };

  return (
    <div
      {...buttonProps}
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled || undefined}
      onClick={disabled ? undefined : onClick}
      onKeyDown={handleButtonKeyDown}
      className={getCardClassName({ className, variant, padding, elevateOnHover }, true)}
    >
      {getCardContent({
        eyebrow,
        title,
        description,
        metadata,
        media,
        actions,
        footer,
        children,
        contentClassName,
      })}
    </div>
  );
}

function isInteractiveLinkCard(
  props: InteractiveButtonCardProps | InteractiveLinkCardProps,
): props is InteractiveLinkCardProps {
  return "href" in props && typeof props.href === "string";
}

export function SEICard(props: SEICardProps) {
  if (props.interactive) {
    return isInteractiveLinkCard(props) ? (
      <InteractiveLinkCard {...props} />
    ) : (
      <InteractiveButtonCard {...props} />
    );
  }

  return <StaticCard {...props} />;
}
