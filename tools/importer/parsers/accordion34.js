/* global WebImporter */
export default function parse(element, { document }) {
  // Find all direct children that are accordion blocks
  const accordionItems = Array.from(element.querySelectorAll(':scope > .accordion, :scope > .w-dropdown'));

  const rows = [];
  // Exact header as required
  rows.push(['Accordion']);

  accordionItems.forEach((item) => {
    // Title: look for .w-dropdown-toggle's .paragraph-lg
    let title = item.querySelector('.w-dropdown-toggle .paragraph-lg');
    // Fallback: use the whole .w-dropdown-toggle if .paragraph-lg is missing
    if (!title) {
      title = item.querySelector('.w-dropdown-toggle');
    }
    // Content: look for .w-dropdown-list .w-richtext, else just .w-dropdown-list, else fallback to empty div
    let content = item.querySelector('.w-dropdown-list .w-richtext');
    if (!content) {
      content = item.querySelector('.w-dropdown-list');
    }
    // Defensive: ensure at least an empty element if none found
    if (!title) {
      title = document.createElement('div');
    }
    if (!content) {
      content = document.createElement('div');
    }
    rows.push([title, content]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
