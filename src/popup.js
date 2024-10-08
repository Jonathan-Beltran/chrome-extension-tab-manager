
async function queryTabs(){
    const tabs = await chrome.tabs.query({});

    const tabsList = document.querySelector('#tabsList')
    for (const tab of tabs) {
        const template = document.querySelector('#li_template').content.cloneNode(true);
        const title = tab.title || 'New Tab';
        let url = tab.url;
        if(!url || url === 'chrome://newtab/') {
            url = 'New Tab or  has no URL';
        }

        //fill template with tabs details
        template.querySelector('.title').textContent = title;
        template.querySelector('.pathname').textContent = url;

        if(tab.url && tab.url !== 'chrome://newtab/') {
            template.querySelector('a').href= tab.url;
        } else{
            const linkElement = template.querySelector('a');
            linkElement.removeAttribute('href');
            linkElement.style.pointerEvents = 'none';
            linkElement.style.color = 'grey';
        }
        tabsList.appendChild(template);
    }
}

async function clearTabs(){
    const tabs = await chrome.tabs.query({});

    chrome.storage.local.get(['urls'], function(result) {
        for (const tab of tabs){
            for (const url of result.urls){
                if (tab.url.includes(url)){
                    console.log("EXAMPLE TABID: " + tab.id)
                    chrome.tabs.remove(tab.id)
                }
            }

        }
    })

    chrome.storage.local.get(['tabTimesLocal', 'minutesThreshold'], function(result){
        console.log("minutesThreshold  " + result.minutesThreshold);
        for (let tabID in result.tabTimesLocal){
            console.log(result.tabTimesLocal[tabID] > result.minutesThreshold)
            if (result.minutesThreshold * 1 !== -1 && result.tabTimesLocal[tabID] > result.minutesThreshold * 60){
                console.log("remove " + tabID);
                chrome.tabs.remove(tabID * 1, function() {
                    console.log("Removed: " + tabID);
                });


            }
        }
    });
}

document.addEventListener('DOMContentLoaded', function(){
    queryTabs();
    document.getElementById('clear-tabs-button').addEventListener('click', function(){
        clearTabs();
    });
});

document.getElementById('goToOptions').addEventListener('click', function(){
    window.location.href='options.html';
});
