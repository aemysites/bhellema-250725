/* global WebImporter */
export default function parse(element, { document }) {
  // Get all direct child divs (the columns)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // Table header: a single cell spanning all columns
  // We'll create a single header cell, and then adjust colspan after createTable
  const headerRow = ['Columns (columns38)'];
  const contentRow = columns;

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Fix: set the header cell to span all columns
  const th = table.querySelector('th');
  if (th && columns.length > 1) {
    th.setAttribute('colspan', columns.length);
  }

  element.replaceWith(table);
}
