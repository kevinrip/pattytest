let currentIndex = 0;
let documents = [];

async function fetchData() {
    try {
        const response = await fetch('https://belly.pocket.rip/all');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        documents = await response.json();

        if (!Array.isArray(documents) || documents.length === 0) {
            console.error('Invalid or empty response data');
        }

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function displayCurrentDocument() {
    const currentDocument = documents[currentIndex];
    if (currentDocument) {
        const name = currentDocument['Leave your name if you\'d like:'] || 'N/A';
        const memory = currentDocument['Share any memories, messages, stories here:'] || 'N/A';
        const word = currentDocument['What\'s one word, feeling, expression, etc'][' that reminds you of Patty?'] || 'N/A';

        const dataDiv = document.getElementById('data');
        dataDiv.innerHTML = `
            <p>Name: ${name}</p>
            <p>Memories: ${memory}</p>
            <p>Word: ${word}</p>
            <hr>
        `;
    } else {
        console.error('Current document not found');
    }
}

function showNextItem() {
    currentIndex = (currentIndex + 1) % documents.length;
    displayCurrentDocument();
}

function showPreviousItem() {
    currentIndex = (currentIndex - 1 + documents.length) % documents.length;
    displayCurrentDocument();
}

const nextButton = document.getElementById('nextButton');
const prevButton = document.getElementById('prevButton');

nextButton.addEventListener('click', showNextItem);
prevButton.addEventListener('click', showPreviousItem);

// Initial data fetch
fetchData().then(() => {
    displayCurrentDocument();
});
