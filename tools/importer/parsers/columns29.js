/* global WebImporter */
export default function parse(element, { document }) {
  // Get all immediate column divs
  const columns = Array.from(element.querySelectorAll(':scope > div'));
  // For each column, grab the image (if present), else the column itself
  const contentRow = columns.map(col => {
    const img = col.querySelector('img');
    if (img) return img;
    return col;
  });
  // Build a table with a single-cell header row, and a content row with N columns
  const table = WebImporter.DOMUtils.createTable([
    ['Columns (columns29)'], // Single-cell header row matches example
    contentRow               // N columns for images
  ], document);
  element.replaceWith(table);
}
