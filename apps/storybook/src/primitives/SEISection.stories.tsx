import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { SEISection } from "@seihouse/ui";
import { SEIButton } from "@seihouse/ui";

const meta = {
  title: "Primitives/SEISection",
  component: SEISection,
  tags: ["ai-generated", "needs-work"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
## SEISection

A page section component with header area for eyebrow, title, description, and aside content.

### Accessibility Features
- **Semantic Element**: Renders as \`<section>\` for proper document structure
- **Heading Hierarchy**: Title renders as \`<h2>\` - ensure proper heading order in context
- **Landmark Role**: Sections create navigable landmarks for screen readers
- **ARIA Support**: Passes through all ARIA attributes

### Usage Guidelines
- Use \`eyebrow\` for section labels or categories above the title
- Use \`aside\` for action buttons or supplementary content aligned to the right
- Use \`spacing\` to control vertical padding based on page position
- Each section should have a unique, descriptive title
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
  argTypes: {
    spacing: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Vertical padding of the section",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "lg" },
      },
    },
    eyebrow: {
      control: "text",
      description: "Small label above the title (category, tag, etc.)",
    },
    title: {
      control: "text",
      description: "Section title (renders as h2)",
    },
    description: {
      control: "text",
      description: "Section description text",
    },
    children: {
      control: "text",
      description: "Section content",
    },
  },
} satisfies Meta<typeof SEISection>;

export default meta;
type Story = StoryObj<typeof meta>;

// Smoke check
export const Primary: Story = {
  args: {
    title: "Default Section",
    children: <div className="text-sm text-[var(--sh-color-cloud)]">Section content area.</div>,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const heading = canvas.getByRole("heading", { name: /default section/i });
    await expect(heading).toBeVisible();
    await expect(heading.tagName).toBe("H2");
  },
};

// Spacing stories
export const SmallSpacing: Story = {
  args: {
    title: "Small Spacing",
    description: "Section with small vertical padding.",
    spacing: "sm",
    children: (
      <div className="text-sm text-[var(--sh-color-cloud)]">Content area with small spacing.</div>
    ),
  },
};

export const MediumSpacing: Story = {
  args: {
    title: "Medium Spacing",
    description: "Section with medium vertical padding.",
    spacing: "md",
    children: (
      <div className="text-sm text-[var(--sh-color-cloud)]">Content area with medium spacing.</div>
    ),
  },
};

export const LargeSpacing: Story = {
  args: {
    title: "Large Spacing",
    description: "Section with large vertical padding (default).",
    spacing: "lg",
    children: (
      <div className="text-sm text-[var(--sh-color-cloud)]">Content area with large spacing.</div>
    ),
  },
};

// Header content stories
export const WithEyebrow: Story = {
  args: {
    eyebrow: "Features",
    title: "Section with Eyebrow",
    description: "This section has an eyebrow label above the title.",
    children: (
      <div className="text-sm text-[var(--sh-color-cloud)]">
        The eyebrow provides context or categorization for the section.
      </div>
    ),
  },
};

export const WithAside: Story = {
  args: {
    title: "Section with Aside",
    description: "This section has action buttons in the header area.",
    aside: (
      <SEIButton variant="outline" size="sm">
        View All
      </SEIButton>
    ),
    children: (
      <div className="text-sm text-[var(--sh-color-cloud)]">
        The aside area is useful for action buttons or supplementary content.
      </div>
    ),
  },
};

export const WithEyebrowAndAside: Story = {
  args: {
    eyebrow: "Resources",
    title: "Complete Header Example",
    description: "This section demonstrates both eyebrow and aside content.",
    aside: (
      <div className="flex gap-2">
        <SEIButton variant="ghost" size="sm">
          Learn More
        </SEIButton>
        <SEIButton variant="solid" size="sm">
          Get Started
        </SEIButton>
      </div>
    ),
    children: (
      <div className="text-sm text-[var(--sh-color-cloud)]">
        A complete header with eyebrow label and action buttons.
      </div>
    ),
  },
};

// Content examples
export const WithRichContent: Story = {
  args: {
    eyebrow: "Showcase",
    title: "Rich Content Section",
    description: "This section contains multiple content elements demonstrating the layout.",
    children: (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
            <div className="mb-2 font-medium">Card {i}</div>
            <div className="text-sm text-[var(--sh-color-cloud)]">
              Example content card within the section.
            </div>
          </div>
        ))}
      </div>
    ),
  },
};

// Minimal example
export const Minimal: Story = {
  args: {
    title: "Minimal Section",
    children: (
      <div className="text-sm text-[var(--sh-color-cloud)]">
        A section with only a title and content.
      </div>
    ),
  },
};

// Interactive Playground
export const Playground: Story = {
  args: {
    eyebrow: "Category",
    title: "Playground Section",
    description: "Use the controls panel to experiment with different prop combinations.",
    spacing: "lg",
    children: (
      <div className="text-sm text-[var(--sh-color-cloud)]">
        Use the controls panel to experiment with different prop combinations.
      </div>
    ),
  },
};
