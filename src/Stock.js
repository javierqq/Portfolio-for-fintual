
class Stock{
  constructor(name, price) {
    this.stockName = name;
    this.stockPrice = price;
    this.previousStockPrice = 0; // initialized as 0 for the sake of this exercise
  }

  async currentPrice() {
    try {
      const quote = await getQuote(this.stockName);
      if (quote) {
        this.previousStockPrice = this.stockPrice; 
        this.stockPrice = quote.c; 
        return this.stockPrice;
      } else {
        console.error('No quote data received');
        return null;
      }
    } catch (error) {
      console.error('Failed to update price:', error);
      return null;
    }
  }


}

