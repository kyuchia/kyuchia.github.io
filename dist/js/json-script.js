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
        return text.replace(urlRegex, function (fullMatch) {
            const match = fullMatch.match(/^(https?:\/\/[^\s]*?)([.,!?;:)"'\]]*)?$/);
            if (match) {
                const url = match[1];
                const trailing = match[2] || '';
                return `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>${trailing}`;
            }
            return fullMatch;
        });
    }


    // Function to display JSON content in the HTML
    function displayContent(data) {
        let container = document.getElementById('json-content');
        let html = '';
        let keys = Object.keys(data);

        for (let key of keys) {
            if (data.hasOwnProperty(key)) {
                html += `<h2 id="${key}">${key}</h2><hr /><ul>`;
                for (let entry of data[key]) {
                    // Make links clickable
                    let entryWithLinks = makeLinksClickable(entry);

                    // Bold name variations
                    entryWithLinks = entryWithLinks.replace(/Kuo,?\s*Yu[-\s]?Chia|Yu[-\s]?Chia\s*Kuo/g, '<strong>Yu-Chia Kuo</strong>')

                    html += `<li><p>${entryWithLinks}</p></li>`;
                }
                html += `</ul><p><br /></p>`;
            }
        }

        container.innerHTML = html;
    }

    // Load JSON content on page load
    setTimeout(loadJSON, 50);
});
