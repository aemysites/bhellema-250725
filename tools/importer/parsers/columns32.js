/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid of columns in the section
  const container = element.querySelector('.container');
  let grid = null;
  if (container) {
    grid = container.querySelector('.w-layout-grid');
  }

  // Fallback: look for grid-layout directly
  if (!grid) {
    grid = element.querySelector('.w-layout-grid');
  }

  // If not found, just use the section's direct children
  let columns = [];
  if (grid) {
    columns = Array.from(grid.children);
  } else if (container) {
    columns = Array.from(container.children);
  } else {
    columns = Array.from(element.children);
  }

  // Remove empty text nodes or whitespace-only elements
  columns = columns.filter((el) => {
    if (el.nodeType === Node.ELEMENT_NODE) return true;
    if (el.nodeType === Node.TEXT_NODE && el.textContent.trim() !== '') return true;
    return false;
  });

  // Build the columns row referencing existing elements
  const columnsRow = columns.map((col) => col);

  // The block header row
  const cells = [
    ['Columns (columns32)'],
    columnsRow
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
