import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { SEIButton } from "@seihouse/ui";
import { Plus, ArrowRight, Mail } from "lucide-react";

const meta = {
  title: "Primitives/SEIButton",
  component: SEIButton,
  tags: ["ai-generated", "needs-work"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
## SEIButton

A versatile button component with multiple variants, sizes, and states.

### Accessibility Features
- **Keyboard Navigation**: Fully keyboard accessible with Tab and Enter/Space activation
- **Focus Management**: Visible focus ring with \`focus-visible\` styles for keyboard users
- **Loading State**: Sets \`aria-busy="true"\` when loading, disabling interaction
- **Disabled State**: Uses \`disabled\` attribute for proper screen reader announcement
- **Icon Support**: Icons use \`aria-hidden="true"\` to prevent redundant announcements
- **Icon-Only Buttons**: Use \`data-icon-only\` attribute for proper sizing when no text label is present

### Usage Guidelines
- Use \`variant="solid"\` for primary actions
- Use \`variant="default"\` for secondary actions
- Use \`variant="ghost"\` for tertiary actions
- Always provide a text label or \`aria-label\` for icon-only buttons
        `,
      },
    },
    a11y: {
      config: {
        rules: [{ id: "button-name", enabled: true }],
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
      ],
      description: "Visual style variant of the button",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "default" },
      },
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Size of the button",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "md" },
      },
    },
    fullWidth: {
      control: "boolean",
      description: "Whether the button should take full width",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    disabled: {
      control: "boolean",
      description: "Disables the button and applies disabled styles",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    loading: {
      control: "boolean",
      description: "Shows loading spinner and sets aria-busy",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    icon: {
      control: false,
      description: "Lucide icon to display (renders in center position)",
    },
    iconLeft: {
      control: false,
      description: "Custom element to display on the left side",
    },
    iconRight: {
      control: false,
      description: "Custom element to display on the right side",
    },
    children: {
      control: "text",
      description: "Button label text",
    },
  },
} satisfies Meta<typeof SEIButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// Smoke check with play function
export const Primary: Story = {
  args: {
    children: "Default Button",
    variant: "default",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name: /default button/i });
    await expect(button).toBeVisible();
    // Verify aria-busy is not set when not loading
    await expect(button).not.toHaveAttribute("aria-busy");
  },
};

// Variant stories - no play needed (static variants)
export const Soft: Story = {
  args: {
    children: "Soft Button",
    variant: "soft",
  },
};

export const Outline: Story = {
  args: {
    children: "Outline Button",
    variant: "outline",
  },
};

export const Ghost: Story = {
  args: {
    children: "Ghost Button",
    variant: "ghost",
  },
};

export const Solid: Story = {
  args: {
    children: "Solid Button",
    variant: "solid",
  },
};

export const Dark: Story = {
  args: {
    children: "Dark Button",
    variant: "dark",
  },
};

export const Light: Story = {
  args: {
    children: "Light Button",
    variant: "light",
  },
};

export const GlassTest: Story = {
  args: {
    children: "Glass Button",
    variant: "glass-test",
  },
};

export const MediaTest: Story = {
  args: {
    children: "Media Button",
    variant: "media-test",
  },
};

// Size stories
export const Small: Story = {
  args: {
    children: "Small Button",
    size: "sm",
  },
};

export const Medium: Story = {
  args: {
    children: "Medium Button",
    size: "md",
  },
};

export const Large: Story = {
  args: {
    children: "Large Button",
    size: "lg",
  },
};

// State stories with meaningful play functions
export const Disabled: Story = {
  args: {
    children: "Disabled Button",
    disabled: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name: /disabled button/i });
    await expect(button).toBeDisabled();
  },
};

export const Loading: Story = {
  args: {
    children: "Loading Button",
    loading: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name: /loading button/i });
    // Loading state sets aria-busy="true"
    await expect(button).toHaveAttribute("aria-busy", "true");
    // Button is automatically disabled during loading
    await expect(button).toBeDisabled();
  },
};

export const FullWidth: Story = {
  args: {
    children: "Full Width Button",
    fullWidth: true,
  },
};

// Icon stories
export const WithIcon: Story = {
  args: {
    children: "With Icon",
    icon: Plus,
  },
};

export const WithIconLeft: Story = {
  args: {
    children: "With Left Icon",
    iconLeft: <Mail className="size-4 shrink-0" />,
  },
};

export const WithIconRight: Story = {
  args: {
    children: "With Right Icon",
    iconRight: <ArrowRight className="size-4 shrink-0" />,
  },
};

export const IconOnly: Story = {
  args: {
    icon: Plus,
    "aria-label": "Add item",
  },
};

// CssCheck story - verifies Tailwind CSS is loaded
export const CssCheck: Story = {
  args: {
    children: "CSS Check",
    variant: "solid",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name: /css check/i });
    // Solid variant uses bg-[var(--sh-color-sea)] which is #007aff
    await expect(getComputedStyle(button).backgroundColor).toBe("rgb(0, 122, 255)");
  },
};

// Interactive Playground
export const Playground: Story = {
  args: {
    children: "Playground Button",
    variant: "default",
    size: "md",
    fullWidth: false,
    disabled: false,
    loading: false,
  },
};
