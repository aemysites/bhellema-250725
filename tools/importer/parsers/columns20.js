/* global WebImporter */
export default function parse(element, { document }) {
  // Find images in the collage (all 9 grid images)
  let images = [];
  const gridWrapper = element.querySelector('.ix-hero-scale-3x-to-1x');
  if (gridWrapper) {
    const grid = gridWrapper.querySelector('.grid-layout.desktop-3-column');
    if (grid) {
      images = Array.from(grid.querySelectorAll('.utility-position-relative > img.cover-image'));
    }
  }
  // Find overlay text content (headline, subheading, buttons)
  let overlayCell = '';
  const overlayContent = element.querySelector('.ix-hero-scale-3x-to-1x-content .container');
  if (overlayContent) {
    overlayCell = overlayContent;
  }
  // The first row must be a single cell (one column), per spec
  const cells = [
    ['Columns (columns20)'], // header row: single cell
    [images, overlayCell]    // second row: two cells/columns
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
