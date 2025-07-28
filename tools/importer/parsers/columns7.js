/* global WebImporter */
export default function parse(element, { document }) {
  // Get all immediate children divs (each column in the grid)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // For each column, grab all its direct children (so not just images, but any content)
  const cellsRow = columns.map((col) => {
    // Collect all direct content in the column
    // If the column only has one element, just use that directly
    const children = Array.from(col.childNodes).filter(node => {
      // ignore empty text nodes
      return node.nodeType !== Node.TEXT_NODE || node.textContent.trim() !== '';
    });
    if (children.length === 1) {
      return children[0];
    } else if (children.length > 1) {
      return children;
    } else {
      return '';
    }
  });

  // Create the table: header is a single cell, next row is one cell per column
  const table = WebImporter.DOMUtils.createTable([
    ['Columns (columns7)'],
    cellsRow,
  ], document);

  element.replaceWith(table);
}
