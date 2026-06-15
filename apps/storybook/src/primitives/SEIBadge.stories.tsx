import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { SEIBadge } from "@seihouse/ui";
import { Check, AlertTriangle, XCircle, Info } from "lucide-react";

const meta = {
  title: "Primitives/SEIBadge",
  component: SEIBadge,
  tags: ["ai-generated", "needs-work"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
## SEIBadge

A small status indicator or label component for categorization and status display.

### Accessibility Features
- **Semantic Element**: Renders as \`<span>\` for inline status indicators
- **Icon Support**: Icons use \`aria-hidden="true"\` to prevent redundant announcements
- **Color Independence**: Status is conveyed through text, not just color (WCAG 1.4.1)
- **High Contrast**: All variants meet WCAG AA contrast requirements

### Usage Guidelines
- Use \`variant="success"\`, \`"warning"\`, \`"danger"\` for semantic status indicators
- Use \`variant="default"\` or \`"outline"\` for neutral labels
- Keep badge text concise (1-3 words recommended)
        `,
      },
    },
    a11y: {
      config: {
        rules: [{ id: "color-contrast", enabled: true }],
      },
    },
  },
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
        "success",
        "warning",
        "danger",
        "registry",
      ],
      description: "Visual style variant of the badge",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "default" },
      },
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Size of the badge",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "md" },
      },
    },
    icon: {
      control: false,
      description: "Lucide icon to display",
    },
    iconLeft: {
      control: false,
      description: "Custom element to display on the left side",
    },
    children: {
      control: "text",
      description: "Badge label text",
    },
  },
} satisfies Meta<typeof SEIBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

// Smoke check
export const Primary: Story = {
  args: {
    children: "Default",
    variant: "default",
  },
  play: async ({ canvas }) => {
    const badge = canvas.getByText("Default");
    await expect(badge).toBeVisible();
    await expect(badge.tagName).toBe("SPAN");
  },
};

// Variant stories
export const Soft: Story = {
  args: {
    children: "Soft",
    variant: "soft",
  },
};

export const Outline: Story = {
  args: {
    children: "Outline",
    variant: "outline",
  },
};

export const Ghost: Story = {
  args: {
    children: "Ghost",
    variant: "ghost",
  },
};

export const Solid: Story = {
  args: {
    children: "Solid",
    variant: "solid",
  },
};

export const Dark: Story = {
  args: {
    children: "Dark",
    variant: "dark",
  },
};

export const Light: Story = {
  args: {
    children: "Light",
    variant: "light",
  },
};

// Semantic Variants
export const Success: Story = {
  args: {
    children: "Success",
    variant: "success",
  },
};

export const Warning: Story = {
  args: {
    children: "Warning",
    variant: "warning",
  },
};

export const Danger: Story = {
  args: {
    children: "Danger",
    variant: "danger",
  },
};

export const Registry: Story = {
  args: {
    children: "Registry",
    variant: "registry",
  },
};

// Size stories
export const Small: Story = {
  args: {
    children: "Small",
    size: "sm",
  },
};

export const Medium: Story = {
  args: {
    children: "Medium",
    size: "md",
  },
};

export const Large: Story = {
  args: {
    children: "Large",
    size: "lg",
  },
};

// Icon stories
export const WithIcon: Story = {
  args: {
    children: "Verified",
    variant: "success",
    icon: Check,
  },
};

export const WithIconLeft: Story = {
  args: {
    children: "Warning",
    variant: "warning",
    iconLeft: <AlertTriangle className="size-3.5 shrink-0" />,
  },
};

export const WithInfoIcon: Story = {
  args: {
    children: "Info",
    variant: "soft",
    icon: Info,
  },
};

export const WithErrorIcon: Story = {
  args: {
    children: "Error",
    variant: "danger",
    icon: XCircle,
  },
};

// Interactive Playground
export const Playground: Story = {
  args: {
    children: "Badge",
    variant: "default",
    size: "md",
  },
};