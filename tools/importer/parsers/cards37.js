/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: extract all cards from a grid
  function extractCards(grid) {
    const cards = [];
    // Each card is an <a> with utility-link-content-block
    const cardNodes = Array.from(grid.children).filter(child => {
      return child.classList && child.classList.contains('utility-link-content-block');
    });
    cardNodes.forEach(card => {
      // Image cell
      let img = null;
      // Find either utility-aspect-2x3 or utility-aspect-1x1 as image container
      const imgDiv = card.querySelector('.utility-aspect-2x3, .utility-aspect-1x1');
      if (imgDiv) {
        img = imgDiv.querySelector('img');
      } else {
        // fallback if img is directly inside card
        img = card.querySelector('img');
      }
      // Text cell: may be inside .utility-padding-all-2rem or direct children
      let textRoot = card.querySelector('.utility-padding-all-2rem') || card;
      // Heading (h3 or .h2-heading or .h4-heading)
      let heading = textRoot.querySelector('h3, .h2-heading, .h4-heading');
      // Paragraph - description
      let desc = textRoot.querySelector('p');
      // CTA (button, link, or .button)
      let cta = textRoot.querySelector('.button, a.button, button');
      // Build text cell as array of referenced elements in correct order
      const textCell = [];
      if (heading) textCell.push(heading);
      if (desc) textCell.push(desc);
      if (cta) textCell.push(cta);
      // Always push [img, textCell]
      cards.push([
        img ? img : '',
        textCell.length === 1 ? textCell[0] : (textCell.length > 1 ? textCell : '')
      ]);
    });
    return cards;
  }

  // 1. Find the top-level grid containing cards (direct or nested)
  let cards = [];
  // In this structure, first .grid-layout contains both direct cards and a nested grid
  const topGrid = element.querySelector('.w-layout-grid.grid-layout');
  if (topGrid) {
    // Direct children can be cards or nested grids
    // Direct cards
    Array.from(topGrid.children).forEach(child => {
      if (child.classList && child.classList.contains('utility-link-content-block')) {
        // Single card
        cards = cards.concat(extractCards({children: [child]}));
      } else if (child.classList && child.classList.contains('w-layout-grid')) {
        // Nested grid
        cards = cards.concat(extractCards(child));
      }
    });
  }

  // Fallback: if nothing found, check if the element itself is a grid and acts as the card root
  if (cards.length === 0 && element.classList.contains('w-layout-grid')) {
    cards = extractCards(element);
  }

  // 2. Build the table structure
  const cells = [['Cards (cards37)']];
  for (const card of cards) {
    cells.push(card);
  }

  // 3. Replace the section with the cards table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
