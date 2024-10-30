async function getIndianIndices() {
  const url = 'https://research360api.motilaloswal.com/api/getapisdata';
  const apiName = 'GET_INDIAN_INDICES_WEB';
  function getChangeColor(perChange) {
    if (perChange > 0) return 'green';
    if (perChange < 0) return 'red';
    return 'inherit';
  }
  function updateDivContent(div, data) {
    const text1 = div.querySelector('.market-sentiment-text-1');
    const text2 = div.querySelector('.market-sentiment-text-2');
    const text3 = div.querySelector('.market-sentiment-text-3');

    if (!text1 || !text2 || !text3 || !data) return;

    const perChangeSign = data.per_change > 0 ? '+' : '';
    const formattedDataChange = parseFloat(data.change).toFixed(2);
    const formattedPerChange = parseFloat(data.per_change).toFixed(2);

    text1.textContent = data.index_nm;
    text2.textContent = data.ltp.toString();
    text3.textContent = `${perChangeSign}${formattedDataChange}(${perChangeSign}${formattedPerChange}%)`;

    // Set color based on change
    text3.style.color = getChangeColor(data.per_change);
  }
  function clearDivContent(div) {
    const text1 = div.querySelector('.market-sentiment-text-1');
    const text2 = div.querySelector('.market-sentiment-text-2');
    const text3 = div.querySelector('.market-sentiment-text-3');

    if (text1) text1.textContent = '';
    if (text2) text2.textContent = '';
    if (text3) text3.textContent = '';
  }

  function populateIndianIndices(marketData) {
    if (!marketData) return;

    const sentimentDivs = document.querySelectorAll('.market-sentiments-div');
    sentimentDivs.forEach((div, index) => {
      if (index >= marketData.length) {
        clearDivContent(div);
        return;
      }

      const data = marketData[index];
      updateDivContent(div, data);
    });
  }
  try {
    const response = await fetch(`${url}?api_name=${apiName}&index_code=1`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    const marketData = data?.data;
    populateIndianIndices(marketData);
  } catch (error) {
    // Handle error silently or log to a service
    // Using console.error for development only
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.error('API Call Failed:', error);
    }
  }
}

export default function decorate(block) {
  [...block.children].forEach((row) => {
    row.classList.add('market-sentiments-div');
    [...row.children].forEach((div, index) => {
      div.classList.add(`market-sentiments-${index + 1}`);
      const paragraphs = div.querySelectorAll('p');
      paragraphs.forEach((p, pIndex) => {
        p.classList.add(`market-sentiment-text-${pIndex + 1}`);
      });
    });
  });
  getIndianIndices();
}
