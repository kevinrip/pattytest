// Function to fetch data from the API endpoint
async function fetchData() {
    try {
        const response = await fetch('https://belly.pocket.rip/all');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        
        if (!Array.isArray(data) || data.length === 0 || currentIndex >= data.length) {
            console.error('Invalid or empty response data');
            return;
        }

        // Assuming there is a div with id "data" in your HTML to display the data
        const dataDiv = document.getElementById('data');
        dataDiv.innerHTML = ''; // Clear previous data
        
        // Create HTML elements to display the current item
        const currentItem = data[currentIndex];
        const itemDiv = document.createElement('div');
        itemDiv.innerHTML = `
            <p>Name: ${currentItem['Leave your name if you\'d like:'] || 'N/A'}</p>
            <p>Memories: ${currentItem['Share any memories, messages, stories here:'] || 'N/A'}</p>
            <p>Word: ${currentItem['What\'s one word, feeling, expression, etc'][' that reminds you of Patty?'] || 'N/A'}</p>
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
