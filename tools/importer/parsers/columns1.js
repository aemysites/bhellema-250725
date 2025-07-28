/* global WebImporter */
export default function parse(element, { document }) {
  // Get the grid layout containing columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return; // Defensive: No grid, do nothing

  // Get direct children as columns (should be 2: image + content)
  const columns = Array.from(grid.children);
  if (columns.length < 2) return; // Defensive: not enough columns

  // Each column content reference
  const col1 = columns[0]; // Image
  const col2 = columns[1]; // Content (heading, subheading, buttons)

  // Block header row must match exactly
  const headerRow = ['Columns (columns1)'];

  // Block content row: as many columns as found in grid
  const contentRow = [col1, col2];

  // Build table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace element with block table
  element.replaceWith(table);
}
