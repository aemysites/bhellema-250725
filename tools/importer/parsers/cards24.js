/* global WebImporter */
export default function parse(element, { document }) {
  // Build header row for block table
  const headerRow = ['Cards (cards24)'];
  const rows = [];
  // Select each card anchor directly under the grid
  const cards = element.querySelectorAll(':scope > a.utility-link-content-block');
  cards.forEach((card) => {
    // First column: image element (reference the existing <img>)
    let image = '';
    const imageContainer = card.querySelector('.utility-aspect-2x3');
    if (imageContainer) {
      const foundImg = imageContainer.querySelector('img');
      if (foundImg) image = foundImg;
    }
    // Second column: wrap all relevant text content
    // Build a fragment with tag/date and heading
    const fragment = document.createElement('div');
    // Tag + date
    const tagAndDate = card.querySelector('.flex-horizontal');
    if (tagAndDate) {
      while (tagAndDate.childNodes.length > 0) {
        fragment.appendChild(tagAndDate.childNodes[0]);
      }
    }
    // Heading
    const heading = card.querySelector('h3, .h4-heading');
    if (heading) {
      fragment.appendChild(heading);
    }
    rows.push([image, fragment]);
  });
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);
  element.replaceWith(table);
}
