import { Children } from "react";
import type {
  AnchorHTMLAttributes,
  CSSProperties,
  ElementType,
  HTMLAttributes,
  KeyboardEvent,
  MouseEvent,
  ReactNode,
} from "react";

import { cn } from "../styles/cn";
import { focusRing, seiCardVariants, type SEICardVariantProps } from "../styles/variants";

type SEICardElement = "article" | "div" | "section";
type SEICardMediaElement = "div" | "figure";
type SEICardTitleElement = "h2" | "h3" | "h4" | "h5" | "h6";
type SEICardDescriptionElement = "p" | "div" | "blockquote";
type SEICardPadding = NonNullable<SEICardVariantProps["padding"]>;

interface SEICardRootContentProps extends SEICardVariantProps {
  /** Optional visual identity color for category- or rarity-driven cards. */
  accentColor?: string;
  eyebrow?: ReactNode;
  icon?: ReactNode;
  title?: ReactNode;
  titleAs?: SEICardTitleElement;
  description?: ReactNode;
  metadata?: ReactNode;
  media?: ReactNode;
  actions?: ReactNode;
  footer?: ReactNode;
  children?: ReactNode;
  className?: string;
  contentClassName?: string;
}

type StaticSEICardProps = SEICardRootContentProps &
  Omit<HTMLAttributes<HTMLElement>, "children" | "className" | "onClick" | "title"> & {
    as?: SEICardElement;
    /** Keep this false for static cards; use elevateOnHover for visual feedback. */
    interactive?: false;
    href?: never;
    disabled?: never;
  };

type InteractiveButtonCardProps = SEICardRootContentProps &
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

type InteractiveLinkCardProps = SEICardRootContentProps &
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

const cardAccentStates = cn(
  "before:pointer-events-none before:absolute before:inset-x-[10%] before:top-0 before:z-[1] before:h-px before:content-['']",
  "before:bg-[var(--sh-card-accent)] before:opacity-0 before:transition-opacity",
  "data-[accent=true]:before:opacity-80",
);

const cardContentPadding: Record<SEICardPadding, string> = {
  none: "",
  sm: "p-4",
  md: "p-5",
  lg: "p-6",
};

const legacyMediaInset: Record<SEICardPadding, string> = {
  none: "",
  sm: "-m-4 mb-4",
  md: "-m-5 mb-5",
  lg: "-m-6 mb-6",
};

function hasRenderableContent(value: ReactNode) {
  return Children.toArray(value).some((child) =>
    typeof child === "string" ? child.trim().length > 0 : true,
  );
}

export interface SEICardMediaProps extends HTMLAttributes<HTMLElement> {
  as?: SEICardMediaElement;
}

/** Artwork, a generated-image state, a sigil, an icon treatment, or any custom media. */
export function SEICardMedia({ as = "div", className, ...props }: SEICardMediaProps) {
  const Component = as as ElementType;

  return (
    <Component
      data-slot="card-media"
      className={cn("relative min-w-0 overflow-hidden", className)}
      {...props}
    />
  );
}

export interface SEICardContentProps extends HTMLAttributes<HTMLDivElement> {
  padding?: SEICardPadding;
}

/** Spacing owner for composed cards that use `SEICard padding="none"`. */
export function SEICardContent({ className, padding = "none", ...props }: SEICardContentProps) {
  return (
    <div
      data-slot="card-content"
      className={cn("min-w-0 space-y-4", cardContentPadding[padding], className)}
      {...props}
    />
  );
}

export interface SEICardTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  as?: SEICardTitleElement;
}

export function SEICardTitle({ as = "h3", className, ...props }: SEICardTitleProps) {
  const Component = as as ElementType;

  return (
    <Component
      data-slot="card-title"
      className={cn(
        "min-w-0 break-words text-lg font-semibold leading-tight tracking-[-0.03em] text-current",
        className,
      )}
      {...props}
    />
  );
}

export interface SEICardDescriptionProps extends HTMLAttributes<HTMLElement> {
  as?: SEICardDescriptionElement;
}

/** Description or lore copy; use `as="blockquote"` when the content is a quotation. */
export function SEICardDescription({ as = "p", className, ...props }: SEICardDescriptionProps) {
  const Component = as as ElementType;

  return (
    <Component
      data-slot="card-description"
      className={cn("text-sm leading-relaxed text-[var(--sh-text-muted)]", className)}
      {...props}
    />
  );
}

export type SEICardBodyProps = HTMLAttributes<HTMLDivElement>;

export function SEICardBody({ className, ...props }: SEICardBodyProps) {
  return <div data-slot="card-body" className={cn("min-w-0 space-y-3", className)} {...props} />;
}

export type SEICardMetadataProps = HTMLAttributes<HTMLDivElement>;

export function SEICardMetadata({ className, ...props }: SEICardMetadataProps) {
  return (
    <div
      data-slot="card-metadata"
      className={cn(
        "flex min-w-0 flex-wrap items-center gap-x-3 gap-y-2 text-xs text-[var(--sh-text-subtle)]",
        className,
      )}
      {...props}
    />
  );
}

export type SEICardActionsProps = HTMLAttributes<HTMLDivElement>;

export function SEICardActions({ className, ...props }: SEICardActionsProps) {
  return (
    <div
      data-slot="card-actions"
      className={cn("flex min-w-0 flex-wrap items-center gap-2", className)}
      {...props}
    />
  );
}

export type SEICardFooterProps = HTMLAttributes<HTMLDivElement>;

export function SEICardFooter({ className, ...props }: SEICardFooterProps) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        "border-t border-[var(--sh-border)] pt-4 text-sm text-[var(--sh-text-subtle)]",
        className,
      )}
      {...props}
    />
  );
}

export interface SEICardHeaderProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "children" | "title"
> {
  eyebrow?: ReactNode;
  icon?: ReactNode;
  title?: ReactNode;
  titleAs?: SEICardTitleElement;
  description?: ReactNode;
  metadata?: ReactNode;
  actions?: ReactNode;
  iconClassName?: string;
}

/**
 * Flexible identity/header region for category, icon, title, lore, metadata,
 * and compact controls. Product cards can omit it and compose the lower-level
 * regions directly when their ceremony or layout needs a different order.
 */
export function SEICardHeader({
  eyebrow,
  icon,
  title,
  titleAs,
  description,
  metadata,
  actions,
  iconClassName,
  className,
  ...props
}: SEICardHeaderProps) {
  const hasTopline = hasRenderableContent(eyebrow) || hasRenderableContent(metadata);
  const hasTitleRow = hasRenderableContent(title) || hasRenderableContent(actions);

  return (
    <div
      data-slot="card-header"
      className={cn("flex min-w-0 items-start gap-3", className)}
      {...props}
    >
      {hasRenderableContent(icon) ? (
        <div
          data-slot="card-icon"
          className={cn(
            "flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-xl border",
            "border-[var(--sh-card-accent-border,var(--sh-border))] bg-[var(--sh-interactive-surface)]",
            "text-[var(--sh-card-accent,var(--sh-text-muted))]",
            iconClassName,
          )}
        >
          {icon}
        </div>
      ) : null}

      <div className="min-w-0 flex-1 space-y-4">
        {hasTopline ? (
          <div className="flex flex-wrap items-center justify-between gap-2">
            {hasRenderableContent(eyebrow) ? (
              <div className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--sh-text-subtle)]">
                {eyebrow}
              </div>
            ) : null}
            {hasRenderableContent(metadata) ? (
              <SEICardMetadata className="text-sm">{metadata}</SEICardMetadata>
            ) : null}
          </div>
        ) : null}

        {hasTitleRow ? (
          <div className="flex min-w-0 items-start justify-between gap-4">
            {hasRenderableContent(title) ? <SEICardTitle as={titleAs}>{title}</SEICardTitle> : null}
            {hasRenderableContent(actions) ? (
              <SEICardActions className="shrink-0">{actions}</SEICardActions>
            ) : null}
          </div>
        ) : null}

        {hasRenderableContent(description) ? (
          <SEICardDescription>{description}</SEICardDescription>
        ) : null}
      </div>
    </div>
  );
}

interface CardContentProps {
  eyebrow?: ReactNode;
  icon?: ReactNode;
  title?: ReactNode;
  titleAs?: SEICardTitleElement;
  description?: ReactNode;
  metadata?: ReactNode;
  media?: ReactNode;
  actions?: ReactNode;
  footer?: ReactNode;
  children?: ReactNode;
  contentClassName?: string;
  padding?: SEICardVariantProps["padding"];
}

function CardContent({
  eyebrow,
  icon,
  title,
  titleAs,
  description,
  metadata,
  media,
  actions,
  footer,
  children,
  contentClassName,
  padding,
}: CardContentProps) {
  const resolvedPadding = padding ?? "md";

  return (
    <>
      {hasRenderableContent(media) ? (
        <SEICardMedia className={legacyMediaInset[resolvedPadding]}>{media}</SEICardMedia>
      ) : null}
      <SEICardContent className={contentClassName}>
        {hasRenderableContent(eyebrow) ||
        hasRenderableContent(icon) ||
        hasRenderableContent(title) ||
        hasRenderableContent(description) ||
        hasRenderableContent(metadata) ||
        hasRenderableContent(actions) ? (
          <SEICardHeader
            eyebrow={eyebrow}
            icon={icon}
            title={title}
            titleAs={titleAs}
            description={description}
            metadata={metadata}
            actions={actions}
          />
        ) : null}

        {children}

        {hasRenderableContent(footer) ? <SEICardFooter>{footer}</SEICardFooter> : null}
      </SEICardContent>
    </>
  );
}

function getCardClassName(
  { className, variant, padding, elevateOnHover }: SEICardRootContentProps,
  interactive = false,
) {
  return cn(
    seiCardVariants({
      variant,
      padding,
      elevateOnHover: interactive || elevateOnHover,
    }),
    cardAccentStates,
    interactive ? interactiveCardStates : undefined,
    className,
  );
}

type SEICardAccentStyle = CSSProperties & {
  "--sh-card-accent"?: string;
  "--sh-card-accent-border"?: string;
  "--sh-card-accent-glow"?: string;
};

function getCardStyle(style: CSSProperties | undefined, accentColor: string | undefined) {
  if (!accentColor) return style;

  return {
    ...style,
    "--sh-card-accent": accentColor,
    "--sh-card-accent-border": `color-mix(in srgb, ${accentColor} 38%, transparent)`,
    "--sh-card-accent-glow": `color-mix(in srgb, ${accentColor} 18%, transparent)`,
  } as SEICardAccentStyle;
}

function getCardContent({
  eyebrow,
  icon,
  title,
  titleAs,
  description,
  metadata,
  media,
  actions,
  footer,
  children,
  contentClassName,
  padding,
}: SEICardRootContentProps) {
  return (
    <CardContent
      eyebrow={eyebrow}
      icon={icon}
      title={title}
      titleAs={titleAs}
      description={description}
      metadata={metadata}
      media={media}
      actions={actions}
      footer={footer}
      contentClassName={contentClassName}
      padding={padding}
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
  accentColor,
  eyebrow,
  icon,
  title,
  titleAs,
  description,
  metadata,
  media,
  actions,
  footer,
  children,
  style,
  interactive: _interactive,
  ...rootProps
}: StaticSEICardProps) {
  const Component = as as ElementType;

  return (
    <Component
      {...rootProps}
      data-accent={accentColor ? "true" : undefined}
      style={getCardStyle(style, accentColor)}
      className={getCardClassName({ className, variant, padding, elevateOnHover })}
    >
      {getCardContent({
        eyebrow,
        icon,
        title,
        titleAs,
        description,
        metadata,
        media,
        actions,
        footer,
        children,
        contentClassName,
        padding,
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
  accentColor,
  eyebrow,
  icon,
  title,
  titleAs,
  description,
  metadata,
  media,
  actions,
  footer,
  children,
  disabled,
  href,
  onClick,
  style,
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
      data-accent={accentColor ? "true" : undefined}
      style={getCardStyle(style, accentColor)}
      href={disabled ? undefined : href}
      onClick={handleLinkClick}
      aria-disabled={disabled || undefined}
      tabIndex={disabled ? -1 : linkProps.tabIndex}
      className={getCardClassName({ className, variant, padding, elevateOnHover }, true)}
    >
      {getCardContent({
        eyebrow,
        icon,
        title,
        titleAs,
        description,
        metadata,
        media,
        actions,
        footer,
        children,
        contentClassName,
        padding,
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
  accentColor,
  eyebrow,
  icon,
  title,
  titleAs,
  description,
  metadata,
  media,
  actions,
  footer,
  children,
  disabled,
  onClick,
  onKeyDown,
  style,
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
      data-accent={accentColor ? "true" : undefined}
      style={getCardStyle(style, accentColor)}
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled || undefined}
      onClick={disabled ? undefined : onClick}
      onKeyDown={handleButtonKeyDown}
      className={getCardClassName({ className, variant, padding, elevateOnHover }, true)}
    >
      {getCardContent({
        eyebrow,
        icon,
        title,
        titleAs,
        description,
        metadata,
        media,
        actions,
        footer,
        children,
        contentClassName,
        padding,
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
