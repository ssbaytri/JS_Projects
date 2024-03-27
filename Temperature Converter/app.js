// start of project
const celsius = document.getElementById("celsius");
const fahrenheit = document.getElementById("fahrenheit");

// focus on input after load
window.addEventListener("load", () => celsius.focus());

// convert celsius to fahrenheit
celsius.addEventListener("input", () => {
    fahrenheit.value = ((celsius.value * 9) / 5 + 32).toFixed(2);
    if (!celsius.value) fahrenheit.value = "";
})

// convert fahrenheit to celsius
fahrenheit.addEventListener("input", () => {
    celsius.value = ((fahrenheit.value - 32) * 5 / 9).toFixed(2);
    if (!fahrenheit.value) celsius.value = "";
})