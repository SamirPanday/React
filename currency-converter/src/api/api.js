export const getCurrencies = async () => {
    try {
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');

        const data = await response.json();
        
        // console.log('Fetching Currencies');
        // console.log(data);


        const currency = Object.keys(data.rates);
        return currency;
    } 
    catch (error) {
     console.error('Error fetching currencies:', error);
     return [];
    }
}

export const convertCurrency = async (amount, fromCurrency, toCurrency) => {
    try {
        const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
        const data = await response.json();
        const rate = data.rates[toCurrency];
        const result = amount * rate;
        return result;
    }   
    catch (error) {
        console.error('Error converting currency:', error);
        return null;
    }
}