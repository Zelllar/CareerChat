import { showChat } from "./ui.js";
import { addMessage, addSystemMessage } from "./chat.js";
import { showTyping, hideTyping } from "./chat.js";
import { clearChat } from "./chat.js";

const socket = io("http://localhost:3000");

let currentRoom = null;

export function initSocket() {

    socket.on("connect", () => {
        console.log("Connected:", socket.id);
    });

    socket.on("receive_message", (message) => {
        hideTyping();
        addMessage(message, "partner");
    });

    socket.on("partner_left", () => {
        addSystemMessage("Собеседник покинул чат");

        const input = document.getElementById("message-input");
        const sendBtn = document.getElementById("send-btn");
        const leaveBtn = document.getElementById("leave-chat");

        input.disabled = true;
        sendBtn.disabled = true;
        leaveBtn.disabled = true;
    });
    
    socket.on("match_found", (data) => {

        currentRoom = data.roomId;

        clearChat();

        showChat();

        const info = document.getElementById("chat-info");

        info.innerHTML = `
            <div class="chat-partner-title">Собеседник</div>
            <div class="chat-partner-info">
                ${data.partner.profession} ${data.partner.level || ""}
            </div>
        `;

        addSystemMessage("Вы подключены к собеседнику");

    });

    socket.on("partner_typing", () => {
        showTyping();
    });

    socket.on("partner_stop_typing", () => {
        hideTyping();
    });

}

export { socket };