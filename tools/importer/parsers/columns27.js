/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid-layout container for columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  const children = Array.from(grid.children);
  // Should be two: content and image, but could be more columns
  const headerRow = ['Columns (columns27)'];
  // Array for the 2nd row cells (one per column)
  const cellsRow = [];
  children.forEach((child) => {
    // For each column, if it's not just empty, add it to the row.
    // Reference the existing element directly
    if (child.textContent.trim() !== '' || (child.tagName === 'IMG' && child.src)) {
      cellsRow.push(child);
    } else {
      // If the column is empty, put in an empty string
      cellsRow.push('');
    }
  });
  // Only create the block if there's more than one column
  if (cellsRow.length < 2) return;
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    cellsRow
  ], document);
  element.replaceWith(table);
}
