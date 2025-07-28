/* global WebImporter */
export default function parse(element, { document }) {
  // Locate the main grid containing content and image
  const grids = Array.from(element.querySelectorAll(':scope > .w-layout-grid'));
  let mainGrid = grids.length > 0 ? grids[0] : element;

  // Find the image (background or hero image)
  const img = mainGrid.querySelector('img');

  // Find the main text content container (headline, paragraph, CTAs)
  let contentContainer = null;
  // Look for most deeply nested .section
  const nestedSections = mainGrid.querySelectorAll('.section');
  if (nestedSections.length > 0) {
    contentContainer = nestedSections[nestedSections.length - 1];
  }
  // Fallback to any .section
  if (!contentContainer) {
    contentContainer = mainGrid.querySelector('.section');
  }

  // Build the fragment for the text cell (headline, paragraph, CTA)
  const frag = document.createDocumentFragment();
  if (contentContainer) {
    // Headline (h1, h2, h3)
    const heading = contentContainer.querySelector('h1, h2, h3');
    if (heading) frag.appendChild(heading);
    // Rich text paragraph
    const richText = contentContainer.querySelector('.rich-text');
    if (richText) {
      Array.from(richText.childNodes).forEach(node => frag.appendChild(node));
    }
    // Call-to-actions (buttons)
    const buttonGroup = contentContainer.querySelector('.button-group');
    if (buttonGroup) frag.appendChild(buttonGroup);
  }

  // Build the table cells for the block
  const cells = [
    ['Hero (hero5)'],
    [img ? img : ''],
    [frag]
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
