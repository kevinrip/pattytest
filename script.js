
// Function to fetch data from the API endpoint
async function fetchData() {
    try {
        const response = await fetch('https://belly.pocket.rip/all');
        const data = await response.json();
        // Assuming there is a div with id "data" in your HTML to display the data
        const dataDiv = document.getElementById('data');
        dataDiv.innerHTML = ''; // Clear previous data
        
        // Loop through the data and create HTML elements to display it
        data.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.innerHTML = `
                <p>Name: ${item['Leave your name if you\'d like:']}</p>
                <p>Memories: ${item['Share any memories, messages, stories here:']}</p>
                <p>Word: ${item['What\'s one word, feeling, expression, etc'][' that reminds you of Patty?']}</p>
                <hr>
            `;
            dataDiv.appendChild(itemDiv);
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Call the fetchData function when the window is loaded
window.onload = fetchData;
