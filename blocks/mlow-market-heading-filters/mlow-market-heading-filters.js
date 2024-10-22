export default function decorate(block) {
  [...block.children].forEach((row, r) => {
    row.classList.add('heading-filters');
    if (r === 0) {
      [...row.children].forEach((div, d) => {
        if (d === 0) {
          div.classList.add('filter-ul');
        }
      });
    }
  });
}
