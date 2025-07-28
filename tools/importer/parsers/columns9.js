/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid container with the columns
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all direct children of the grid (these are the columns, typically div/ul)
  const columns = Array.from(grid.children);

  // Table header must be a single cell (as per example)
  const header = ['Columns (columns9)'];

  // The first content row: one cell per column
  const contentRow = columns;

  // Compose the table, first row is header (1 col), then content row (n cols)
  const table = WebImporter.DOMUtils.createTable([
    header,      // Single-cell header row
    contentRow   // As many cells as columns
  ], document);

  // Replace the original element with the table
  element.replaceWith(table);
}
