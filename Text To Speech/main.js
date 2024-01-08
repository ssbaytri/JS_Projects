let speech = new SpeechSynthesisUtterance;
let listenBtn = document.querySelector("button");
let textArea = document.querySelector("textarea");
let voices = [];
let voiceSelect = document.querySelector("select");

window.speechSynthesis.onvoiceschanged = () =>{
    voices = window.speechSynthesis.getVoices();
    speech.voice = voices[0];

    voices.forEach((voice, index) => {
        voiceSelect.options[index] = new Option(voice.name, index);
    })
}

voiceSelect.addEventListener("change", () => {
    speech.voice = voices[voiceSelect.value];
})

listenBtn.addEventListener("click", () => {
    speech.text = textArea.value;
    window.speechSynthesis.speak(speech);
})