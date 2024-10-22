export default function decorate(block) {
  [...block.children].forEach((row, r) => {
    row.classList.add('heading-with-button');
    if (r === 0) {
      [...row.children].forEach((div, d) => {
        if (d === 0) { div.classList.add('mlow-heading-h2'); }
        if (d === 1) {
          div.classList.add('mlow-button-view-more');
          const aTag = div.querySelector('a');
          if (aTag && aTag.classList.contains('button')) {
            aTag.classList.remove('button');
          }
        }
      });
    }
  });
}
