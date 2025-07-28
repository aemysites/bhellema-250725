/* global WebImporter */
export default function parse(element, { document }) {
  // Find the .container inside the section
  const container = element.querySelector(':scope > .container');
  if (!container) return;
  // Find the main grid layout
  const grid = container.querySelector(':scope > .grid-layout');
  if (!grid) return;

  // The grid's children: 0 = left main, 1 = top right (2 cards), 2 = bottom right (6 cards)
  const gridChildren = Array.from(grid.children);

  // First column: the large left block (first <a>)
  const leftCol = gridChildren.find(child => child.tagName === 'A');
  if (!leftCol) return;

  // The first .flex-horizontal with 2 <a>
  const rightTop = gridChildren.find(
    el => el.classList.contains('flex-horizontal') && el.querySelectorAll(':scope > a').length === 2
  );
  // The second .flex-horizontal with 6 <a>
  const rightBottom = gridChildren.find(
    el => el.classList.contains('flex-horizontal') && el.querySelectorAll(':scope > a').length === 6
  );

  // Extract the two right-top <a>
  const rightTopLinks = rightTop ? Array.from(rightTop.querySelectorAll(':scope > a')) : [];
  // Extract the six right-bottom <a>
  const rightBottomLinks = rightBottom ? Array.from(rightBottom.querySelectorAll(':scope > a')) : [];

  // Compose the columns:
  // - Left column: leftCol
  // - Right column: the two rightTopLinks + the six rightBottomLinks
  // We'll combine all right links in a single right column using a <div>
  const rightColContent = document.createElement('div');
  rightTopLinks.forEach(el => rightColContent.appendChild(el));
  rightBottomLinks.forEach(el => rightColContent.appendChild(el));

  // Build an inner table with two columns (left and right) for the content row
  const innerTableRows = [
    [leftCol, rightColContent]
  ];
  const innerTable = WebImporter.DOMUtils.createTable(innerTableRows, document);

  // OUTER table: header and one content row (which has the two columns inside)
  const headerRow = ['Columns (columns2)'];
  const contentRow = [innerTable];

  const block = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);
  element.replaceWith(block);
}
