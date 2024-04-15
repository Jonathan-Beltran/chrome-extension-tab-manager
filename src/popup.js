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

    chrome.storage.sync.get(['urls'], function(result) {
        for (const tab of tabs){
            for (const url of result.urls){
                if (tab.url.includes(url)){
                    chrome.tabs.remove(tab.id)
                }
            }

        }
    })
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
