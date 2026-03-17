import { elements } from "./ui.js";

const mySuggestions = document.getElementById("my-profession-suggestions");
const wantedSuggestions = document.getElementById("wanted-profession-suggestions");

let allowedProfessions = [];

export async function initProfessions() {
    await loadProfessions();
    setupProfessionInputs();
}

async function loadProfessions() {
    const response = await fetch("http://localhost:3000/api/professions/all");
    allowedProfessions = await response.json();
}

function setupProfessionInputs() {
    const myInput = elements.myProfessionInput;
    const wantedInput = elements.wantedProfessionInput;

    myInput.addEventListener("input", handleInput);
    wantedInput.addEventListener("input", handleInput);
}

async function handleInput(e) {

    const query = e.target.value.trim();

    const suggestionsBox =
        e.target === elements.myProfessionInput
            ? mySuggestions
            : wantedSuggestions;

    if (!query) {
        suggestionsBox.innerHTML = "";
        return;
    }

    const results = await fetchProfessions(query);

    showSuggestions(results, suggestionsBox, e.target);
}

export async function fetchProfessions(query) {
    const response = await fetch(
        `http://localhost:3000/api/professions?search=${query}`
    );

    return await response.json();
}

export function getAllowedProfessions() {
    return allowedProfessions;
}

function showSuggestions(results, container, input) {

    container.innerHTML = "";

    results.forEach(prof => {

        const item = document.createElement("div");
        item.textContent = prof;

        item.addEventListener("click", () => {
            input.value = prof;
            container.innerHTML = "";
        });

        container.appendChild(item);
    });
}

document.addEventListener("click", (e) => {
    if (!elements.myProfessionInput.contains(e.target)) {
        mySuggestions.innerHTML = "";
    }

    if (!elements.wantedProfessionInput.contains(e.target)) {
        wantedSuggestions.innerHTML = "";
    }
});