/* global WebImporter */
export default function parse(element, { document }) {
  // Get the main grid container for columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  // Get all immediate children of grid layout
  const children = Array.from(grid.children);

  // We expect: text/main (div), contact-list (ul), image (img)
  let textContent = null;
  let contactList = null;
  let image = null;

  children.forEach(child => {
    if (child.tagName === 'DIV') {
      textContent = child;
    } else if (child.tagName === 'UL') {
      contactList = child;
    } else if (child.tagName === 'IMG') {
      image = child;
    }
  });

  // Combine text content div + contact list into a single column (if present)
  const col1 = document.createElement('div');
  if (textContent) col1.appendChild(textContent);
  if (contactList) col1.appendChild(contactList);

  // Second column: image (if present)
  const col2 = image ? image : '';

  const cells = [
    ['Columns (columns18)'],
    [col1, col2]
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
