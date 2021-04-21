let interval = null;
let lastPrice = 0;

chrome.runtime.onInstalled.addListener(() => {
    if(interval === null){
        interval = setInterval(function() { fetchAndUpdatePriceETH() }, 20000);
        fetchAndUpdatePriceETH();
    }
});

chrome.runtime.onStartup.addListener(function() {
    chrome.browserAction.setBadgeText({text: ""});
    if(interval === null){
        interval = setInterval(function() { fetchAndUpdatePriceETH() }, 20000);
        fetchAndUpdatePriceETH();
    }
})

chrome.browserAction.onClicked.addListener(function() {
    if(interval === null){
        interval = setInterval(function() { fetchAndUpdatePriceETH() }, 20000);
        fetchAndUpdatePriceETH();
    }else{
        clearInterval(interval);
        interval = setInterval(function() { fetchAndUpdatePriceETH() }, 20000);
        fetchAndUpdatePriceETH();
    }
});

function fetchAndUpdatePriceETH() {
    fetch(`https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&cachebust=${new Date().getTime()}`).then(data => data.json()).then(data => {
        let newPrice = Math.floor(data.bitcoin.usd);
        if(lastPrice !== 0) {
            if(newPrice > lastPrice) {
                chrome.browserAction.setBadgeBackgroundColor({ "color": [0, 128, 0, 1] });
            }else if(newPrice < lastPrice){
                chrome.browserAction.setBadgeBackgroundColor({ "color": [255, 0, 0, 1] });
            }
        }
        lastPrice = newPrice;
        let displayPrice = newPrice.toString()
        if(newPrice > 10000) {
            displayPrice = (newPrice / 1000).toFixed(1) + 'K'
        }
        chrome.browserAction.setBadgeText({text: displayPrice});
        setTimeout(() => {
            chrome.browserAction.setBadgeBackgroundColor({ "color": [39, 120, 237, 1] });
        }, 1000)
    })
}