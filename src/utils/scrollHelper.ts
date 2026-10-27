/**
 * Smoothly scrolls to a target section so it aligns flush directly under the
 * fixed/sticky navbar, allowing seamless jumps between sections anywhere on the page
 * without any text cutoff or gap.
 */
export const scrollToSection = (idOrSelector: string) => {
  if (typeof window === 'undefined') return;

  const selector = idOrSelector.startsWith('#') ? idOrSelector : `#${idOrSelector}`;
  const target = document.querySelector(selector);
  if (!target) return;

  // The sleek fixed glass navbar height while scrolling is ~52px to ~56px
  const header = document.querySelector('header');
  const nav = header?.querySelector('nav');
  const headerOffset = nav ? nav.offsetHeight : (header ? header.offsetHeight : 54);

  const elementPosition = target.getBoundingClientRect().top + window.pageYOffset;
  const offsetPosition = Math.max(0, Math.round(elementPosition - headerOffset));

  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth',
  });
};
