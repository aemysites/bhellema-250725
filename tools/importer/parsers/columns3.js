/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid which contains the columns
  const grid = element.querySelector('.w-layout-grid');
  let columns = [];
  if (grid) {
    // Only consider direct children as columns
    columns = Array.from(grid.children);
  }

  // Each column may have multiple children, so extract each column's full content array
  const contentRow = columns.map((col) => {
    // If only one child, reference that; else, array of all children
    if (col.children.length === 1) {
      return col.firstElementChild;
    }
    return Array.from(col.children);
  });

  // Create the block table with proper header
  const table = WebImporter.DOMUtils.createTable([
    ['Columns (columns3)'],
    contentRow
  ], document);

  // Replace the original section element with the structured block table
  element.replaceWith(table);
}
