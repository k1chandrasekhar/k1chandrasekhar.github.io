import { initNavigation } from './modules/navigation.js';
import { initTheme } from './modules/theme.js';
import { initProjectFilter } from './modules/projects.js';
import { initEffects } from './modules/effects.js';
import { initTerminal } from './modules/terminal.js';

window.addEventListener("DOMContentLoaded", () => {
  initNavigation();
  initTheme();
  initProjectFilter();
  initEffects();
  initTerminal();
});
