import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { IsolatedPreview } from "@/components/workbench/preview-document";
import { isCanvasOption } from "@/components/workbench/preview-config";
import { isSEIExperience, SEI_DEFAULT_EXPERIENCE } from "@seihouse/ui";
import { getComponentBySlug } from "@/registry/component-registry";
import { getContextById } from "@/registry/context-registry";

export const metadata: Metadata = {
  title: "Component preview — SEIHouse Workbench",
  robots: { index: false, follow: false },
};

interface WorkbenchPreviewPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{
    canvas?: string;
    contextId?: string;
    experience?: string;
    mockIndex?: string;
    previewId?: string;
    variant?: string;
  }>;
}

export default async function WorkbenchPreviewPage({
  params,
  searchParams,
}: WorkbenchPreviewPageProps) {
  const [{ slug }, query] = await Promise.all([params, searchParams]);
  const entry = getComponentBySlug(slug);
  if (!entry) notFound();

  const canvas = isCanvasOption(query.canvas) ? query.canvas : "dark";
  const experience = isSEIExperience(query.experience) ? query.experience : SEI_DEFAULT_EXPERIENCE;
  const previewId = query.previewId ?? "workbench-preview";

  if (query.contextId) {
    const context = getContextById(query.contextId);
    if (!context || !entry.contextExamples.includes(context.id)) notFound();
    return (
      <IsolatedPreview
        slug={slug}
        variant={entry.defaultVariant}
        mockIndex={0}
        previewId={previewId}
        canvas={canvas}
        experience={experience}
        contextId={context.id}
      />
    );
  }

  const variant = entry.variants.includes(query.variant ?? "")
    ? (query.variant as string)
    : entry.defaultVariant;
  const parsedMockIndex = Number.parseInt(query.mockIndex ?? "0", 10);
  const maximumMockIndex = Math.max(0, (entry.mockDataOptions?.length ?? 1) - 1);
  const mockIndex = Number.isFinite(parsedMockIndex)
    ? Math.min(Math.max(parsedMockIndex, 0), maximumMockIndex)
    : 0;

  return (
    <IsolatedPreview
      slug={slug}
      variant={variant}
      mockIndex={mockIndex}
      previewId={previewId}
      canvas={canvas}
      experience={experience}
    />
  );
}
