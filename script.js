// File: script.js

let currentIndex = 0; // Current index of the displayed item

// Function to fetch data from the API endpoint
async function fetchData() {
    try {
        const response = await fetch('https://belly.pocket.rip/all');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        
        if (!Array.isArray(data) || data.length === 0) {
            console.error('Invalid or empty response data');
            return;
        }

        // Get the current item
        const currentItem = data[currentIndex];
        const name = currentItem['Leave your name if you\'d like:'] || 'N/A';
        const memory = currentItem['Share any memories, messages, stories here:'] || 'N/A';
        const word = currentItem['What\'s one word, feeling, expression, etc'][' that reminds you of Patty?'] || 'N/A';

        // Assuming there is a div with id "data" in your HTML to display the data
        const dataDiv = document.getElementById('data');
        dataDiv.innerHTML = ''; // Clear previous data
        
        // Create HTML elements to display the current item
        const itemDiv = document.createElement('div');
        itemDiv.innerHTML = `
            <p>Name: ${name}</p>
            <p>Memories: ${memory}</p>
            <p>Word: ${word}</p>
            <hr>
        `;
        dataDiv.appendChild(itemDiv);

        // Create navigation button
        const nextButton = document.createElement('button');
        nextButton.textContent = 'Next';
        nextButton.addEventListener('click', showNextItem);
        dataDiv.appendChild(nextButton);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Function to show the next item
function showNextItem() {
    currentIndex = (currentIndex + 1) % data.length;
    fetchData();
}

// Call the fetchData function when the window is loaded
window.onload = fetchData;
