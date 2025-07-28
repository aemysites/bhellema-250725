/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid container that holds the columns
  const grid = element.querySelector('.w-layout-grid');
  let columns = [];
  if (grid) {
    columns = Array.from(grid.children);
  }

  if (!columns.length) {
    // Fallback: Try to find a container then its children
    const container = element.querySelector('.container');
    if (container) {
      columns = Array.from(container.children);
    } else {
      columns = Array.from(element.children);
    }
  }

  // Only keep elements that have meaningful content
  const filteredColumns = columns.filter(col => {
    if (col.children.length > 0) return true;
    if (col.textContent && col.textContent.trim() !== '') return true;
    return false;
  });

  // The header row must have only one cell according to requirements
  const headerRow = ['Columns (columns35)'];
  const contentRow = filteredColumns.map(col => col);

  const tableCells = [
    headerRow,
    contentRow
  ];

  const table = WebImporter.DOMUtils.createTable(tableCells, document);

  // To ensure the header cell spans all columns, set colspan explicitly
  if (table.rows.length > 0 && table.rows[0].cells.length === 1 && contentRow.length > 1) {
    table.rows[0].cells[0].setAttribute('colspan', contentRow.length);
  }

  element.replaceWith(table);
}
