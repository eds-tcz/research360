export default function decorate(block) {
  [...block.children].forEach((row, r) => {
    // Adding Classes to All <div> tags under main tag
    row.classList.add('header-nav-row-'.concat(r + 1));
    if (r === 0) {
      [...row.children].forEach((div, d) => {
        if (d === 0) {
          div.classList.add('main-logo');
        }
        if (d === 1) {
          div.classList.add('main-search-bar');
          const pTag = div.querySelector('p');
          if (pTag) {
            pTag.remove();
          }
          // Create and append the search bar dynamically
          const searchBarContainer = document.createElement('div');
          searchBarContainer.classList.add('search-bar-container');
          const searchBar = document.createElement('div');
          searchBar.classList.add('search-bar');
          const searchIcon = document.createElement('span');
          searchIcon.classList.add('search-icon');
          const searchImage = document.createElement('img');
          searchImage.src = '../../images/mlow-market-nav-1/search-icon.svg'; // Set your search icon URL
          searchImage.alt = 'Search Icon';
          searchIcon.appendChild(searchImage);
          const inputField = document.createElement('input');
          inputField.type = 'text';
          inputField.placeholder = 'Search Stocks, Company, Brands etc.';
          searchBar.appendChild(searchIcon);
          searchBar.appendChild(inputField);
          searchBarContainer.appendChild(searchBar);
          // Append the search bar to the div
          div.appendChild(searchBarContainer);
        }
        if (d === 2) {
          div.classList.add('login-button');
        }
      });
    }
  });
}
