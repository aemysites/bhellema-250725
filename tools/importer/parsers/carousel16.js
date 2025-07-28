/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout containing the slides
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  const slides = Array.from(grid.children);
  const cells = [];
  // The table header matches the block name
  cells.push(['Carousel']);

  slides.forEach((slide) => {
    // Find the first <img> in each slide (as per the structure)
    const img = slide.querySelector('img');
    if (img) {
      cells.push([img]); // Only one image per slide, no additional content present
    }
  });

  // Build the carousel block table
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
