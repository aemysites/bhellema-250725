/* global WebImporter */
export default function parse(element, { document }) {
  // Table header: must match example exactly
  const headerRow = ['Cards (cards21)'];

  // Single card structure: find the innermost .card-body
  let cardBody = element.querySelector('.card-body');
  if (!cardBody) {
    // fallback for variations
    cardBody = element.querySelector('[class*="card-body"]');
  }

  // First cell: image (mandatory per spec)
  let img = cardBody ? cardBody.querySelector('img') : null;

  // Second cell: text content (title is typically a heading)
  // Find the first heading in cardBody (could be div, h4, etc.)
  let title = null;
  if (cardBody) {
    // Accepts any heading or styled div as title
    title = cardBody.querySelector('h1, h2, h3, h4, h5, h6, .h4-heading');
  }
  const textCell = [];
  if (title) textCell.push(title);
  // (No description or CTA present in provided HTML. If present, would be added here)

  // Build the block table rows
  const rows = [
    headerRow,
    [img, textCell]
  ];

  // Create the table using the DOMUtils helper
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the block table
  element.replaceWith(table);
}
