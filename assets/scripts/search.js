let currentPage = 1;
const resultsPerPage = 5;

async function fetchResults() {
    const searchType = document.getElementById('searchType').value;
    const searchTerm = document.getElementById('searchBox').value || '%';
    const sortType = document.getElementById('sortType').value;

    const response = await fetch(`./php/searchResults.php?${searchType}=${searchTerm}&sort=${sortType}&page=${currentPage}`);
    const results = await response.json();

    displayResults(results.artworks);
    displayResultSummary(results.totalCount);
    displayPagination(results.totalCount);
}

function displayResults(artworks) {
    const container = document.getElementById('resultContainer');
    container.innerHTML = '';

    if (artworks.length === 0) {
        container.innerHTML = 'No results found';
        return;
    }

    for (let artwork of artworks) {

        let card = document.createElement('div');
        card.className = 'resultCard';

        let image = document.createElement('img');
        image.src = './assets/images/works/square-small/' + artwork.ImageFileName + '.jpg';
        image.alt = artwork.Title;
        card.appendChild(image);

        let name = document.createElement('h2');
        name.textContent = artwork.Title;
        card.appendChild(name);

        let author = document.createElement('h3');
        author.textContent = artwork.Author;
        card.appendChild(author);

        let year = document.createElement('p'); // 新增显示年份的元素
        year.textContent = 'Year: ' + artwork.YearOfWork;
        card.appendChild(year);

        let price = document.createElement('p');
        
        price.textContent ="Cost: " + "$" + parseFloat(artwork.Cost).toFixed(2);
        card.appendChild(price);

        let visited = document.createElement('p');
        visited.textContent = 'Visited: ' + artwork.Visited;
        card.appendChild(visited);

        if (artwork.status == 1) {  // 如果商品已售出，则显示Sold Out
            let status = document.createElement('p');
            status.textContent = 'Sold Out';
            status.style.color = 'red';
            card.appendChild(status);
        }

        card.addEventListener('click', function () {
            // Send a request to increase the visit count
            fetch('./php/increaseVisited.php', {
                method: 'POST',
                body: JSON.stringify({ PaintingID: artwork.PaintingID })
            });
            // Open the artwork detail page
            window.location.href = 'details.html?id=' + artwork.PaintingID;
        });

        container.appendChild(card);
    }
}

function displayResultSummary(totalCount) {
    document.getElementById('resultSummary').textContent = `Found ${totalCount} results`;
}

function displayPagination(totalCount) {
    const totalPages = Math.ceil(totalCount / resultsPerPage);
    document.getElementById('pageInfo').textContent = `Page ${currentPage} of ${totalPages}`;
    document.getElementById('prevButton').disabled = currentPage === 1;
    document.getElementById('nextButton').disabled = currentPage === totalPages;
}

document.getElementById('searchButton').addEventListener('click', fetchResults);
document.getElementById('prevButton').addEventListener('click', () => { currentPage--; fetchResults(); });
document.getElementById('nextButton').addEventListener('click', () => { currentPage++; fetchResults(); });

window.onload = fetchResults;
