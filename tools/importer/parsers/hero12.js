/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row (exactly as in example)
  const headerRow = ['Hero (hero12)'];

  // 2. Background image row (cover image, prominent background)
  // Look for an img.cover-image.utility-position-absolute directly under the first grid child
  let bgImg = '';
  const gridDivs = element.querySelectorAll(':scope > .w-layout-grid > div');
  if (gridDivs.length > 0) {
    // Search for the background image in the first div
    const possibleBgImg = gridDivs[0].querySelector('img.cover-image.utility-position-absolute');
    if (possibleBgImg) bgImg = possibleBgImg;
  }

  // 3. Content row: all heading, details, cta, and related images
  // This is always under the second main grid column > .container
  let contentCell = '';
  if (gridDivs.length > 1) {
    const container = gridDivs[1].querySelector(':scope > .container');
    // Use the card-body part (contains all text, buttons, and accessory images)
    // Defensive: If .container is missing, fallback to the gridDiv itself
    let cardBody = null;
    if (container) {
      cardBody = container.querySelector('.card-body');
    }
    if (!cardBody) {
      // fallback to .card-body inside gridDivs[1] directly
      cardBody = gridDivs[1].querySelector('.card-body');
    }
    // If not found, fallback to the whole gridDiv
    if (cardBody) {
      contentCell = cardBody;
    } else if (container) {
      contentCell = container;
    } else {
      contentCell = gridDivs[1];
    }
  }

  // Compose the table rows
  const cells = [
    headerRow,
    [bgImg],
    [contentCell]
  ];

  // Create block table and replace element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
