/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table header should exactly match example
  const headerRow = ['Hero (hero6)'];

  // 2. Find the background image (should be first grid cell's img)
  let imgEl = element.querySelector('img[src]');
  const imageRow = [imgEl ? imgEl : '']; // always a row, empty if not present

  // 3. Find the card containing h1, subheading, button(s)
  let card = element.querySelector('.card');
  const contentParts = [];
  if (card) {
    // Heading
    const h1 = card.querySelector('h1');
    if (h1) contentParts.push(h1);
    // Subheading or first paragraph
    const subheading = card.querySelector('.subheading') || card.querySelector('p');
    if (subheading) contentParts.push(subheading);
    // Button group (could be missing)
    const buttonGroup = card.querySelector('.button-group');
    if (buttonGroup) contentParts.push(buttonGroup);
  }
  const contentRow = [contentParts.length ? contentParts : ''];

  // Compose cells array, always 3 rows, 1 column
  const cells = [
    headerRow,
    imageRow,
    contentRow
  ];

  // Create and replace with block table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
