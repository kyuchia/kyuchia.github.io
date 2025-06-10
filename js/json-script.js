document.addEventListener('DOMContentLoaded', function () {
    // Function to load and display JSON content
    function loadJSON() {
        let xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                let jsonData = JSON.parse(xhr.responseText);
                displayContent(jsonData);
            }
        };

        xhr.open('GET', 'content.json', true);
        xhr.send();
    }

    // Function to turn DOI/URL into clickable links
    function makeLinksClickable(text) {
        const urlRegex = /(https?:\/\/[^\s]+)/g;
        return text.replace(urlRegex, function (url) {
            return `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`;
        });
    }

    // Function to display JSON content in the HTML
    function displayContent(data) {
        let container = document.getElementById('content');
        let html = '';
        let years = Object.keys(data).reverse();

        for (let key of years) {
            if (data.hasOwnProperty(key)) {
                const year = key;
                html += `<h2 id="${year}">${year}</h2><hr /><ul>`;
                for (let entry of data[year]) {
                    const entryWithLinks = makeLinksClickable(entry);
                    html += `<li><p>${entryWithLinks}</p></li>`;
                }
                html += `</ul><p><br /></p>`;
            }
        }

        container.innerHTML = html;
    }

    // Load JSON content on page load
    loadJSON();
});
