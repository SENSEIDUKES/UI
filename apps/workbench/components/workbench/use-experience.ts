"use client";

import { useCallback, useEffect, useState } from "react";

import { isSEIExperience, SEI_DEFAULT_EXPERIENCE, type SEIExperience } from "@seihouse/ui";

export const experienceStorageKey = "sei-workbench-experience";

/**
 * The workbench Style control.
 *
 * Unlike Mode / Variant, the selected experience is a reviewer preference, not
 * a property of the component being reviewed: it survives component navigation
 * and page refreshes, and it is applied to the document root so portal-based
 * overlays in the workbench shell inherit it too.
 *
 * Reading localStorage is deferred to an effect so server and first client
 * render agree; `loaded` reports when the stored value has been applied.
 */
export function useWorkbenchExperience() {
  const [experience, setExperienceState] = useState<SEIExperience>(SEI_DEFAULT_EXPERIENCE);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(experienceStorageKey);
      if (isSEIExperience(stored)) setExperienceState(stored);
    } catch {
      // localStorage unavailable — the default experience stands for this session.
    }
    setLoaded(true);
  }, []);

  const setExperience = useCallback((next: SEIExperience) => {
    setExperienceState(next);
    try {
      window.localStorage.setItem(experienceStorageKey, next);
    } catch {
      // localStorage unavailable — the choice stays in memory for this session.
    }
  }, []);

  // Root-level so dialogs, drawers, popovers, menus, and toasts portalled to
  // <body> resolve the same tokens as the page they came from.
  useEffect(() => {
    const root = document.documentElement;
    const previous = root.dataset.experience;
    root.dataset.experience = experience;

    return () => {
      if (previous) {
        root.dataset.experience = previous;
      } else {
        delete root.dataset.experience;
      }
    };
  }, [experience]);

  return { experience, setExperience, loaded };
}
