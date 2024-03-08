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

function addURL(){
    const inputUrl = document.getElementById('closeURL').value;
    if (inputUrl ===''){
        alert("Empty");
        return;
    }
    const urlList=document.getElementById('optionsUrlList');
    const newUrl = document.createElement('li');
    newUrl.textContent = inputUrl;
    urlList.appendChild(newUrl);
    document.getElementById('closeURL').value='';
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('submitButton').addEventListener('click', function(){
        saveOptions();
        addURL();
    })
    document.getElementById("optionsSelect").addEventListener("change", showCustomMinutesField);
});
document.getElementById("backToPopup").addEventListener("click", function(){
    window.location.href='popup.html';
});

