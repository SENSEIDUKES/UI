"use client";

import { useEffect, type ReactNode } from "react";

import { cn, type SEIExperience } from "@seihouse/ui";
import { getComponentBySlug } from "@/registry/component-registry";
import { getContextById } from "@/registry/context-registry";

import { canvasStyles, canvasTheme, type CanvasOption } from "./preview-config";

interface PreviewDocumentProps {
  previewId: string;
  canvas: CanvasOption;
  experience: SEIExperience;
  children: ReactNode;
}

interface IsolatedPreviewProps {
  slug: string;
  variant: string;
  mockIndex: number;
  canvas: CanvasOption;
  experience: SEIExperience;
  previewId: string;
  contextId?: string;
}

export function IsolatedPreview({
  slug,
  variant,
  mockIndex,
  canvas,
  experience,
  previewId,
  contextId,
}: IsolatedPreviewProps) {
  const entry = getComponentBySlug(slug);
  if (!entry) return null;

  if (contextId) {
    const context = getContextById(contextId);
    if (!context || !entry.contextExamples.includes(context.id)) return null;
    const Context = context.component;
    return (
      <PreviewDocument previewId={previewId} canvas={canvas} experience={experience}>
        <Context />
      </PreviewDocument>
    );
  }

  const Preview = entry.preview;
  return (
    <PreviewDocument previewId={previewId} canvas={canvas} experience={experience}>
      <Preview variant={variant} mockIndex={mockIndex} />
    </PreviewDocument>
  );
}

/**
 * The root of the isolated preview document. The iframe supplies the viewport;
 * this component supplies the selected canvas and experience, and reports
 * content growth so the workbench never hides overflow below a fixed frame
 * height.
 */
export function PreviewDocument({ previewId, canvas, experience, children }: PreviewDocumentProps) {
  const theme = canvasTheme(canvas);

  // Both attributes land on the preview document root, so the component under
  // review — and anything it portals to this document's <body> — resolves the
  // same contrast theme and experience tokens.
  useEffect(() => {
    const root = document.documentElement;
    const previousTheme = root.dataset.theme;
    const previousExperience = root.dataset.experience;
    root.dataset.theme = theme;
    root.dataset.experience = experience;

    return () => {
      if (previousTheme) {
        root.dataset.theme = previousTheme;
      } else {
        delete root.dataset.theme;
      }

      if (previousExperience) {
        root.dataset.experience = previousExperience;
      } else {
        delete root.dataset.experience;
      }
    };
  }, [experience, theme]);

  useEffect(() => {
    let animationFrame = 0;

    const reportSize = () => {
      cancelAnimationFrame(animationFrame);
      animationFrame = requestAnimationFrame(() => {
        const height = Math.ceil(
          Math.max(
            document.documentElement.scrollHeight,
            document.body.scrollHeight,
            document.body.getBoundingClientRect().bottom,
          ),
        );

        window.parent.postMessage(
          {
            source: "sei-workbench-preview",
            previewId,
            height,
            width: window.innerWidth,
          },
          window.location.origin,
        );
      });
    };

    const resizeObserver = new ResizeObserver(reportSize);
    resizeObserver.observe(document.documentElement);
    resizeObserver.observe(document.body);
    window.addEventListener("resize", reportSize);
    reportSize();

    return () => {
      cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      window.removeEventListener("resize", reportSize);
    };
  }, [previewId]);

  return (
    <main
      data-testid="isolated-preview-document"
      data-theme={theme}
      data-experience={experience}
      className={cn(
        "flex min-h-[40rem] w-full items-center justify-center p-4 text-[var(--sh-text-primary)] sm:p-8",
        canvasStyles[canvas],
      )}
    >
      <div className="flex w-full min-w-0 justify-center">{children}</div>
    </main>
  );
}
