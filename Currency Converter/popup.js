document.addEventListener('DOMContentLoaded', function () {
  const amountInput = document.getElementById('amount');
  const fromCurrencySelect = document.getElementById('from');
  const toCurrencySelect = document.getElementById('to');
  const convertButton = document.getElementById('convert');
  const resultText = document.getElementById('result');

  // Fetch and populate currency options from API
  fetchCurrencies();

  convertButton.addEventListener('click', () => {
    const amount = parseFloat(amountInput.value);
    const fromCurrency = fromCurrencySelect.value;
    const toCurrency = toCurrencySelect.value;

    // Fetch the latest exchange rates from API
    fetchLatestExchangeRates().then(exchangeRates => {
      // Perform the conversion
      const convertedAmount = (amount * exchangeRates[fromCurrency]) / exchangeRates[toCurrency];

      resultText.textContent = `${amount} ${fromCurrency.toUpperCase()} = ${convertedAmount.toFixed(2)} ${toCurrency.toUpperCase()}`;
    }).catch(error => {
      console.error('Error fetching exchange rates:', error);
    });
  });

  // Function to fetch and populate currency options
  function fetchCurrencies() {
    fetch('https://openexchangerates.org/api/currencies.json')
      .then(response => response.json())
      .then(data => {
        const currencySelects = [fromCurrencySelect, toCurrencySelect];

        // Populate currency options
        for (const currencyCode in data) {
          const option = document.createElement('option');
          option.value = currencyCode;
          option.textContent = `${currencyCode} - ${data[currencyCode]}`;
          currencySelects.forEach(select => select.appendChild(option.cloneNode(true)));
        }
      })
      .catch(error => {
        console.error('Error fetching currencies:', error);
      });
  }

  async function fetchLatestExchangeRates() {
    const apiKey = 'b058bc074aa4454098f5b7ad293d1cd7'; // Use your actual API key
    const apiUrl = `https://openexchangerates.org/api/latest.json?app_id=${apiKey}`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      return data.rates;
    } catch (error) {
      throw error;
    }
  }
});

  
  // const apiKey = 'b058bc074aa4454098f5b7ad293d1cd7'; // Use your actual API key