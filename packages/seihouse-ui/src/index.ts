// Public SEIHouse UI package surface.
// Keep this file explicit: workbench/demo registries and mock data are intentionally not exported.

export { SEIBadge, type SEIBadgeProps } from "./primitives/sei-badge";
export { SEIButton, type SEIButtonProps } from "./primitives/sei-button";
export { SEICard, type SEICardProps } from "./primitives/sei-card";
export { SEIPanel, type SEIPanelProps } from "./primitives/sei-panel";
export { SEISection, type SEISectionProps } from "./primitives/sei-section";

export {
  default as ActionStrip,
  type ActionStripAction,
  type ActionStripProps,
} from "./particles/action-strip";
export { default as AlbumCard, type AlbumCardProps } from "./particles/album-card";
export { default as ArtistCard, type ArtistCardProps } from "./particles/artist-card";
export { default as DojoModuleCard, type DojoModuleCardProps } from "./particles/dojo-module-card";
export { default as MediaCard, type MediaCardProps } from "./particles/media-card";
export { default as MetricCard, type MetricCardProps } from "./particles/metric-card";
export {
  default as PlayerShellExpanded,
  type PlayerShellExpandedProps,
} from "./particles/player-shell-expanded";
export {
  default as PlayerShellPreview,
  type PlayerShellPreviewProps,
} from "./particles/player-shell-preview";
export {
  default as PluginSlotPreview,
  type PluginSlotKind,
  type PluginSlotPreviewProps,
} from "./particles/plugin-slot-preview";
export { default as RegistryPanel, type RegistryPanelProps } from "./particles/registry-panel";
export {
  default as RegistrySeal,
  type RegistrySealProps,
  type RegistryStatus,
} from "./particles/registry-seal";
export { default as ShowcaseBlock, type ShowcaseBlockProps } from "./particles/showcase-block";
export { default as ShowcaseHero, type ShowcaseHeroProps } from "./particles/showcase-hero";
export {
  default as VaultFragmentCard,
  type VaultFragmentCardProps,
} from "./particles/vault-fragment-card";

export {
  SEIDialog,
  SEIDialogClose,
  SEIDialogContent,
  SEIDialogDescription,
  SEIDialogTitle,
  SEIDialogTrigger,
  seiDialogStyles,
  type SEIDialogCloseProps,
  type SEIDialogContentProps,
  type SEIDialogDescriptionProps,
  type SEIDialogProps,
  type SEIDialogTitleProps,
  type SEIDialogTriggerProps,
} from "./behavior/sei-dialog";
export {
  SEIDrawer,
  SEIDrawerBody,
  SEIDrawerClose,
  SEIDrawerContent,
  SEIDrawerDescription,
  SEIDrawerFooter,
  SEIDrawerHeader,
  SEIDrawerTitle,
  SEIDrawerTrigger,
  seiDrawerStyles,
  type SEIDrawerBodyProps,
  type SEIDrawerCloseProps,
  type SEIDrawerContentProps,
  type SEIDrawerDescriptionProps,
  type SEIDrawerFooterProps,
  type SEIDrawerHeaderProps,
  type SEIDrawerProps,
  type SEIDrawerTitleProps,
  type SEIDrawerTriggerProps,
} from "./behavior/sei-drawer";
export {
  SEINativeDrawer,
  SEINativeDrawerBody,
  SEINativeDrawerClose,
  SEINativeDrawerContent,
  SEINativeDrawerDescription,
  SEINativeDrawerFooter,
  SEINativeDrawerHeader,
  SEINativeDrawerTitle,
  SEINativeDrawerTrigger,
  seiNativeDrawerStyles,
  type SEINativeDrawerCloseProps,
  type SEINativeDrawerContentProps,
  type SEINativeDrawerDescriptionProps,
  type SEINativeDrawerHeaderProps,
  type SEINativeDrawerProps,
  type SEINativeDrawerTitleProps,
  type SEINativeDrawerTriggerProps,
} from "./behavior/sei-native-drawer";
export {
  SEIPopover,
  SEIPopoverClose,
  SEIPopoverContent,
  SEIPopoverDescription,
  SEIPopoverTitle,
  SEIPopoverTrigger,
  seiPopoverStyles,
  type SEIPopoverCloseProps,
  type SEIPopoverContentProps,
  type SEIPopoverDescriptionProps,
  type SEIPopoverProps,
  type SEIPopoverTitleProps,
  type SEIPopoverTriggerProps,
} from "./behavior/sei-popover";
export {
  SEITabs,
  SEITabsList,
  SEITabsPanel,
  SEITabsTrigger,
  seiTabsStyles,
  type SEITabsListProps,
  type SEITabsPanelProps,
  type SEITabsProps,
  type SEITabsTriggerProps,
} from "./behavior/sei-tabs";
export {
  SEITooltip,
  SEITooltipContent,
  SEITooltipProvider,
  SEITooltipTrigger,
  seiTooltipStyles,
  type SEITooltipContentProps,
  type SEITooltipProps,
  type SEITooltipProviderProps,
  type SEITooltipTriggerProps,
} from "./behavior/sei-tooltip";
export {
  SEIMenu,
  SEIMenuCheckboxItem,
  SEIMenuContent,
  SEIMenuGroup,
  SEIMenuItem,
  SEIMenuLabel,
  SEIMenuRadioGroup,
  SEIMenuRadioItem,
  SEIMenuSeparator,
  SEIMenuTrigger,
  type SEIMenuCheckboxItemProps,
  type SEIMenuContentProps,
  type SEIMenuGroupProps,
  type SEIMenuItemProps,
  type SEIMenuLabelProps,
  type SEIMenuProps,
  type SEIMenuRadioGroupProps,
  type SEIMenuRadioItemProps,
  type SEIMenuSeparatorProps,
  type SEIMenuTriggerProps,
} from "./behavior/sei-menu";
export {
  SEICombobox,
  SEIComboboxControl,
  SEIComboboxItem,
  SEIComboboxLabel,
  SEIComboboxList,
  SEIComboboxPopover,
  type SEIComboboxControlProps,
  type SEIComboboxItemProps,
  type SEIComboboxLabelProps,
  type SEIComboboxListProps,
  type SEIComboboxPopoverProps,
  type SEIComboboxProps,
} from "./behavior/sei-combobox";
export {
  fuzzyFilter,
  SEICommand,
  SEICommandGroup,
  SEICommandInput,
  SEICommandItem,
  SEICommandList,
  SEICommandShortcut,
  type SEICommandGroupProps,
  type SEICommandInputProps,
  type SEICommandItemProps,
  type SEICommandListProps,
  type SEICommandProps,
  type SEICommandShortcutProps,
} from "./behavior/sei-command";
export { SEIComboboxPreview, type SEIComboboxPreviewProps } from "./behavior/sei-combobox-preview";
export { SEICommandPalette, type SEICommandPaletteProps } from "./behavior/sei-command-palette";
export { SEICommandPreview, type SEICommandPreviewProps } from "./behavior/sei-command-preview";
export {
  SEIMultiSelectCombobox,
  type SEIMultiSelectComboboxProps,
} from "./behavior/sei-multi-select-combobox";
export { fuzzyMatch, highlightSegments, type FuzzyResult } from "./behavior/fuzzy";
export { pushRecent } from "./behavior/recent";

// --- State primitives (Phase 6) ---
export {
  SEISkeleton,
  SEISpinner,
  SEIProgressBar,
  clampProgress,
  SEIStatusDot,
  SEIStatusLine,
  SEIEmptyState,
  SEILoadingState,
  SEIErrorState,
  SEISuccessState,
  type SEISkeletonProps,
  type SEISpinnerProps,
  type SEIProgressBarProps,
  type SEIStatusDotProps,
  type SEIStatusLineProps,
  type SEIEmptyStateProps,
  type SEILoadingStateProps,
  type SEIErrorStateProps,
  type SEISuccessStateProps,
} from "./states";

// --- Form primitives (Phase 6) ---
export {
  SEIField,
  seiFieldControlVariants,
  SEIInput,
  SEITextarea,
  SEISelect,
  SEISwitch,
  SEICheckbox,
  SEIRadioGroup,
  SEIRadio,
  SEISlider,
  type SEIFieldProps,
  type SEIFieldSize,
  type SEIFieldControlVariantProps,
  type SEIInputProps,
  type SEITextareaProps,
  type SEISelectProps,
  type SEISwitchProps,
  type SEISwitchSize,
  type SEICheckboxProps,
  type SEIRadioGroupProps,
  type SEIRadioProps,
  type SEISliderProps,
} from "./forms";

// --- Layout primitives (Phase 6) ---
export {
  SEIContainer,
  SEIAppShell,
  SEIPageHeader,
  SEIToolbar,
  SEIActionBar,
  SEIFilterBar,
  SEISplitPane,
  SEIStickyFooter,
  SEISafeArea,
  type SEIContainerProps,
  type SEIAppShellProps,
  type SEIPageHeaderProps,
  type SEIToolbarProps,
  type SEIActionBarProps,
  type SEIFilterBarProps,
  type SEISplitPaneProps,
  type SEIStickyFooterProps,
  type SEISafeAreaProps,
} from "./layout";

// --- Scroll / overflow (Phase 6) ---
export {
  SEIScrollArea,
  SEIVirtualScrollArea,
  SEIScrollLane,
  getVirtualRange,
  getScrollShadows,
  type SEIScrollAreaProps,
  type SEIVirtualScrollAreaProps,
  type SEIScrollLaneProps,
  type VirtualRange,
} from "./scroll";

// --- Media primitives (Phase 6) ---
export {
  SEIAspectRatio,
  SEIThumbnail,
  SEIAvatar,
  SEIMediaRow,
  type SEIAspectRatioProps,
  type SEIThumbnailProps,
  type SEIAvatarProps,
  type SEIMediaRowProps,
} from "./media";

// --- Feedback primitives (Phase 7) ---
export {
  SEIToastProvider,
  toastReducer,
  useSEIToast,
  type SEIToastAction,
  type SEIToastInput,
  type SEIToastProviderProps,
  type SEIToastRecord,
  type SEIToastTone,
} from "./feedback";

// --- Data primitives (Phase 7) ---
export {
  compareSortValues,
  SEITable,
  SEITableBody,
  SEITableCaption,
  SEITableCell,
  SEITableHead,
  SEITableHeader,
  SEITableRow,
  SEITableSelectionCell,
  sortRows,
  type SEIRowKey,
  type SEISortDirection,
  type SEISortValue,
  type SEITableBodyProps,
  type SEITableCaptionProps,
  type SEITableCellProps,
  type SEITableHeadProps,
  type SEITableHeaderProps,
  type SEITableProps,
  type SEITableRowProps,
  type SEITableSelectionCellProps,
} from "./data";

export { cn } from "./styles/cn";
export {
  focusRing,
  interactionStates,
  registrySealVariants,
  seiBadgeVariants,
  seiButtonVariants,
  seiCardVariants,
  seiCommandGroupHeader,
  seiInteractiveItemVariants,
  seiOverlayVariants,
  seiPanelVariants,
  seiPopupSurfaceVariants,
  seiSectionVariants,
  transitionSurface,
  type RegistrySealVariantProps,
  type SEIBadgeVariantProps,
  type SEIButtonVariantProps,
  type SEICardVariantProps,
  type SEIOverlayVariantProps,
  type SEIPanelVariantProps,
  type SEIPopupSurfaceVariantProps,
  type SEISectionVariantProps,
} from "./styles/variants";
// --- Shared infrastructure utilities (Phase 6) ---
export { SEI_Z_INDEX, seiLayer, type SEILayer } from "./styles/layering";
export {
  seiSurfaceVariants,
  seiGlass,
  seiGlowSea,
  seiGlowAccent,
  type SEISurfaceVariantProps,
} from "./styles/surfaces";
export {
  motionSafe,
  motionSafeFade,
  motionSafeTransform,
  prefersReducedMotion,
  reducedMotionNotes,
} from "./styles/reduced-motion";

export type {
  Album,
  Artist,
  DojoModule,
  PlayerTrack,
  RegistryItem,
  RegistryState,
  ShowcaseEntry,
  VaultFragment,
} from "./types/music";
export type { ComboOption, CommandGroup, CommandItem, MultiSelectOption } from "./types/behavior";
