

class Portfolio {
  constructor(client) {
    this.client = client; //contains client object
    this.allocatedStocks = {}; //and dicctionary of allocated stock, initialized empty
  }

  //adds a Stock onject allong with the desired allocation the clients wants for that stock
  addStock(newStock, allocation) {
    this.allocatedStocks[newStock.stockName] = {
      stock: newStock,
      allocation: allocation
    };
  }

  listStocks() {
    return Object.keys(this.allocatedStocks);
  }

  //calculates the balance the client would have with the current stock prices
  async proyectedBalance(){
    let newBalance = 0;
    const stocksObj = this.allocatedStocks;
    
    for (let stockName in stocksObj) {
        const stockWrapper = stocksObj[stockName];
        const stock = stockWrapper.stock;
        const allocation = stockWrapper.allocation;
        const percentagePerStock = this.client.balance * allocation;
        const currentPrice = await stock.currentPrice();
        
        if (currentPrice !== null) {
            const contribution = (percentagePerStock * currentPrice) / stock.previousStockPrice;
            newBalance += contribution;
        } else {
            console.log(`Warning: currentPrice() returned null for ${stockName}`);
        }
    }

    
    //this.client.balance = newBalance;
    return newBalance;
  }

  
  async rebalance(){
    //this method only returns an Array with sugested movements for each stock, given de current stock price, balance and allocation of the client
    const proyectedBalance = await this.proyectedBalance();
    const sugestedMovementArray = [];
    const stocksObj = this.allocatedStocks;

    for (let stockName in stocksObj) {
      const stockWrapper = stocksObj[stockName];
      const stock = stockWrapper.stock;


      // calculates the number of actual stocks the client bought with the previous stock price, just representation, could be decimal
      const currentRatio = this.client.balance / stock.previousStockPrice;
      // calculates the number of actual stocks the client may buy with the current stock price and proyected balance, just representation, could be decimal
      const proyectedRatio = proyectedBalance / stock.stockPrice;

      
      if (currentRatio < proyectedRatio){
          sugestedMovementArray.push([stock.stockName, 'Sell', (proyectedBalance * stockWrapper.allocation) - (this.client.balance * stockWrapper.allocation)]);
      }
      else if (currentRatio > proyectedRatio){
        sugestedMovementArray.push([stock.stockName, 'Buy', (proyectedBalance * stockWrapper.allocation) - (this.client.balance * stockWrapper.allocation)]);
      }
      else {
        sugestedMovementArray.push([stock.stockName, 'Hold']);
      }
      


    }

    return sugestedMovementArray;
  }

  //applyRebalance kept as separate method in case client decides something else
  applyRebalance(recomendation){
    for (let i = 0; i < recomendation.length; i++) {
      this.client.balance += recomendation[i][2];
    }
  }

}
