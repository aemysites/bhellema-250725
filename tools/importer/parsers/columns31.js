/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid layout inside the provided element
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  // Get all direct children of the grid (these are columns)
  const cols = Array.from(grid.children);
  // Table header: single cell (matches example)
  const headerRow = ['Columns (columns31)'];
  // Data row: as many columns as present in the grid
  const contentRow = cols;
  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);
  // Ensure the header row spans the correct number of columns (colspan)
  const th = table.querySelector('thead th') || table.querySelector('th');
  if (th && cols.length > 1) {
    th.setAttribute('colspan', cols.length);
  }
  // Replace the element with the new table
  element.replaceWith(table);
}
