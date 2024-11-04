export default function decorate(block) {
  [...block.children].forEach((row, r) => {
    row.classList.add('world-indices-div');
    [...row.children].forEach((div, index) => {
      div.classList.add(`world-indices-${index + 1}`);
      const paragraphs = div.querySelectorAll('p');
      paragraphs.forEach((p, pIndex) => {
        p.classList.add(`world-indices-text-${pIndex + 1}`);
      });
      if (index === 0 && r === 0) {
        // const hr = document.createElement('hr');
      }
    });
  });
}
