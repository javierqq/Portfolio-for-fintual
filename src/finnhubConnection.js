/*using finnbhub to get the current sotck prices*/

const API_KEY = "d12sogpr01qv1k0n1o00d12sogpr01qv1k0n1o0g";

async function getQuote(symbol) {
  try {
    const response = await fetch(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${API_KEY}`);
    const data = await response.json();
    console.log('Data:', data);
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
}

async function updatePrice(symbol) {
  const quote = await getQuote(symbol);
  if (quote) {
    document.querySelector('#demo').innerHTML = quote.c;
  }
  return quote.c;
}

async function previousPrice(symbol) {
  const quote = await getQuote(symbol);
  if (quote) {
    document.querySelector('#header').innerHTML = quote.c;
  }
}