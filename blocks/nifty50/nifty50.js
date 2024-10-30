export default function decorate(block) {
  [...block.children].forEach((row) => {
    row.classList.add('nifty-cards');
    [...row.children].forEach((div, index) => {
      div.classList.add(`nifty-cards-${index + 1}`);
      const paragraphs = div.querySelectorAll('p');

      if (paragraphs.length >= 2) {
        const wrapper = document.createElement('div');
        wrapper.classList.add('flex-wrapper');

        wrapper.appendChild(paragraphs[0]);
        wrapper.appendChild(paragraphs[1]);

        div.insertBefore(wrapper, paragraphs[2] || null);
      }

      paragraphs.forEach((p, pIndex) => {
        p.classList.add(`nifty-paragraph-${pIndex + 1}`);
      });
      if (paragraphs.length >= 3) {
        const hr = document.createElement('hr');
        div.appendChild(hr);
        const graphContainer = document.createElement('div');
        graphContainer.classList.add('graph-container');

        const timeNav = document.createElement('div');
        timeNav.classList.add('time-nav');
        ['1D', '1W', '1M', '3M'].forEach((time) => {
          const tab = document.createElement('button');
          tab.textContent = time;
          tab.classList.add('time-tab');
          if (time === '1D') tab.classList.add('active');
          timeNav.appendChild(tab);
        });
        const graph = document.createElement('div');
        graph.classList.add('graph-area');
        const timeLabels = document.createElement('div');
        timeLabels.classList.add('time-labels');
        ['10:04', '12:04', '13:34', '15:04'].forEach((time) => {
          const label = document.createElement('span');
          label.textContent = time;
          timeLabels.appendChild(label);
        });
        graph.appendChild(timeLabels);
        graphContainer.appendChild(timeNav);
        graphContainer.appendChild(graph);
        div.appendChild(graphContainer);
      }
    });
  });
}
function getNifty50Data(indexCode) {
  const url = 'https://research360api.motilaloswal.com/api/getapisdata';
  const apiName = 'EQ_INDEX_SNAPSHOT_WEB';

  fetch(`${url}?api_name=${apiName}&index_code=${indexCode}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      const indexData = data.data[0];
      const nifty50Card = document.querySelector('.nifty50 .nifty-cards-1');
      nifty50Card.querySelector('.nifty-paragraph-1').innerText = indexData.co_name || 'NIFTY 50';
      nifty50Card.querySelector(
        '.nifty-paragraph-2',
      ).innerText = `${new Date().toLocaleTimeString()}`;
      nifty50Card.querySelector(
        '.nifty-paragraph-3',
      ).innerText = `${indexData.ltp}`;
      const additionalInfo = document.createElement('p');
      nifty50Card.appendChild(additionalInfo);
    });
  // .catch((error) => {
  //   console.error('API Call Failed:', error);
  // });
}

getNifty50Data('20559');
