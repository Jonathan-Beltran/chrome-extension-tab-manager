const tabs = await chrome.tabs.query({
    url: [
        "*://*/*"
    ]
});

//const collator = new Intl.Collator();
for (const tab of tabs){
    const title = tab.title;

}
