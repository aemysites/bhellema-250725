/* global WebImporter */
export default function parse(element, { document }) {
  // Create a header row where the th spans both columns
  const headerTh = document.createElement('th');
  headerTh.setAttribute('colspan', '2');
  headerTh.textContent = 'Cards (cards17)';
  const headerRow = [headerTh];

  // Extract all card containers
  const cardDivs = Array.from(element.querySelectorAll(':scope > div.utility-aspect-1x1'));
  // Each row: [image, empty cell]
  const rows = cardDivs.map(cardDiv => {
    const img = cardDiv.querySelector('img');
    return [img || '', ''];
  });

  const cells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
