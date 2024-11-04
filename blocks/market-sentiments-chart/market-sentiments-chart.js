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
}
// Function to fetch and populate Nifty Bank data
function getIndianIndices() {
  const url = "https://research360api.motilaloswal.com/api/getapisdata";
  const apiName = "GET_INDIAN_INDICES_WEB";

  fetch(`${url}?api_name=${apiName}&index_code=1`)
      .then(response => {
          if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
      })
      .then(data => {
          console.log("API Call Successful:", data);
          let marketData = data?.data
          populateIndianIndices(marketData)
      })
      .catch(error => {
          console.error("API Call Failed:", error);
      });
};
function populateIndianIndices(marketData) {
  const container = document.querySelector(".market-sentiments-chart");
  container.innerHTML = ""; // Clear any existing content

  marketData.forEach((data) => {
    const perChangeSign = data.per_change > 0 ? "+" : "-";
    const formattedDataChange = Math.abs(parseFloat(data.change).toFixed(2));
    const formattedPerChange = Math.abs(parseFloat(data.per_change).toFixed(2));

    // Create the HTML structure using template literals
    const marketDiv = `
      <div class="market-sentiments-div">
        <div class="market-sentiments-1">
          <p class="market-sentiment-text-1">${data.index_nm}</p>
          <p class="market-sentiment-text-2">${data.ltp}</p>
          <p class="market-sentiment-text-3" style="color: ${data.per_change > 0 ? 'green' : 'red'};">
            ${perChangeSign}${formattedDataChange} (${perChangeSign}${formattedPerChange}%)
          </p>
        </div>
      </div>
    `;

    // Append the populated HTML to the container
    container.insertAdjacentHTML('beforeend', marketDiv);
  });
}

getIndianIndices();
