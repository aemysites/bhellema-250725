/* global WebImporter */
export default function parse(element, { document }) {
  // Create the block table header
  const cells = [['Cards']];

  // Get all direct child card containers
  const cardDivs = element.querySelectorAll(':scope > div');

  cardDivs.forEach((cardDiv) => {
    // Each card: find the text p (always present in this block)
    const para = cardDiv.querySelector('p');
    if (para) {
      // reference the existing <p> element for the cell
      cells.push([para]);
    }
  });

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
