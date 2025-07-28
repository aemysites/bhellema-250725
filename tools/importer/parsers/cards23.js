/* global WebImporter */
export default function parse(element, { document }) {
  // Process each tab-pane in the tabs-content (one per block table)
  const tabPanes = Array.from(element.querySelectorAll(':scope > .w-tab-pane'));

  tabPanes.forEach((tabPane) => {
    const grid = tabPane.querySelector('.w-layout-grid');
    if (!grid) return;
    const cards = Array.from(grid.querySelectorAll(':scope > a'));
    const rows = [];
    // Add block header row
    rows.push(['Cards (cards23)']);
    cards.forEach((card) => {
      // IMAGE CELL
      let imageCell = null;
      const img = card.querySelector('img');
      if (img) {
        imageCell = img;
      } else {
        // If no image, provide an empty div as a cell
        imageCell = document.createElement('div');
      }

      // TEXT CELL: collect heading and paragraph in order
      const textCell = document.createElement('div');
      // Find the heading (h3 or .h4-heading)
      const heading = card.querySelector('h3, .h4-heading');
      if (heading) textCell.appendChild(heading);
      // Find the description (paragraph)
      const desc = card.querySelector('.paragraph-sm');
      if (desc) textCell.appendChild(desc);

      rows.push([imageCell, textCell]);
    });
    // Create and swap the table for the grid
    const table = WebImporter.DOMUtils.createTable(rows, document);
    grid.replaceWith(table);
  });
}
