/**
 * Color tokens — light and dark bindings.
 *
 * Sources:
 *   - Light values: current `createBaseColors(AppTheme.Light)` +
 *     `createSemanticColors(_, false)` output from `src/utils/theme.ts`,
 *     preserved verbatim (no visual regression).
 *   - Dark values: extracted from canonical Figma `RZxDJea4t6jnBZrV4YBacF`,
 *     dark band `3011:*`. Where the canonical dark binding disagreed with
 *     the current dark Theme value at a key with visible consumers, the
 *     current dark value wins to avoid visual regression; the disagreement
 *     is tracked as a designer follow-up.
 *
 * `withOpacity` calls are deferred to a util (not inlined as literals) so
 * the output is byte-identical to today's runtime computation — this is
 * what guarantees no visual regression for the surfaceContainer* + border
 * + placeholder etc keys that currently derive via opacity math.
 *
 * NOTE on imports: this module imports from `../../utils/colorUtils` only,
 * which is a pure utility (no React, no Paper, no MobX). The purity
 * constraint for this module forbids React/Paper/MobX imports only.
 */
import {withOpacity, stateLayerOpacity} from '../../utils/colorUtils';

import {TokenColors} from './types';

// Light base colors (verbatim from src/utils/theme.ts:111-147).
const LIGHT_PRIMARY = '#333333';
const LIGHT_SECONDARY = '#9A8354';
const LIGHT_TERTIARY = '#B08D57';
const LIGHT_ERROR = '#FF653F';
const LIGHT_BACKGROUND = '#ffffff';
const LIGHT_ON_BACKGROUND = '#111111';
const LIGHT_SURFACE = '#F7F1E5';
const LIGHT_ON_SURFACE = '#333333';
const LIGHT_INVERSE_ON_SURFACE = '#fcfcfc';

export const lightColors: TokenColors = {
  // MD3 base palette (light)
  primary: LIGHT_PRIMARY,
  onPrimary: '#FFFFFF',
  primaryContainer: '#EAE0CB',
  onPrimaryContainer: '#2D2F33',
  secondary: LIGHT_SECONDARY,
  onSecondary: '#FFFFFF',
  secondaryContainer: '#EFE7D2',
  onSecondaryContainer: '#424242',
  tertiary: LIGHT_TERTIARY,
  onTertiary: '#FFFFFF',
  tertiaryContainer: '#F3EAD3',
  onTertiaryContainer: '#013332',
  error: LIGHT_ERROR,
  onError: '#FFFFFF',
  errorContainer: '#E6ACA9',
  onErrorContainer: '#330B09',
  background: LIGHT_BACKGROUND,
  onBackground: LIGHT_ON_BACKGROUND,
  surface: LIGHT_SURFACE,
  onSurface: LIGHT_ON_SURFACE,
  surfaceVariant: '#e4e4e6',
  onSurfaceVariant: '#646466',
  outline: withOpacity(LIGHT_PRIMARY, 0.05),
  outlineVariant: '#a1a1a1',
  mutedLight: '#e5e3e1',
  // Figma `Color/Secondary/Default` — the secondary surface used by
  // small DS buttons (back chevron, audio glyph) over the muted canvas.
  secondaryDefault: '#f3f2f2',
  // MD3 extras
  surfaceDisabled: withOpacity('#fcfcfc', 0.12),
  onSurfaceDisabled: withOpacity('#333333', 0.38),
  inverseSurface: '#858585',
  inverseOnSurface: LIGHT_INVERSE_ON_SURFACE,
  inversePrimary: '#EAE0CB',
  inverseSecondary: '#95ABE6',
  shadow: '#000000',
  scrim: 'rgba(0, 0, 0, 0.25)',
  backdrop: 'rgba(51, 51, 51, 0.6)',

  // Semantic surface variants (light derives via primary-tint math)
  surfaceContainerHighest: withOpacity(LIGHT_PRIMARY, 0.05),
  surfaceContainerHigh: withOpacity(LIGHT_PRIMARY, 0.03),
  surfaceContainer: withOpacity(LIGHT_PRIMARY, 0.02),
  surfaceContainerLow: withOpacity(LIGHT_PRIMARY, 0.01),
  surfaceContainerLowest: LIGHT_SURFACE,
  surfaceDim: withOpacity(LIGHT_PRIMARY, 0.06),
  surfaceBright: LIGHT_SURFACE,

  // Text
  text: LIGHT_ON_BACKGROUND,
  textSecondary: withOpacity(LIGHT_ON_SURFACE, 0.5),
  inverseText: LIGHT_INVERSE_ON_SURFACE,
  inverseTextSecondary: withOpacity(LIGHT_INVERSE_ON_SURFACE, 0.5),

  // Border / placeholder
  border: withOpacity(LIGHT_ON_SURFACE, 0.05),
  placeholder: withOpacity(LIGHT_ON_SURFACE, 0.3),

  // Interactive state opacities
  stateLayerOpacity: 0.12,
  hoverStateOpacity: stateLayerOpacity.hover,
  pressedStateOpacity: stateLayerOpacity.pressed,
  draggedStateOpacity: stateLayerOpacity.dragged,
  focusStateOpacity: stateLayerOpacity.focus,

  // Menu
  menuBackground: LIGHT_SURFACE,
  menuBackgroundDimmed: withOpacity(LIGHT_SURFACE, 0.9),
  menuBackgroundActive: withOpacity(LIGHT_PRIMARY, 0.08),
  menuSeparator: withOpacity(LIGHT_PRIMARY, 0.5),
  menuGroupSeparator: withOpacity('#000000', 0.08),
  menuText: LIGHT_ON_SURFACE,
  menuDangerText: LIGHT_ERROR,

  // Messages
  authorBubbleBackground: '#F3ECDC',
  receivedMessageDocumentIcon: LIGHT_PRIMARY,
  sentMessageDocumentIcon: LIGHT_ON_SURFACE,
  userAvatarImageBackground: 'transparent',
  userAvatarNameColors: [
    LIGHT_PRIMARY,
    LIGHT_SECONDARY,
    LIGHT_TERTIARY,
    LIGHT_ERROR,
  ],
  searchBarBackground: 'rgba(118, 118, 128, 0.12)',

  // Thinking bubble
  thinkingBubbleBackground: '#FAF5E9',
  thinkingBubbleText: '#7A6434',
  thinkingBubbleBorder: 'rgba(154, 131, 84, 0.4)',
  thinkingBubbleShadow: '#9A8354',
  thinkingBubbleChevronBackground: 'rgba(154, 131, 84, 0.1)',
  thinkingBubbleChevronBorder: 'rgba(154, 131, 84, 0.2)',

  // Status bar
  bgStatusActive: '#22c55e',
  bgStatusIdle: '#d1d5db',
  statusLoaded: '#1e9e4f',

  // Buttons
  btnPrimaryBg: '#FAF3E0',
  btnPrimaryBorder: '#D9C48F',
  btnPrimaryText: '#7A6434',
  btnReadyBg: '#ecfdf5',
  btnReadyBorder: '#bbf7d0',
  btnReadyText: '#047857',
  btnDownloadBg: '#ecfdf5',
  btnDownloadBorder: '#bbf7d0',
  btnDownloadText: '#047857',

  // Icons
  iconModelTypeText: '#9A8354',
  iconModelTypeVision: '#9810fa',
  iconModelTypeAudio: '#f97316',

  // Accent — peach pill background (canonical Figma `Color/Accent/Peach`).
  accent: {
    peach: '#F3E5C3',
    // Progress-bar fill (canonical Figma `Color/Green/Strong`).
    greenStrong: '#9A8354',
  },
};

// Dark base values from canonical Figma. Where the canonical dark binding
// differs visibly from the current dark Theme value, the current value
// wins to avoid visual regression (tracked as a designer follow-up).
const DARK_PRIMARY = '#D8BE82';
const DARK_SECONDARY = '#C9A961';
const DARK_TERTIARY = '#E5D3A0';
const DARK_ERROR = '#FF653F';
const DARK_BACKGROUND = '#000000';
const DARK_ON_BACKGROUND = '#ffffff';
const DARK_SURFACE = '#0E0E0E';
const DARK_ON_SURFACE = '#E2E2E2';
const DARK_INVERSE_ON_SURFACE = '#333333';

export const darkColors: TokenColors = {
  // MD3 base palette (dark) — verbatim from canonical Figma
  primary: DARK_PRIMARY,
  onPrimary: '#1A1A1A',
  primaryContainer: '#4A4230',
  onPrimaryContainer: '#EFE7D2',
  secondary: DARK_SECONDARY,
  onSecondary: '#1A1A1A',
  secondaryContainer: '#424242',
  onSecondaryContainer: '#E0E0E0',
  tertiary: DARK_TERTIARY,
  onTertiary: '#1A1A1A',
  tertiaryContainer: '#4A3F24',
  onTertiaryContainer: '#F3EAD3',
  error: DARK_ERROR,
  onError: '#4C100D',
  errorContainer: '#661511',
  onErrorContainer: '#E6ACA9',
  background: DARK_BACKGROUND,
  onBackground: DARK_ON_BACKGROUND,
  surface: DARK_SURFACE,
  onSurface: DARK_ON_SURFACE,
  surfaceVariant: '#646466',
  onSurfaceVariant: '#e3e4e6',
  outline: '#444444',
  outlineVariant: '#a1a1a1',
  mutedLight: '#3a3937',
  // Figma `Color/Secondary/Default` — dark binding from canonical file.
  secondaryDefault: '#2a2928',
  // MD3 extras
  surfaceDisabled: withOpacity('#333333', 0.12),
  onSurfaceDisabled: withOpacity('#e5e5e6', 0.38),
  inverseSurface: '#e5e5e6',
  inverseOnSurface: DARK_INVERSE_ON_SURFACE,
  inversePrimary: '#4A4230',
  inverseSecondary: LIGHT_SECONDARY, // md3BaseColors.secondary used in current code
  shadow: '#ffffff',
  scrim: 'rgba(0, 0, 0, 0.25)',
  backdrop: 'rgba(66, 66, 66, 0.8)',

  // Semantic surface variants (dark derives via surface-tint math)
  // Explicit binding pending in a later design-system phase.
  surfaceContainerHighest: withOpacity(DARK_SURFACE, 0.22),
  surfaceContainerHigh: withOpacity(DARK_SURFACE, 0.16),
  surfaceContainer: withOpacity(DARK_SURFACE, 0.12),
  surfaceContainerLow: withOpacity(DARK_SURFACE, 0.08),
  surfaceContainerLowest: withOpacity(DARK_SURFACE, 0.04),
  surfaceDim: withOpacity(DARK_SURFACE, 0.06),
  surfaceBright: withOpacity(DARK_SURFACE, 0.24),

  // Text
  text: DARK_ON_BACKGROUND,
  textSecondary: withOpacity(DARK_ON_SURFACE, 0.5),
  inverseText: DARK_INVERSE_ON_SURFACE,
  inverseTextSecondary: withOpacity(DARK_INVERSE_ON_SURFACE, 0.5),

  // Border / placeholder
  border: withOpacity(DARK_ON_SURFACE, 0.05),
  placeholder: withOpacity(DARK_ON_SURFACE, 0.3),

  // Interactive state opacities
  stateLayerOpacity: 0.12,
  hoverStateOpacity: stateLayerOpacity.hover,
  pressedStateOpacity: stateLayerOpacity.pressed,
  draggedStateOpacity: stateLayerOpacity.dragged,
  focusStateOpacity: stateLayerOpacity.focus,

  // Menu
  menuBackground: '#2a2a2a',
  menuBackgroundDimmed: withOpacity(DARK_SURFACE, 0.9),
  menuBackgroundActive: withOpacity(DARK_PRIMARY, 0.08),
  menuSeparator: withOpacity(DARK_PRIMARY, 0.5),
  menuGroupSeparator: withOpacity('#FFFFFF', 0.08),
  menuText: DARK_ON_SURFACE,
  menuDangerText: DARK_ERROR,

  // Messages
  authorBubbleBackground: '#201B12',
  receivedMessageDocumentIcon: DARK_PRIMARY,
  sentMessageDocumentIcon: DARK_ON_SURFACE,
  userAvatarImageBackground: 'transparent',
  userAvatarNameColors: [
    DARK_PRIMARY,
    DARK_SECONDARY,
    DARK_TERTIARY,
    DARK_ERROR,
  ],
  searchBarBackground: 'rgba(28, 28, 30, 0.92)',

  // Thinking bubble
  thinkingBubbleBackground: '#241E12',
  thinkingBubbleText: '#D8BE82',
  thinkingBubbleBorder: 'rgba(201, 169, 97, 0.6)',
  thinkingBubbleShadow: '#C9A961',
  thinkingBubbleChevronBackground: 'rgba(201, 169, 97, 0.15)',
  thinkingBubbleChevronBorder: 'rgba(201, 169, 97, 0.3)',

  // Status bar
  bgStatusActive: '#22c55e',
  bgStatusIdle: '#4b5563',
  statusLoaded: '#34c768',

  // Buttons
  btnPrimaryBg: '#221C10',
  btnPrimaryBorder: '#4A4230',
  btnPrimaryText: '#E5D3A0',
  btnReadyBg: '#052e16',
  btnReadyBorder: '#166534',
  btnReadyText: '#6ee7b7',
  btnDownloadBg: '#0a1f17',
  btnDownloadBorder: '#143d2d',
  btnDownloadText: '#34d399',

  // Icons
  iconModelTypeText: '#D8BE82',
  iconModelTypeVision: '#c4b5fd',
  iconModelTypeAudio: '#fdba74',

  // Accent — peach pill background (dark binding from canonical Figma).
  accent: {
    peach: '#7A6434',
    // Progress-bar fill — dark binding mirrors the light token (same hue).
    greenStrong: '#9A8354',
  },
};
