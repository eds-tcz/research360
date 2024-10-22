export default function decorate(block) {
    [...block.children].forEach((row, r) => {
        row.classList.add('nifty-cards');
        [...row.children].forEach((div, index) => {
            div.classList.add(`nifty-cards-${index + 1}`);
        });
        const cardContents = {
            0: ['NIFTY 50', '19,789.35', '-135.20', '-0.68%'],
            1: ['BANK NIFTY', '44,521.45', '-289.65', '-0.72%'],
            2: ['NIFTY IT', '33,256.80', '+156.40', '+0.45%']
        };

        div.innerHTML = '';
        
        cardContents[index].forEach(content => {
            const p = document.createElement('p');
            p.textContent = content;
            div.appendChild(p);
        });
    });
}