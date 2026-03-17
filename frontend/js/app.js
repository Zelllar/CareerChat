import { initUI } from "./ui.js";
import { initChat } from "./chat.js";
import { initProfessions } from "./professions.js";
import { initValidation } from "./validation.js";
import { initSocket } from "./socket.js";

function initApp() {
    console.log("CareerChat started");

    initUI();
    initSocket();
    initChat();
    initProfessions();
    initValidation();
}

initApp();