export default function decorate(block) {
  [...block.children].forEach((row) => {
    row.classList.add('teji-image-card');
    [...row.children].forEach((div, d) => {
      if (d === 0) {
        div.classList.add('teji-card-image');
      }
      if (d === 1) {
        div.classList.add('teji-card-title');
      }
      if (d === 2) {
        div.classList.add('teji-card-date');
      }
      if (d === 3) {
        div.classList.add('teji-card-amount');
      }
      if (d === 4) {
        div.classList.add('teji-card-percentage');
      }
    });
  });
}
