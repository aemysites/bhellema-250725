/* global WebImporter */
export default function parse(element, { document }) {
  // Get all immediate child divs representing columns
  const columnDivs = Array.from(element.querySelectorAll(':scope > div'));
  if (!columnDivs.length) return;

  // Header row: only ONE cell, matching the example exactly
  const headerRow = ['Columns (columns4)'];
  // Second row: one cell per column
  const contentRow = columnDivs;

  // Compose the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  element.replaceWith(table);
}
