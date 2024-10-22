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
        } else if (index === 1) {
            div.innerHTML = `
                <p>BANK NIFTY</p>
                <p>44,521.45</p>
                <p>-289.65</p>
                <p>-0.72%</p>
            `;
        } else if (index === 2) {
            div.innerHTML = `
                <p>NIFTY IT</p>
                <p>33,256.80</p>
                <p>+156.40</p>
                <p>+0.45%</p>
            `;
        }
    });
}