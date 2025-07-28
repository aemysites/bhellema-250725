/* global WebImporter */
export default function parse(element, { document }) {
  // Header row
  const headerRow = ['Hero (hero28)'];

  // Row 2: Background image (if any)
  // Look for the <img> inside the element, preferably with a background/hero context
  let backgroundImg = null;
  // Check for image inside an element that could be for the background
  const img = element.querySelector('img');
  if (img) {
    backgroundImg = img;
  }

  // Row 3: Title (Heading), Subheading, CTA (if present)
  // We'll gather heading (h1), subheading (h2/h3), and CTAs (a, button)
  const contentFragments = [];

  // Heading (Title)
  const h1 = element.querySelector('h1');
  if (h1) {
    contentFragments.push(h1);
  }

  // Subheading: Check for h2, h3 following h1 inside same block
  // The sample doesn't have one, but we should support it
  const h2 = element.querySelector('h2');
  if (h2) {
    contentFragments.push(h2);
  }
  const h3 = element.querySelector('h3');
  if (h3) {
    contentFragments.push(h3);
  }

  // CTA: look for .button-group or any direct a/button elements (if they exist)
  // In the current HTML, the .button-group is present but empty
  const buttonGroup = element.querySelector('.button-group');
  if (buttonGroup && buttonGroup.children.length > 0) {
    contentFragments.push(buttonGroup);
  }
  // Fallback: also gather direct <a> or <button> if present outside .button-group
  const directLinks = Array.from(element.querySelectorAll(':scope > a, :scope > button')).filter(btn => btn.closest('.button-group') == null);
  if (directLinks.length > 0) {
    contentFragments.push(...directLinks);
  }

  // If no content is found, add an empty div for structure robustness
  if (contentFragments.length === 0) {
    contentFragments.push(document.createElement('div'));
  }

  // Build the table rows
  const cells = [
    headerRow,
    [backgroundImg ? backgroundImg : ''],
    [contentFragments.length === 1 ? contentFragments[0] : contentFragments],
  ];

  // Create and replace
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
