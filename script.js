let currentIndex = 0; // Current index of the displayed item

// Function to fetch data from the API endpoint
async function fetchData() {
    try {
        const response = await fetch('https://belly.pocket.rip/all');
        const data = await response.json();
        // Assuming there is a div with id "data" in your HTML to display the data
        const dataDiv = document.getElementById('data');
        dataDiv.innerHTML = ''; // Clear previous data
        
        // Create HTML elements to display the current item
        const currentItem = data[currentIndex];
        const itemDiv = document.createElement('div');
        itemDiv.innerHTML = `
            <p>Name: ${currentItem['Leave your name if you\'d like:']}</p>
            <p>Memories: ${currentItem['Share any memories, messages, stories here:']}</p>
            <p>Word: ${currentItem['What\'s one word, feeling, expression, etc'][' that reminds you of Patty?']}</p>
            <hr>
        `;
        dataDiv.appendChild(itemDiv);

        // Create navigation buttons
        const prevButton = document.createElement('button');
        prevButton.textContent = 'Previous';
        prevButton.addEventListener('click', showPreviousItem);
        dataDiv.appendChild(prevButton);

        const nextButton = document.createElement('button');
        nextButton.textContent = 'Next';
        nextButton.addEventListener('click', showNextItem);
        dataDiv.appendChild(nextButton);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Function to show the previous item
function showPreviousItem() {
    currentIndex = (currentIndex - 1 + data.length) % data.length;
    fetchData();
}

// Function to show the next item
function showNextItem() {
    currentIndex = (currentIndex + 1) % data.length;
    fetchData();
}

// Call the fetchData function when the window is loaded
window.onload = fetchData;
