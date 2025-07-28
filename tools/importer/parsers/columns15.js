/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid containing the columns
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;
  const columns = Array.from(grid.children);
  if (!columns.length) return;

  // The header row must have exactly one cell (the block name)
  const headerRow = ['Columns (columns15)'];

  // The content row contains the columns as cells (reference the elements directly)
  const contentRow = columns.map(col => col);

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);
  element.replaceWith(table);
}
