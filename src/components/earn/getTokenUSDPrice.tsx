


const CoinGecko = require('coingecko-api');

export const getTokenPriceUSD = async () => {
    //get coin data from CoinGecko
    const CoinGeckoClient = new CoinGecko();
   
    let mtrUSDprice = await CoinGeckoClient.coins.fetchTickers('meter-stable');
    let mtrgUSDprice = await CoinGeckoClient.coins.fetchTickers('meter-governance-mapped-by-meter-io');
 
    return {MTRUSDPrice:mtrUSDprice.data.tickers[0].converted_last.usd, mtrgUSDprice:mtrgUSDprice.data.tickers[0].converted_last.usd}
}

 