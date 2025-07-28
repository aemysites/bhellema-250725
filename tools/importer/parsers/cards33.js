/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as in the example
  const headerRow = ['Cards (cards33)'];

  // Get all immediate card links (each card is an <a> direct child)
  const cards = Array.from(element.querySelectorAll(':scope > a'));

  const rows = cards.map(card => {
    // Card image: use original element reference
    const img = card.querySelector('img');

    // Find the text container inside this card (the inner grid's second main div)
    // This is the <div> containing tag/time, heading, desc, CTA in order
    const grids = card.querySelectorAll('.w-layout-grid');
    let textBlock = null;
    if (grids.length) {
      // The second child of the card is usually the content div
      const innerDivs = grids[0].querySelectorAll(':scope > div');
      // Sometimes the first inner div is the info (tag/time), the second is text
      // But in this HTML, the whole text content is inside the second child of the grid
      if (innerDivs.length > 1) {
        textBlock = innerDivs[1];
      } else {
        // fallback: use the only content div
        textBlock = innerDivs[0];
      }
    }
    // If grid could not be found, fallback to div after img
    if (!textBlock) {
      const allDivs = card.querySelectorAll('div');
      for (const d of allDivs) {
        if (d !== grids[0] && !d.querySelector('img')) {
          textBlock = d;
          break;
        }
      }
    }

    // Compose the text cell contents
    const textCell = document.createElement('div');

    // Tag + read time (optional, on one row)
    const tagTime = textBlock ? textBlock.querySelector('.flex-horizontal') : null;
    if (tagTime) {
      // tag
      const tag = tagTime.querySelector('.tag');
      if (tag) {
        // just use the text of the tag
        const tagSpan = document.createElement('span');
        tagSpan.textContent = tag.textContent.trim();
        tagSpan.style.fontWeight = 'bold';
        tagSpan.style.fontSize = '0.85em';
        textCell.appendChild(tagSpan);
        textCell.appendChild(document.createTextNode(' '));
      }
      // read time
      const time = tagTime.querySelector('.paragraph-sm');
      if (time) {
        const timeSpan = document.createElement('span');
        timeSpan.textContent = time.textContent.trim();
        timeSpan.style.fontSize = '0.85em';
        textCell.appendChild(timeSpan);
      }
      textCell.appendChild(document.createElement('br'));
    }
    // Heading (h3)
    const heading = textBlock ? textBlock.querySelector('h3, .h4-heading') : null;
    if (heading) {
      const strong = document.createElement('strong');
      strong.textContent = heading.textContent;
      textCell.appendChild(strong);
      textCell.appendChild(document.createElement('br'));
    }
    // Description (p)
    const desc = textBlock ? textBlock.querySelector('p') : null;
    if (desc) {
      textCell.appendChild(document.createTextNode(desc.textContent));
      textCell.appendChild(document.createElement('br'));
    }
    // CTA (the 'Read' at the bottom, optionally linkified)
    // CTA is usually last div in textBlock
    let cta = null;
    if (textBlock) {
      // get all div children, last one is usually CTA
      const divs = textBlock.querySelectorAll(':scope > div');
      if (divs.length) {
        cta = divs[divs.length - 1];
      }
    }
    if (cta && cta.textContent.trim().toLowerCase() === 'read') {
      // linkify with card href
      const ctaLink = document.createElement('a');
      ctaLink.href = card.getAttribute('href') || '#';
      ctaLink.textContent = cta.textContent.trim();
      textCell.appendChild(ctaLink);
    }
    // Remove trailing br if CTA not found
    if (!cta) {
      const lastChild = textCell.lastChild;
      if (lastChild && lastChild.tagName === 'BR') {
        textCell.removeChild(lastChild);
      }
    }
    return [img, textCell];
  });

  const tableRows = [headerRow, ...rows];
  const block = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(block);
}
