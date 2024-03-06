function showCustomMinutesField(){
    var dropdown = document.getElementById(optionsSelect);
    var textInput = document.getElementById(minutesInput);

    if (optionsSelect === "Other"){
        minutesInput.style.display = "block";
    } else{
        textInput.style.display = "none";
    }
}
