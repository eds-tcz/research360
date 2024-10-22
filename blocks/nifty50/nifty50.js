export default function decorate(block) {
    [...block.children].forEach((row, r) => {
        row.classList.add('nifty-cards');
        [...row.children].forEach((div, index) => {
            div.classList.add(`nifty-cards-${index + 1}`);
        });
        if (index === 0) {  
            div.innerHTML = `
                <p>NIFTY 50</p>
                <p>19,789.35</p>
                <p>-135.20</p>
                <p>-0.68%</p>
            `;
        }
    });
}