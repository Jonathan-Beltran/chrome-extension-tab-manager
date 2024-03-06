 async function queryTabs(){
    const tabs = await chrome.tabs.query({
        url: [
            "*://*/*"
        ]
    });

     const tabsList = document.querySelector('#tabsList')
     for (const tab of tabs) {
         const template = document.querySelector('#li_template').content.cloneNode(true);

         //fill template with tabs details
         template.querySelector('.title').textContent = tab.title;
         template.querySelector('.pathname').textContent = tab.url;
         template.querySelector('a').href = tab.url;
         tabsList.appendChild(template);
     }
}
document.addEventListener('DOMContentLoaded', queryTabs);
