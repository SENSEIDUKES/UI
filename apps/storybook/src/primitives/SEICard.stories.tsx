import type { Meta, StoryObj } from "@storybook/react-vite";
import { SEICard } from "@seihouse/ui";
import { SEIButton } from "@seihouse/ui";
import { MoreHorizontal, ExternalLink } from "lucide-react";

const meta = {
  title: "Primitives/SEICard",
  component: SEICard,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
## SEICard

A flexible card component for displaying content with optional media, actions, and footer.

### Accessibility Features
- **Semantic Element**: Defaults to \`<article>\` for self-contained content
- **Flexible Semantics**: Can render as \`article\`, \`div\`, or \`section\` via the \`as\` prop
- **Heading Hierarchy**: Title renders as \`<h3>\` - ensure proper heading order in context
- **Actionable Cards**: An action card requires \`href\` for a link or \`onClick\` for a keyboard-operable button role
- **Visual Hover Treatment**: \`elevateOnHover\` adds visual elevation only; it does not make a card clickable
- **ARIA Support**: Passes through all ARIA attributes

### Usage Guidelines
- Use \`variant="default"\` for standard content cards
- Use \`elevateOnHover={true}\` for decorative hover elevation
- Use \`interactive\` with \`href\` or \`onClick\` for a whole-card action; do not nest controls inside it
- Use \`eyebrow\` for category or metadata above the title
- Use \`footer\` for secondary actions or metadata at the bottom
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
