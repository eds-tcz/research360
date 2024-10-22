export default function decorate(block) {
  [...block.children].forEach((row) => {
    row.classList.add('footer-col');
    [...row.children].forEach((div) => {
      div.classList.add('footer-list');
    });
  });
}
