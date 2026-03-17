import { elements } from "./ui.js";
import { socket } from "./socket.js";

export function initChat() {
    console.log("Chat initialized");

    const input = document.getElementById("message-input");
    const sendBtn = document.getElementById("send-btn");
    const leaveBtn = document.getElementById("leave-chat");

    function sendMessage() {

        if (input.disabled) return;

        const text = input.value.trim();

        if (!text) return;

        
        socket.emit("send_message", {
            text: text
        });

        addMessage(text, "me");

        input.value = "";

        socket.emit("stop_typing");
    }

    sendBtn.addEventListener("click", sendMessage);

    input.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            sendMessage();
        }
    });

    leaveBtn.addEventListener("click", () => {

        if (!confirm("Вы действительно хотите завершить разговор?")) {
            return;
        }

        if (leaveBtn.disabled) return;

        socket.emit("leave_chat");

        addSystemMessage("Вы покинули чат");

        input.disabled = true;
        sendBtn.disabled = true;
        leaveBtn.disabled = true;

    });

    let typingTimeout;

    input.addEventListener("input", () => {

        if (input.disabled) return;

        socket.emit("typing");

        clearTimeout(typingTimeout);

        typingTimeout = setTimeout(() => {
            socket.emit("stop_typing");
        }, 1000);

    });

    const nextBtn = document.getElementById("next-chat");

    nextBtn.addEventListener("click", () => {

        if (nextBtn.disabled) return;

        nextBtn.disabled = true;

        setTimeout(() => {
            nextBtn.disabled = false;
        }, 1500);

        socket.emit("leave_chat");

        clearChat();

        input.disabled = false;
        sendBtn.disabled = false;
        leaveBtn.disabled = false;

        addSystemMessage("Ищем нового собеседника...");

        socket.emit("join_queue", {
            profession: elements.myProfessionInput.value,
            level: document.getElementById("my-level").value,
            wantedProfession: elements.wantedProfessionInput.value,
            wantedLevel: document.getElementById("wanted-level").value
        });

    });
}

export function addMessage(text, type) {
    const message = document.createElement("div");

    message.classList.add("message");

    if (type === "me") {
        message.classList.add("my-message");
    } else {
        message.classList.add("partner-message");
    }

    message.textContent = text;
    elements.messages.appendChild(message);
    elements.messages.scrollTop = elements.messages.scrollHeight;
}

export function addSystemMessage(text) {
    const message = document.createElement("div");
    message.classList.add("system-message");
    message.textContent = text;
    elements.messages.appendChild(message);
}

    export function showTyping() {

        let indicator = document.getElementById("typing-indicator");

        if (!indicator) {
            indicator = document.createElement("div");
            indicator.id = "typing-indicator";
            indicator.textContent = "Собеседник печатает...";
        }

        indicator.style.display = "block";

        elements.messages.appendChild(indicator);

        elements.messages.scrollTop = elements.messages.scrollHeight;
    }
    
export function hideTyping() {
    const indicator = document.getElementById("typing-indicator");
    if (indicator) {
        indicator.style.display = "none";
    }
}

export function clearChat() {
    elements.messages.innerHTML = "";
}