function popup () {
    const popupContainer = document.createElement("div");
    popupContainer.innerHTML = `
    <div id="popup-container">
        <h1>New Note</h1>
        <textarea id="note-text" placeholder="Enter your Note...."></textarea>
    </div>
    `;
}