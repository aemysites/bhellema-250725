/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;
  
  // Get direct children of the grid: we expect two columns for this block
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // Column 1: The heading (h2)
  const heading = columns[0].tagName.toLowerCase().startsWith('h') ? columns[0] : columns[0].querySelector('h1,h2,h3,h4,h5,h6');
  // Column 2: The rest (paragraph and button)
  let col2Content = [];
  // If the second column is a <div>, use its children
  if (columns[1].children.length) {
    col2Content = Array.from(columns[1].children);
  } else {
    col2Content = [columns[1]];
  }

  // Combine column 1: heading, column 2: paragraph + button
  const headerRow = ['Columns (columns14)'];
  const contentRow = [heading, col2Content];
  
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);
  
  element.replaceWith(table);
}
