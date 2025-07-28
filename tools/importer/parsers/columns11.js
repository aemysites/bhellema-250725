/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table header row
  const headerRow = ['Columns (columns11)'];

  // 2. Get the two main columns (left content and right grid)
  const mainGrid = element.querySelector('.w-layout-grid.grid-layout.tablet-1-column.grid-gap-lg');
  let leftContent = null, rightContent = null;
  if (mainGrid) {
    const gridChildren = mainGrid.querySelectorAll(':scope > div');
    leftContent = gridChildren[0];
    rightContent = gridChildren[1];
  }

  // --- LEFT CELL: Compose all left-side content (heading, eyebrow, intro, byline, button) ---
  const leftBlock = document.createElement('div');

  // Eyebrow
  if (leftContent) {
    const eyebrow = leftContent.querySelector('.eyebrow');
    if (eyebrow) leftBlock.appendChild(eyebrow);
    // Heading
    const heading = leftContent.querySelector('h1, h2, h3, h4, h5, h6');
    if (heading) leftBlock.appendChild(heading);
  }
  // Intro text
  if (rightContent) {
    const intro = rightContent.querySelector('.rich-text.paragraph-lg');
    if (intro) leftBlock.appendChild(intro);
    // Byline info
    const byline = rightContent.querySelector('.flex-horizontal.y-center.flex-gap-xs');
    if (byline) leftBlock.appendChild(byline);
    // Read more button
    const readMore = rightContent.querySelector('a.button');
    if (readMore) leftBlock.appendChild(readMore);
  }

  // --- RIGHT CELL: Image grid ---
  // Find the image grid below main grid
  const imgGrid = element.querySelector('.w-layout-grid.grid-layout.mobile-portrait-1-column.grid-gap-md');
  let imgCells = [];
  if (imgGrid) {
    const imgDivs = imgGrid.querySelectorAll(':scope > div.utility-aspect-1x1');
    imgDivs.forEach(div => {
      const img = div.querySelector('img');
      if (img) imgCells.push(img);
      else imgCells.push(document.createTextNode(''));
    });
  }

  // --- Compose table rows ---
  // 2 columns, 2 rows (header, content). First row: header. Second row: left content, first image. Third row: (empty), second image.
  const rows = [
    headerRow,
    [leftBlock, imgCells[0] || ''],
    ['', imgCells[1] || '']
  ];

  // 4. Create and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
