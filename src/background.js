
let tabTimes = {};
let inactivityThreshold = -1;

function fillTabs(){
    chrome.tabs.query({}, function(tabs) {
        tabs.sort((tab1,tab2) => tab1.id - tab2.id)
        chrome.storage.local.get('tabTimesLocal', function(result) {
            tabTimes = result.tabTimesLocal || {};
            for (const tab of tabs) {
                if (!tabTimes[tab.id]) {
                    tabTimes[tab.id] = 0; // Initialize each tab's inactivity time to 0 if not already set
                }
            }

            // TODO: maybe this can be further improved using a set 
            if (tabTimes){
                for (const id of Object.keys(tabTimes)){
                    let low = 0
                    let high = tabs.length - 1
                    let mid = low + Math.floor((high - low) / 2)
                    let found = false
                    while (low <= high) {
                        if (id * 1 === tabs[mid].id * 1){
                            found = true;
                            break;
                        }
                        else if (id * 1 < tabs[mid].id * 1){
                            high = mid - 1;
                        } else if (id * 1 > tabs[mid].id * 1){
                            low = mid + 1;
                        }
                        mid = low + Math.floor((high - low) / 2)
                    }

                    if (!found){
                        delete tabTimes[id];
                    }
                }
            }
            chrome.storage.local.set({ tabTimesLocal: tabTimes });
        });
    });
}
chrome.tabs.onRemoved.addListener(function(tabId, removeInfo) {
    delete tabTimes[tabId];
    chrome.storage.local.set({ tabTimesLocal: tabTimes });
});

chrome.tabs.onCreated.addListener(function(tab){
    tabTimes[tab.id] = 0;
    chrome.storage.local.set({ tabTimesLocal: tabTimes });
});


function updateTabs(){
    console.log("Update")
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        console.log("updating current")
        //const activeTabId = activeTab.id;
        if (tabs.length !== 0){
            const currentTab = tabs[0];
            console.log("current tab id" + currentTab.id);
            console.log("setting current back to 0")
            tabTimes[currentTab.id] = 0;

        } else {
            console.log("no current tab");
        }
        for (const tabID in tabTimes){
            if (tabs.length === 0){
                console.log("add 10 to all times")
                tabTimes[tabID] = tabTimes[tabID] + 10;
            } else if (parseInt(tabID) !== tabs[0].id * 1) {
                console.log("add 10 to all times except open. open is 0 instead")
                tabTimes[tabID] = tabTimes[tabID] + 10;
                tabTimes[tabs[0].id] = 0;
            }
        }


        chrome.storage.local.set({ tabTimesLocal: tabTimes });
        chrome.storage.local.get('tabTimesLocal',function(result) {
            console.log("what?")
            console.log(result.tabTimesLocal);
        });

    });
}


setInterval(() => {
    updateTabs();
}, 10000);
setInterval(() => {
    chrome.storage.local.get('tabTimesLocal',function(result) {
        console.log("Get tabTimesLocal every 1 second");
        console.log(result.tabTimesLocal);
    });
}, 1000);
console.log("fill tabs")
fillTabs();

//TODO: DOes not seem to work on the other professional google account.
// There seems to be two versions of tabTimesSync and one of them is missing tabs? The print on line 80 is the missing one
