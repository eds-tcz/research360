export default function decorate(block)
{
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
                div.parentNode.insertBefore(hr, div.nextSibling); 

                // const newRow = document.createElement('div');
                // newRow.classList.add('new-row'); 

                // const p1 = document.createElement('p');
                // p1.textContent = 'Value 1'; 
                // const p2 = document.createElement('p');
                // p2.textContent = 'Value 2'; 
                // const p3 = document.createElement('p');
                // p3.textContent = 'Value 3'; 

                // newRow.appendChild(p1);
                // newRow.appendChild(p2);
                // newRow.appendChild(p3);

                // div.parentNode.insertBefore(newRow, hr.nextSibling); 
            }
        });
    });
}