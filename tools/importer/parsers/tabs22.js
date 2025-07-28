/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: block name only, per the example
  const rows = [['Tabs']];

  // Select tab labels
  const tabMenu = element.querySelector('.w-tab-menu');
  const tabLinks = tabMenu ? Array.from(tabMenu.querySelectorAll('a')) : [];

  // Select tab contents
  const tabContentContainer = element.querySelector('.w-tab-content');
  const tabPanes = tabContentContainer ? Array.from(tabContentContainer.querySelectorAll('.w-tab-pane')) : [];

  // For each label/content pair, append [label, content] row
  const n = Math.min(tabLinks.length, tabPanes.length);
  for (let i = 0; i < n; i++) {
    // Tab label: use div if present, fallback to a textContent
    let labelDiv = tabLinks[i].querySelector('div');
    let label = labelDiv ? labelDiv.textContent.trim() : tabLinks[i].textContent.trim();
    // Tab content: use inner grid if available, else pane itself
    let content = tabPanes[i].querySelector('.w-layout-grid') || tabPanes[i];
    rows.push([label, content]);
  }

  // Create the block table and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
