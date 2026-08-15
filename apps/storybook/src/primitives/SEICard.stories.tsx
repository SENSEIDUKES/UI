import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  SEIBadge,
  SEIButton,
  SEICard,
  SEICardActions,
  SEICardBody,
  SEICardContent,
  SEICardDescription,
  SEICardFooter,
  SEICardHeader,
  SEICardMedia,
  SEICardMetadata,
  SEICardTitle,
} from "@seihouse/ui";
import {
  BookOpen,
  ExternalLink,
  Gem,
  MapPin,
  MoreHorizontal,
  Play,
  Sparkles,
  Volume2,
} from "lucide-react";

const meta = {
  title: "Primitives/SEICard",
  component: SEICard,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
## SEICard

A flexible card surface for simple content and advanced product-specific compositions.

### Accessibility Features
- **Semantic Element**: Defaults to \`<article>\` for self-contained content
- **Flexible Semantics**: Can render as \`article\`, \`div\`, or \`section\` via the \`as\` prop
- **Heading Hierarchy**: Title renders as \`<h3>\` - ensure proper heading order in context
- **Configurable Headings**: Use \`titleAs\` or \`SEICardTitle as\` when a composed card needs a different heading level
- **Actionable Cards**: An action card requires \`href\` for a link or \`onClick\` for a keyboard-operable button role
- **Visual Hover Treatment**: \`elevateOnHover\` adds visual elevation only; it does not make a card clickable
- **ARIA Support**: Passes through all ARIA attributes

### Usage Guidelines
- Use \`variant="default"\` for standard content cards
- Use \`elevateOnHover={true}\` for decorative hover elevation
- Use \`interactive\` with \`href\` or \`onClick\` for a whole-card action; do not nest controls inside it
- Use \`eyebrow\` for category or metadata above the title
- Use \`footer\` for secondary actions or metadata at the bottom
- Use the compound regions (\`SEICardMedia\`, \`SEICardContent\`, \`SEICardHeader\`, \`SEICardBody\`, \`SEICardMetadata\`, \`SEICardActions\`, and \`SEICardFooter\`) when a product card needs its own content order
- In equal-height grids, stretch the card with \`h-full\` and add \`mt-auto\` to the trailing region so actions or a footer anchor to the bottom
- Use \`accentColor\` for entity category or rarity identity; product components still own their stronger artwork and effects
- Keep System Panels on \`SEIPanel\`; they are not card compositions
        `,
      },
    },
    a11y: {
      config: {
        rules: [
          { id: "color-contrast", enabled: true },
          { id: "heading-order", enabled: true },
        ],
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: [
        "default",
        "soft",
        "outline",
        "ghost",
        "solid",
        "dark",
        "light",
        "glass-test",
        "media-test",
      ],
      description: "Visual style variant of the card",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "default" },
      },
    },
    padding: {
      control: "select",
      options: ["none", "sm", "md", "lg"],
      description: "Internal padding of the card",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "md" },
      },
    },
    elevateOnHover: {
      control: "boolean",
      description: "Adds visual hover elevation without changing card semantics",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    as: {
      control: "select",
      options: ["article", "div", "section"],
      description: "HTML element to render",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "article" },
      },
    },
    eyebrow: {
      control: "text",
      description: "Small label above the title (category, tag, etc.)",
    },
    title: {
      control: "text",
      description: "Card title (renders as h3)",
    },
    titleAs: {
      control: "select",
      options: ["h2", "h3", "h4", "h5", "h6"],
      description: "Semantic heading level for the convenience title slot",
    },
    accentColor: {
      control: "color",
      description: "Optional entity-category or rarity accent color",
    },
    description: {
      control: "text",
      description: "Card description text",
    },
    metadata: {
      control: "text",
      description: "Secondary info displayed next to eyebrow",
    },
    children: {
      control: "text",
      description: "Main card content",
    },
  },
} satisfies Meta<typeof SEICard>;

export default meta;
type Story = StoryObj<typeof meta>;

// Variant Stories
export const Default: Story = {
  args: {
    title: "Default Card",
    description: "This is a default card with standard styling.",
    variant: "default",
  },
};

export const Soft: Story = {
  args: {
    title: "Soft Card",
    description: "This card uses the soft variant with a subtle blue tint.",
    variant: "soft",
  },
};

export const Outline: Story = {
  args: {
    title: "Outline Card",
    description: "This card uses the outline variant with a transparent background.",
    variant: "outline",
  },
};

export const Ghost: Story = {
  args: {
    title: "Ghost Card",
    description: "This card uses the ghost variant with no border or shadow.",
    variant: "ghost",
  },
};

export const Solid: Story = {
  args: {
    title: "Solid Card",
    description: "This card uses the solid variant with a blue background.",
    variant: "solid",
  },
};

export const Dark: Story = {
  args: {
    title: "Dark Card",
    description: "This card uses the dark variant.",
    variant: "dark",
  },
};

export const Light: Story = {
  args: {
    title: "Light Card",
    description: "This card uses the light variant.",
    variant: "light",
  },
};

// Padding Stories
export const NoPadding: Story = {
  args: {
    title: "No Padding",
    description: "Card with no internal padding.",
    padding: "none",
  },
};

export const SmallPadding: Story = {
  args: {
    title: "Small Padding",
    description: "Card with small internal padding.",
    padding: "sm",
  },
};

export const MediumPadding: Story = {
  args: {
    title: "Medium Padding",
    description: "Card with medium internal padding (default).",
    padding: "md",
  },
};

export const LargePadding: Story = {
  args: {
    title: "Large Padding",
    description: "Card with large internal padding.",
    padding: "lg",
  },
};

// Hover treatment and whole-card action stories
export const HoverElevation: Story = {
  args: {
    title: "Elevated Card",
    description: "This card has visual hover elevation but remains static content.",
    elevateOnHover: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Use visual elevation for presentation-only cards. It does not add focus, click, or keyboard behavior.",
      },
    },
  },
};

export const InteractiveAction: Story = {
  render: () => (
    <SEICard
      interactive
      onClick={() => undefined}
      title="Interactive Card"
      description="This whole card is a keyboard-operable button action."
    />
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Action cards receive button semantics, Enter and Space activation, a focus-visible ring, and disabled behavior.",
      },
    },
  },
};

export const InteractiveLink: Story = {
  render: () => (
    <SEICard
      interactive
      href="#linked-card"
      title="Linked Card"
      description="This whole card preserves native link semantics."
    />
  ),
  parameters: {
    docs: {
      description: {
        story: "Navigation cards render as native links, including their normal keyboard behavior.",
      },
    },
  },
};

// Content Stories
export const WithEyebrow: Story = {
  args: {
    eyebrow: "Category",
    title: "Card with Eyebrow",
    description: "This card has an eyebrow label above the title.",
  },
};

export const WithMetadata: Story = {
  args: {
    eyebrow: "News",
    metadata: "2 hours ago",
    title: "Card with Metadata",
    description: "This card shows metadata next to the eyebrow.",
  },
};

export const WithActions: Story = {
  args: {
    title: "Card with Actions",
    description: "This card has action buttons in the header.",
    actions: (
      <SEIButton variant="ghost" size="sm" icon={MoreHorizontal} aria-label="More options" />
    ),
  },
};

export const WithFooter: Story = {
  args: {
    title: "Card with Footer",
    description: "This card has a footer section at the bottom.",
    footer: "Last updated: June 15, 2026",
  },
};

export const WithMedia: Story = {
  args: {
    title: "Card with Media",
    description: "This card has a media area at the top.",
    media: (
      <div className="h-48 w-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
        <span className="text-sm text-white/50">Media Placeholder</span>
      </div>
    ),
  },
};

// Complete Example
export const CompleteExample: Story = {
  args: {
    eyebrow: "Featured",
    metadata: "New",
    title: "Complete Card Example",
    description:
      "This card demonstrates all available features including eyebrow, metadata, actions, and footer.",
    elevateOnHover: true,
    actions: (
      <div className="flex gap-2">
        <SEIButton variant="ghost" size="sm" icon={ExternalLink} aria-label="Open external link" />
        <SEIButton variant="ghost" size="sm" icon={MoreHorizontal} aria-label="More options" />
      </div>
    ),
    footer: (
      <div className="flex items-center justify-between">
        <span>By Author Name</span>
        <span>5 min read</span>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: "A complete example showing all card features working together.",
      },
    },
  },
};

/**
 * Product-shaped examples prove that one foundation can support different
 * information hierarchies. These are composition examples, not finished
 * Celestial Library cards and do not import any application feature.
 */
export const SharedProductFoundation: Story = {
  render: () => (
    <div className="grid w-[min(72rem,calc(100vw-2rem))] grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <SEICard variant="media-test" padding="none" accentColor="#04ACFF" className="h-full">
        <SEICardMedia className="flex aspect-[4/3] items-center justify-center bg-[radial-gradient(circle_at_center,rgba(4,172,255,0.2),transparent_58%),linear-gradient(145deg,#07121f,#03070d)]">
          <div className="absolute inset-5 rounded-2xl border border-dashed border-[var(--sh-card-accent-border)]" />
          <div className="relative flex flex-col items-center gap-2 text-center">
            <Sparkles aria-hidden="true" className="size-7 text-[var(--sh-card-accent)]" />
            <span className="text-xs font-bold uppercase tracking-[0.18em]">Manifest</span>
            <span className="text-xs text-[var(--sh-text-subtle)]">Awaken portrait</span>
          </div>
        </SEICardMedia>
        <SEICardContent padding="md">
          <SEICardHeader
            eyebrow="Reveal · Human portrait"
            title="Lady Aria of the Azure Gate"
            description="A Codex-backed identity can show existing artwork or a clear generation state."
          />
          <SEICardMetadata>
            <span>First revealed · Chapter 4</span>
            <span>Portrait available</span>
          </SEICardMetadata>
          <SEICardActions className="mt-auto">
            <SEIButton size="sm" variant="solid" icon={Sparkles}>
              Manifest
            </SEIButton>
            <SEIButton size="sm" variant="ghost" icon={BookOpen}>
              Open Codex
            </SEIButton>
          </SEICardActions>
        </SEICardContent>
      </SEICard>

      <SEICard variant="media-test" padding="none" accentColor="#8B5CF6" className="h-full">
        <SEICardMedia className="flex aspect-[21/9] items-end bg-[linear-gradient(180deg,transparent,rgba(3,7,13,0.94)),radial-gradient(circle_at_30%_15%,rgba(139,92,246,0.38),transparent_45%),#111827] p-5">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-white/80">
            <MapPin aria-hidden="true" className="size-4" /> Curated world backdrop
          </div>
        </SEICardMedia>
        <SEICardContent padding="md">
          <SEICardHeader
            icon={<Volume2 aria-hidden="true" className="size-5" />}
            eyebrow="World · Bestiary"
            title="Apex Abyss Beast"
          />
          <SEICardBody>
            <SEICardDescription
              as="blockquote"
              className="border-l-2 border-[var(--sh-card-accent-border)] pl-3 italic"
            >
              Its call carries farther than its shadow, and neither arrives alone.
            </SEICardDescription>
          </SEICardBody>
          <SEICardActions className="mt-auto">
            <SEIButton fullWidth size="sm" variant="outline" icon={Play}>
              Play creature echo
            </SEIButton>
          </SEICardActions>
        </SEICardContent>
      </SEICard>

      <SEICard
        variant="dark"
        padding="none"
        accentColor="#F59E0B"
        elevateOnHover
        className="h-full"
      >
        <SEICardContent padding="md">
          <SEICardHeader
            icon={<Gem aria-hidden="true" className="size-5" />}
            eyebrow={
              <SEIBadge variant="warning" size="sm">
                Legendary relic
              </SEIBadge>
            }
            title="Compass of Returning Stars"
            description="A compact gallery card can omit media and lead with a sigil, rarity, and reward value."
          />
          <SEICardMetadata className="rounded-xl border border-[var(--sh-border)] bg-[var(--sh-interactive-surface)] p-3">
            <strong className="text-[var(--sh-text-primary)]">+120 Qi</strong>
            <span>+15 Sect Merit</span>
            <span>Milestone · Homebound</span>
          </SEICardMetadata>
          <SEICardFooter className="mt-auto flex items-center justify-between gap-3">
            <span>Claim available</span>
            <SEIButton size="sm" variant="ghost">
              Inspect
            </SEIButton>
          </SEICardFooter>
        </SEICardContent>
      </SEICard>
    </div>
  ),
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        story:
          "Codex, World, and compact Relic examples share the same structural base while keeping different media, lore, metadata, and action arrangements.",
      },
    },
  },
};

export const CeremonialRelicFoundation: Story = {
  render: () => (
    <div className="w-[min(30rem,calc(100vw-2rem))]">
      <SEICard variant="media-test" padding="none" accentColor="#F59E0B">
        <SEICardMedia className="flex aspect-[4/3] items-center justify-center bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.22),transparent_48%),#08090d]">
          <div className="absolute size-44 rounded-full border border-[var(--sh-card-accent-border)]" />
          <div className="absolute size-32 rotate-45 rounded-3xl border border-[var(--sh-card-accent-border)]" />
          <Gem
            aria-hidden="true"
            className="relative size-14 text-[var(--sh-card-accent)] drop-shadow-[0_0_22px_var(--sh-card-accent-glow)]"
          />
        </SEICardMedia>
        <SEICardContent padding="lg" className="text-center">
          <SEICardMetadata className="justify-center font-bold uppercase tracking-[0.18em] text-[var(--sh-card-accent)]">
            Legendary relic
          </SEICardMetadata>
          <SEICardTitle as="h3" className="text-2xl">
            Compass of Returning Stars
          </SEICardTitle>
          <SEICardDescription className="mx-auto max-w-sm font-serif italic">
            The ceremonial card can arrange its sigil, lore, reward, and claim action independently
            while retaining the shared surface and spacing contract.
          </SEICardDescription>
          <SEICardMetadata className="justify-center">
            <span>Reward · 120 Qi</span>
            <span>Requirement · Homebound milestone</span>
          </SEICardMetadata>
          <SEICardActions className="justify-center pt-2">
            <SEIButton variant="solid" icon={Gem}>
              Claim Relic
            </SEIButton>
          </SEICardActions>
        </SEICardContent>
      </SEICard>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "The shared card owns structure, spacing, semantics, and accent hooks; the composed Relic experience remains free to add stronger ceremony and effects.",
      },
    },
  },
};

// Interactive Playground
export const Playground: Story = {
  args: {
    title: "Playground Card",
    description: "Use the controls panel to experiment with different prop combinations.",
    variant: "default",
    padding: "md",
    elevateOnHover: false,
  },
  parameters: {
    docs: {
      description: {
        story: "Use the controls panel to experiment with different prop combinations.",
      },
    },
  },
};
