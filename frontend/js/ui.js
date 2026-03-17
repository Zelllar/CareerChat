export const elements = {
    setupScreen: document.getElementById("setup-screen"),
    searchScreen: document.getElementById("search-screen"),
    chatScreen: document.getElementById("chat-screen"),

    myProfessionInput: document.getElementById("my-profession"),
    wantedProfessionInput: document.getElementById("wanted-profession"),

    professionError: document.getElementById("profession-error"),
    wantedProfessionError: document.getElementById("wanted-profession-error"),

    messages: document.getElementById("messages"),
    findButton: document.getElementById("find-btn")
};

export function initUI() {
    showSetup();
}

export function showSetup() {
    elements.setupScreen.style.display = "block";
    elements.searchScreen.style.display = "none";
    elements.chatScreen.style.display = "none";
}

export function showSearch() {
    elements.setupScreen.style.display = "none";
    elements.searchScreen.style.display = "block";
    elements.chatScreen.style.display = "none";
}

export function showChat() {
    elements.setupScreen.style.display = "none";
    elements.searchScreen.style.display = "none";
    elements.chatScreen.style.display = "block";
}