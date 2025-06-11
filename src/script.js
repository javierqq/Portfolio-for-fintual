



async function main() {
  var newStock = new Stock("META", 684.62);

  var anotherStock = new Stock("AAPL", 200.63);

  var yetAnotherStock = new Stock("AMZN", 207.91);

  var newClient = new Client("John", "Doe", 1, 1000);


  const portfolio = new Portfolio(newClient);
  portfolio.addStock(newStock, 0.6);
  portfolio.addStock(anotherStock, 0.3);
  portfolio.addStock(yetAnotherStock, 0.1);

  // Update header text
  document.querySelector('#header').innerHTML = JSON.stringify([
    [newClient.firstName, newClient.lastName, newClient.clientId, newClient.balance],
    portfolio.allocatedStocks
  ]);
  
 async function displayResults() {
    //await portfolio.currentBalance();
    const recomendation = await portfolio.rebalance();
    portfolio.applyRebalance(recomendation);

    document.querySelector('#header2').innerHTML = JSON.stringify([
        recomendation,
        [newClient.firstName, newClient.lastName, newClient.clientId, newClient.balance],
        portfolio.allocatedStocks

    ], null, 2);
}

displayResults();


}

main();

