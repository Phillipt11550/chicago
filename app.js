const apiEndpoint = 'https://api.coinlayer.com';
const apiKey = 'f4ef5432359bb35304f2964b5625f31f'; // Replace with your actual CoinLayer API key

const currencySelector = document.getElementById('currency-selector');
const priceDisplay = document.getElementById('price-display');
const chartCanvas = document.getElementById('price-chart');

// Function to fetch cryptocurrency prices from the CoinLayer API
async function fetchCryptoPrices() {
    try {
        const response = await fetch(`${apiEndpoint}/live?access_key=${apiKey}`);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        // Handle the extracted data
        handleCryptoPrices(data);
    } catch (error) {
        console.error('Error fetching cryptocurrency prices:', error.message);
    }
}


// Function to handle the extracted cryptocurrency prices
function handleCryptoPrices(data) {
    // Extract relevant information from the API response
    const bitcoinPrice = data.rates.BTC;
    const ethereumPrice = data.rates.ETH;

    // Update the website with the latest prices
    updatePriceDisplay(bitcoinPrice, ethereumPrice);

    // Update the historical price chart
    updatePriceChart(data);
}

// Function to update the website with the latest prices
function updatePriceDisplay(bitcoinPrice, ethereumPrice) {
    // Display prices on the website
    priceDisplay.innerHTML = `
        <p>Bitcoin Price: ${bitcoinPrice} USD</p>
        <p>Ethereum Price: ${ethereumPrice} USD</p>
    `;

    // Add color-coding based on price changes
    applyColorCoding(bitcoinPrice, ethereumPrice);
}

// Function to apply color-coding based on price changes
function applyColorCoding(bitcoinPrice, ethereumPrice) {
    // Add your logic to determine color-coding based on price changes
    // For example, change the text color or background color
    // Green for price increase, red for price decrease, and default color for no change
    // You can customize this based on your design preferences
}

// Function to update the historical price chart
function updatePriceChart(data) {
    // Use a chart library like Chart.js to create a simple historical price chart
    // The following is a basic example using Chart.js
    const dates = Object.keys(data.timestamps);
    const prices = Object.values(data.timestamps);

    const ctx = chartCanvas.getContext('2d');

    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [{
                label: 'Bitcoin Price',
                data: prices,
                borderColor: 'blue',
                fill: false,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    type: 'linear',
                    position: 'bottom'
                }
            }
        }
    });
}

// Event listener for currency selector changes
currencySelector.addEventListener('change', fetchCryptoPrices);

// Call the fetchCryptoPrices function when the page loads
document.addEventListener('DOMContentLoaded', fetchCryptoPrices);


// Function to open the modal with a greeting
function openModal(title, text) {
    const modal = document.getElementById('myModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalText = document.getElementById('modalText');

    modalTitle.textContent = title;
    modalText.textContent = text;

    modal.style.display = 'block';
}

// Function to close the modal
function closeModal() {
    const modal = document.getElementById('myModal');
    modal.style.display = 'none';
}

// Close the modal if the user clicks outside of it
window.onclick = function (event) {
    const modal = document.getElementById('myModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
};
