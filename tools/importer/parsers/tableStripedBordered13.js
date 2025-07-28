/* global WebImporter */
export default function parse(element, { document }) {
  // Table block header as in the example
  const headerRow = ['Table (striped, bordered)'];
  // Table column headers as in the example screenshot
  const columnHeader = ['Question', 'Answer'];
  const rows = [];

  // Each direct child with class 'divider' is a row
  const dividers = Array.from(element.querySelectorAll(':scope > .divider'));
  for (const divider of dividers) {
    // Each divider has a child grid-layout with 2 children: question and answer
    const grid = divider.querySelector(':scope > .grid-layout');
    if (!grid) continue;
    const children = Array.from(grid.children);
    // Defensive: Require both children
    if (children.length < 2) continue;
    const question = children[0]; // h4-heading
    const answer = children[1]; // rich-text
    // Reference the actual elements, not their HTML
    rows.push([question, answer]);
  }

  // Only build the table if there's at least one row (besides headers)
  if (rows.length > 0) {
    const cells = [headerRow, columnHeader, ...rows];
    const block = WebImporter.DOMUtils.createTable(cells, document);
    element.replaceWith(block);
  }
}
