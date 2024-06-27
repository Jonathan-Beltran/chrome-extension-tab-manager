
let tabTimes = {};
let inactivityThreshold = -1;

function fillTabs(){
    chrome.tabs.query({}, function(tabs) {
        chrome.storage.sync.get('tabTimesSync', function(result) {
            tabTimes = result.tabTimesSync || {};
            for (const tab of tabs) {
                if (!tabTimes[tab.id]) {
                    tabTimes[tab.id] = 0; // Initialize each tab's inactivity time to 0 if not already set
                }
            }
            chrome.storage.sync.set({ tabTimesSync: tabTimes });
        });
    });
}
/*chrome.tabs.onCreated(function(tab){
    tabTimes[tab.id] = 0;
});*/

/*
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (changeInfo.status === 'complete') {
        // Tab has finished loading
        tabTimes[tabId] = 0;
        chrome.storage.sync.set({ tabTimesSync: tabTimes });
    }
});
*/

/*chrome.tabs.onRemoved(function(tab){
    delete tabTimes[tab.id];
});*/
chrome.tabs.onRemoved.addListener(function(tabId, removeInfo) {
    delete tabTimes[tabId];
    chrome.storage.sync.set({ tabTimesSync: tabTimes });
});

/*
let currentTab;
chrome.action.onClicked.addListener((tab) => {

    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        if (tabs.length !== 0){
            currentTab = tabs[0];
            console.log("Current Tab ID: ", currentTab.id);
        }
    });

});
*/

function updateTabs(){
    console.log("Update")
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        console.log("updating current")
        //const activeTabId = activeTab.id;
        if (tabs.length !== 0){
            const currentTab = tabs[0];
            console.log("current tab id" + currentTab.id);
            tabTimes[currentTab.id] = 0;

        } else {
            console.log("no current tab");
        }
        // TODO: HERES THE PROBLEM!
        console.log("updating rest..")
        for (const tabID in tabTimes){
            if (tabs.length === 0){
                tabTimes[tabID] = tabTimes[tabID] + 10;
            } else if (parseInt(tabID) !== tabs[0].id * 1) {
                tabTimes[tabID] = tabTimes[tabID] + 10;
            }
        }
        chrome.storage.sync.set({ tabTimesSync: tabTimes });
    });
}

/*
function updateActiveTab(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        const currentTab = tabs[0];
        if (currentTab && currentTab.id !== undefined){
            tabTimes[currentTab.id] = 0;
            chrome.storage.sync.set({tabTimesSync: tabTimes});
        }
    })
}
*/

setInterval(() => {
    console.log("Hello");
    chrome.storage.sync.get('tabTimesSync',function(result) {
        console.log(result.tabTimesSync);
    });
    updateTabs();
}, 10000);



fillTabs();

// MAY22 TODO: fix inactivity times not resetting when tab is focused on. kinda done? made a new
//  function but i dont think it works
// setinterval time kinda sucks ass so you might need to do currentTime - startTime
// also look into chrome alarms it says its good for long duration

//TODO: make the ai aspect
