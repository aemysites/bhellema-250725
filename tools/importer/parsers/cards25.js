/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (cards25)'];
  const cells = [headerRow];

  // Get all top-level card containers: only those with both an image and text content
  const cardDivs = Array.from(element.querySelectorAll(':scope > div'));

  cardDivs.forEach((cardDiv) => {
    // Look for image (mandatory, always present)
    const img = cardDiv.querySelector('img');
    // Look for the text content (prefer .utility-padding-all-2rem, fallback to h3+p)
    let textContent = null;
    let contentDiv = cardDiv.querySelector('.utility-padding-all-2rem');
    if (contentDiv) {
      textContent = contentDiv;
    } else {
      // Fallback: create a wrapper for h3 and p if both exist
      const h3 = cardDiv.querySelector('h3');
      const p = cardDiv.querySelector('p');
      if (h3 || p) {
        const wrapper = document.createElement('div');
        if (h3) wrapper.appendChild(h3);
        if (p) wrapper.appendChild(p);
        textContent = wrapper.childNodes.length ? wrapper : null;
      }
    }

    // Only add rows that have BOTH image and some text content
    if (img && textContent && textContent.textContent.trim().length > 0) {
      cells.push([img, textContent]);
    }
  });

  // Only create block if there's at least the header and one card
  if (cells.length > 1) {
    const table = WebImporter.DOMUtils.createTable(cells, document);
    element.replaceWith(table);
  }
}
