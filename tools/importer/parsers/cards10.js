/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (cards10)'];
  const cells = [headerRow];

  // Get all direct card links
  const cardLinks = element.querySelectorAll(':scope > a.card-link');
  cardLinks.forEach(card => {
    // Get image (first direct child div, then the img inside)
    const imgDiv = card.querySelector(':scope > div');
    const img = imgDiv ? imgDiv.querySelector('img') : null;

    // Get text content container
    const textDiv = card.querySelector('.utility-padding-all-1rem');
    
    // Compose text content using existing elements (do not clone)
    const textContentParts = [];
    if (textDiv) {
      // Tag (optional)
      const tagGroup = textDiv.querySelector('.tag-group');
      if (tagGroup) textContentParts.push(tagGroup);

      // Heading
      const heading = textDiv.querySelector('h3, .h4-heading');
      if (heading) textContentParts.push(heading);

      // Paragraph/Description
      const desc = textDiv.querySelector('p');
      if (desc) textContentParts.push(desc);
    }

    // Push row: [image, [tag, heading, description]]
    cells.push([
      img,
      textContentParts
    ]);
  });

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
