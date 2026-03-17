import { elements } from "./ui.js";
import { getAllowedProfessions } from "./professions.js";
import { socket } from "./socket.js";
import { showSearch } from "./ui.js";

export function initValidation() {

    elements.myProfessionInput.addEventListener("input", () => {
        elements.myProfessionInput.classList.remove("input-invalid");
        elements.professionError.style.display = "none";
    });

    elements.wantedProfessionInput.addEventListener("input", () => {
        elements.wantedProfessionInput.classList.remove("input-invalid");
        elements.wantedProfessionError.style.display = "none";
    });

    elements.findButton.addEventListener("click", () => {

        const allowed = getAllowedProfessions();

        const validMyProfession = validateProfession(
            elements.myProfessionInput,
            elements.professionError,
            allowed
        );

        const validWantedProfession = validateProfession(
            elements.wantedProfessionInput,
            elements.wantedProfessionError,
            allowed
        );

        if (!validMyProfession || !validWantedProfession) {
            return;
        }

        showSearch();

        socket.emit("join_queue", {
            profession: elements.myProfessionInput.value,
            level: document.getElementById("my-level").value,
            wantedProfession: elements.wantedProfessionInput.value,
            wantedLevel: document.getElementById("wanted-level").value
        });
    });

}

export function validateProfession(input, errorElement, allowed) {

    const value = input.value.trim();

    if (!value) {
        errorElement.textContent = "Укажите профессию";
        errorElement.style.display = "block";
        input.classList.add("input-invalid");
        return false;
    }

    if (!allowed.includes(value)) {
        errorElement.textContent = "Выберите профессию из списка";
        errorElement.style.display = "block";
        input.classList.add("input-invalid");
        return false;
    }

    return true;
}