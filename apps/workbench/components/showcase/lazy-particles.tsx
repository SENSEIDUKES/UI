"use client";

import dynamic from "next/dynamic";

const particleFallback = (
  <div className="min-h-40 animate-pulse rounded-[1.35rem] border border-white/10 bg-white/[0.035]" />
);

export const LazyAlbumCard = dynamic(() => import("@seihouse/ui").then((mod) => mod.AlbumCard), {
  loading: () => particleFallback,
});

export const LazyArtistCard = dynamic(() => import("@seihouse/ui").then((mod) => mod.ArtistCard), {
  loading: () => particleFallback,
});

export const LazyDojoModuleCard = dynamic(
  () => import("@seihouse/ui").then((mod) => mod.DojoModuleCard),
  { loading: () => particleFallback },
);

export const LazyMetricCard = dynamic(() => import("@seihouse/ui").then((mod) => mod.MetricCard), {
  loading: () => particleFallback,
});

export const LazyPlayerShellExpanded = dynamic(
  () => import("@seihouse/ui").then((mod) => mod.PlayerShellExpanded),
  { loading: () => particleFallback },
);

export const LazyPlayerShellPreview = dynamic(
  () => import("@seihouse/ui").then((mod) => mod.PlayerShellPreview),
  { loading: () => particleFallback },
);

export const LazyPluginSlotPreview = dynamic(
  () => import("@seihouse/ui").then((mod) => mod.PluginSlotPreview),
  { loading: () => particleFallback },
);

export const LazyRegistryPanel = dynamic(
  () => import("@seihouse/ui").then((mod) => mod.RegistryPanel),
  { loading: () => particleFallback },
);

export const LazyVaultFragmentCard = dynamic(
  () => import("@seihouse/ui").then((mod) => mod.VaultFragmentCard),
  { loading: () => particleFallback },
);
