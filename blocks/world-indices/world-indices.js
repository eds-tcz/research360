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
function getWorldIndices() {
  const url = "https://research360api.motilaloswal.com/api/getapisdata";
  const apiName = "GET_WORLDINDICES";

  fetch(`${url}?api_name=${apiName}&index_code=0`)
      .then(response => {
          if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
      })
      .then(data => {
          console.log("API Call Successful:", data);
          let marketData = data?.data
          populateWorldIndices(marketData)
      })
      .catch(error => {
          console.error("API Call Failed:", error);
      });
};
function populateWorldIndices(marketData) {
  const container = document.querySelector(".world-indices");
  container.innerHTML = ""; // Clear any existing content

  marketData.forEach((data) => {
    const perChangeSign = data.change_per > 0 ? "+" : "-";
    const formattedDataChange = Math.abs(parseFloat(data.chnge).toFixed(2));
    const formattedPerChange = Math.abs(parseFloat(data.change_per).toFixed(2));

    // Create the HTML structure using template literals
    const marketDiv = `
      <div class="world-indices-div">
        <div class="world-indices-1">
          <p class="world-indices-text-1">${data.index_name}</p>
          <p class="world-indices-text-2">${data.last}</p>
          <p class="world-indices-text-3" style="color: ${data.change_per > 0 ? 'green' : 'red'};">
            ${perChangeSign}${formattedDataChange} (${perChangeSign}${formattedPerChange}%)
          </p>
          <p class="world-indices-text-4">${formatTimeTo12Hour(data.dtm)}</p>
        </div>
      </div>
    `;
    // Append the populated HTML to the container
    container.insertAdjacentHTML('beforeend', marketDiv);
  });
}
function formatTimeTo12Hour(time) {
  const [hours, minutes] = time.split(':').map(Number);
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const formattedHour = hours % 12 || 12; // Convert 0 to 12 for midnight/noon
  return `${formattedHour}:${minutes.toString().padStart(2, '0')} ${ampm}`;
}
getWorldIndices();