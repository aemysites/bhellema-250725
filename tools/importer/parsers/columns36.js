/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid containing two columns
  const mainGrid = element.querySelector('.w-layout-grid.grid-layout');
  if (!mainGrid) return;

  // Columns: left is text/buttons, right is image grid
  const cols = mainGrid.querySelectorAll(':scope > div');
  if (cols.length < 2) return;
  const leftCol = cols[0];
  const rightCol = cols[1];

  // LEFT COLUMN: Collect heading, subheading, buttons
  const leftContent = [];
  // heading
  const h1 = leftCol.querySelector('h1');
  if (h1) leftContent.push(h1);
  // subheading
  const sub = leftCol.querySelector('p');
  if (sub) leftContent.push(sub);
  // button group
  const btns = leftCol.querySelector('.button-group');
  if (btns) leftContent.push(btns);

  // RIGHT COLUMN: grid of images
  let rightContent = [];
  const imageGrid = rightCol.querySelector('.w-layout-grid');
  if (imageGrid) {
    rightContent = Array.from(imageGrid.querySelectorAll('img'));
  }

  // Build columns block table
  const table = WebImporter.DOMUtils.createTable([
    ['Columns (columns36)'],
    [leftContent, rightContent]
  ], document);

  element.replaceWith(table);
}
