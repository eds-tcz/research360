// export default function decorate(block) {
//     [...block.children].forEach((row, r) => {
//         row.classList.add('market-sentiments-div');
//         [...row.children].forEach((div, index) => {
//             div.classList.add(`market-sentiments-${index + 1}`);
//             const paragraphs = div.querySelectorAll('p');
//             paragraphs.forEach((p, pIndex) => {
//                 p.classList.add(`market-sentiment-text-${pIndex + 1}`);
//             });
//             if (index === 0 && r === 0) {
//                 const hr = document.createElement('hr');
//                 // div.parentNode.insertBefore(hr, div.nextSibling);
//             }
//         });
//     });
// }
function getIndianIndices() {
  const url = "https://research360api.motilaloswal.com/api/getapisdata";
  const apiName = "GET_INDIAN_INDICES_WEB";

  fetch(`${url}?api_name=${apiName}&index_code=1`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log("API Call Successful:", data);
      let marketData = data?.data;
      populateIndianIndices(marketData);
    })
    .catch((error) => {
      console.error("API Call Failed:", error);
    });
}
function populateIndianIndices(marketData) {
  const sentimentDivs = document.querySelectorAll(".market-sentiments-div");
  sentimentDivs.forEach((div, index) => {
    if (index < marketData.length) {
      const data = marketData[index];
      const text1 = div.querySelector(".market-sentiment-text-1");
      const text2 = div.querySelector(".market-sentiment-text-2");
      const text3 = div.querySelector(".market-sentiment-text-3");
      const perChangeSign = data.per_change > 0 ? "+" : "-";

      const formattedDataChange = parseFloat(data.change).toFixed(2);
      const formattedPerChange = parseFloat(data.per_change).toFixed(2);

      text1.textContent = `${data.index_nm}`;
      text2.textContent = `${data.ltp}`;
      text3.textContent = `${perChangeSign}${formattedDataChange}(${perChangeSign}${formattedPerChange}%)`;
      if (data.per_change > 0) {
        text3.style.color = "green"; // Set text color to green for positive change
      } else if (data.per_change < 0) {
        text3.style.color = "red"; // Set text color to red for negative change
      }
    } else {
      // Clear content if no data is available
      div.querySelector(".market-sentiment-text-1").textContent = "";
      div.querySelector(".market-sentiment-text-2").textContent = "";
    }
  });
}
getIndianIndices();

export default async function decorate(block) {
  getIndianIndices(block);
}

function getIndianIndices(block) {
  const url = "https://research360api.motilaloswal.com/api/getapisdata";
  const apiName = "GET_INDIAN_INDICES_WEB";

  fetch(`${url}?api_name=${apiName}&index_code=1`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log("API Call Successful:", data);
      let marketData = data?.data[0].index_nm;
      block.append(marketData);
    })
    .catch((error) => {
      console.error("API Call Failed:", error);
    });
}
