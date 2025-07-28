/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table header row as per example
  const headerRow = ['Hero (hero39)'];

  // 2. Extract background image: first <img> in grid (should be only one)
  let img = null;
  const gridDivs = element.querySelectorAll(':scope > .w-layout-grid > div');
  if (gridDivs.length > 0) {
    img = gridDivs[0].querySelector('img');
  }

  // 3. Extract content: headline, paragraph, call-to-action (as single block)
  let contentBlock = null;
  if (gridDivs.length > 1) {
    // This div has the text content, likely inside a nested .w-layout-grid
    const contentContainer = gridDivs[1];
    // Use the innermost .w-layout-grid to preserve layout (as in HTML example)
    const innerGrid = contentContainer.querySelector('.w-layout-grid');
    if (innerGrid) {
      contentBlock = innerGrid;
    } else {
      // fallback, use the container directly
      contentBlock = contentContainer;
    }
  }

  // 4. Build the block table
  const cells = [
    headerRow,
    [img],
    [contentBlock]
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
