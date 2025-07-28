/* global WebImporter */
export default function parse(element, { document }) {
  // Find the first container inside the section
  const container = element.querySelector('.container');
  if (!container) return;

  // Find the main grid that holds the two top columns and bottom info row
  const mainGrid = container.querySelector('.w-layout-grid.grid-layout');
  if (!mainGrid) return;

  // The first two children are the two columns, the last is the author/info grid
  const children = Array.from(mainGrid.children);
  if (children.length < 3) return;

  // Left and right columns (the heading/author and the quote)
  const leftCol = children[0]; // h2-heading
  const rightCol = children[1]; // paragraph-lg
  const infoGrid = children[2]; // nested grid, contains bottom row info

  // infoGrid children: [0]=divider, [1]=flex-horizontal (avatar+name), [2]=logo svg
  const infoChildren = Array.from(infoGrid.children);
  const avatarBlock = infoChildren.find((el) => el.classList.contains('flex-horizontal'));
  const logoBlock = infoChildren.find((el) => el.querySelector('svg'));

  // Compose left cell: heading + avatar/name
  const leftCell = document.createElement('div');
  if (leftCol) leftCell.appendChild(leftCol);
  if (avatarBlock) leftCell.appendChild(avatarBlock);

  // Compose right cell: quote + logo
  const rightCell = document.createElement('div');
  if (rightCol) rightCell.appendChild(rightCol);
  if (logoBlock) rightCell.appendChild(logoBlock);

  // Build the columns block table
  const table = WebImporter.DOMUtils.createTable([
    ['Columns (columns26)'],
    [leftCell, rightCell]
  ], document);

  element.replaceWith(table);
}
