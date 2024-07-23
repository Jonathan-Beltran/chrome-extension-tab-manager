
function showCustomMinutesField(){
    const dropdown = document.getElementById("optionsSelect");
    const textInput = document.getElementById("minutesInput");
    if (dropdown.value === "Other"){
        textInput.style.display = "block";
        textInput.focus();
    } else{
        textInput.style.display = "none";
    }
}
// you may want to add validation to the input field
let messageVisible = false;


function saveOptions(){
    if (messageVisible){
        return;
    }
    let minutesThreshold = document.getElementById("optionsSelect").value;
    if (minutesThreshold === "Other"){
        minutesThreshold = document.getElementById("minutesInput").value;
    }

    if (minutesThreshold >= -1) {
        inactivityThreshold = minutesThreshold;
        chrome.storage.sync.set({
                minutesThreshold: minutesThreshold
            },
            function () {
                messageVisible = true;
                const saveStatus = document.createElement('div');
                saveStatus.textContent = 'Options Saved!';
                saveStatus.className = 'saveStatus';
                document.body.appendChild(saveStatus);
                setTimeout(function () {
                    document.body.removeChild(saveStatus);
                    messageVisible = false;
                }, 1000);
            });
    }



}
let urls = [];
function addURL(){
    const inputUrl = document.getElementById('closeURL').value;
    if (inputUrl ===''){
        return;
    }
    const urlList=document.getElementById('optionsUrlList');
    const newUrl = document.createElement('li');
    urls.push(inputUrl);
    newUrl.textContent = inputUrl;
    urlList.appendChild(newUrl);
    document.getElementById('closeURL').value='';
    chrome.storage.sync.set({
        urls:urls
    });
}

document.addEventListener('DOMContentLoaded', function() {
    chrome.storage.sync.get(['urls'], function(result){
        if (result.urls){
            urls = result.urls;
            let listDisplay = document.getElementById('optionsUrlList');
            urls.forEach(function(url){
                let thisUrl = document.createElement('li');
                thisUrl.textContent = url;
                listDisplay.appendChild(thisUrl);
            })
        }
    })

    document.getElementById('submitButton').addEventListener('click', function(){
        saveOptions();
        addURL();
    })
    document.getElementById("optionsSelect").addEventListener("change", showCustomMinutesField);
    document.getElementById('clearUrlsButton').addEventListener('click', function(){
        chrome.storage.sync.remove('urls', function() {
            urls = [];
            document.getElementById('optionsUrlList').innerHTML = '';

        });
    })
});
document.getElementById("backToPopup").addEventListener("click", function(){
    window.location.href='popup.html';
});



//TODO: i think the minutesThreshold is tweaking
