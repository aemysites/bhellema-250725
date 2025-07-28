/* global WebImporter */
export default function parse(element, { document }) {
  // Find main columns grid
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get top-level columns in the grid (should be 4 per HTML structure)
  const columns = Array.from(grid.children);

  // There should be 4 columns according to the HTML provided:
  // 0: author name
  // 1: tags block
  // 2: heading
  // 3: text block (rich text)

  // For a 3-column block as in the reference, combine columns as follows:
  // - Left: author name
  // - Middle: tags + heading + text
  // - Right: (none in this layout, so only 2 columns needed)

  // Author name (left col)
  const leftCol = columns[0];

  // Compose middle column: tags + heading + text
  const middleCol = document.createElement('div');
  if (columns[1]) middleCol.appendChild(columns[1]);
  if (columns[2]) middleCol.appendChild(columns[2]);
  if (columns[3]) middleCol.appendChild(columns[3]);

  // Final row for columns block
  const contentRow = [leftCol, middleCol];

  // Compose table for columns block
  const cells = [
    ['Columns (columns30)'],
    contentRow
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(table);
}
