export default function decorate(block) {
  [...block.children].forEach((row) => {
    row.classList.add('mlow-market-head');
    [...row.children].forEach((div, d) => {
      if (d === 0) {
        div.classList.add('market-card-title');
      }
      if (d === 1) {
        div.classList.add('market-card-filter');
      }
      if (d === 2) {
        div.classList.add('market-card-table');
      }
      if (d === 3) {
        div.classList.add('market-card-button');
      }
    });
  });
}
