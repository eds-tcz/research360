export default function decorate(block) {
    [...block.children].forEach((row, r) => {
        row.classList.add('market-sentiments-div');
        [...row.children].forEach((div, index) => {
            div.classList.add(`market-sentiments-${index + 1}`);
            const paragraphs = div.querySelectorAll('p');
            paragraphs.forEach((p, pIndex) => {
                p.classList.add(`market-sentiment-text-${pIndex + 1}`);
            });
            if (index === 0 && r === 0) {
                const hr = document.createElement('hr');
                // div.parentNode.insertBefore(hr, div.nextSibling);
            }
        });
    });
}