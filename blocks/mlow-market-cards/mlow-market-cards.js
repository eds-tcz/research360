export default function decorate(block) {
  [...block.children].forEach((row) => {
    row.classList.add('image-card');
    [...row.children].forEach((div, d) => {
      if (d === 0) {
        div.classList.add('image-card-image');
      }
      if (d === 1) {
        div.classList.add('image-card-title');
      }
      if (d === 2) {
        div.classList.add('image-card-date');
      }
    });
  });
}
