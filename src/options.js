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
