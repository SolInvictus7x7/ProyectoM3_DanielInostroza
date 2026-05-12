// 1. Persistence Logic: This array lives as long as the app is not refreshed.
let messages = [
    { sender: "ai", text: "Saludos, viajero del tiempo. ¿Qué noticias traes de las tierras lejanas?" }
];

export function renderChat() {
    const app = document.querySelector("#app");
    app.innerHTML = `
    <header class="nav-bar">
        <nav>
            <a href="/" data-route="home">Home</a>
            <a href="/about" data-route="about">About</a>
        </nav>
    </header>
    <section class="chat-container">
        <div id="chat-window">
            </div>
        <div class="input-area">
            <input type="text" id="user-input" placeholder="Escribe un mensaje...">
            <button id="send-btn">Enviar</button>
        </div>
    </section>
  `;

    // 2. Load History: Immediately render whatever is in the messages array
    const chatWindow = document.querySelector("#app #chat-window");
    messages.forEach(msg => {
        appendMessageToDOM(msg.sender, msg.text);
    });

    initChatLogic();
}

function initChatLogic() {
    const sendBtn = document.querySelector("#send-btn");
    const userInput = document.querySelector("#user-input");

    const handleSend = () => {
        const text = userInput.value.trim();
        // Modification: Check if the button is disabled to prevent "Enter" spam
        if (text !== "" && !sendBtn.disabled) {
            // 1. Lock the UI immediately
            setChatLock(true);

            messages.push({ sender: "user", text });
            appendMessageToDOM("user", text);
            userInput.value = "";

            showTypingIndicator();

            setTimeout(() => {
                hideTypingIndicator();
                const aiResponse = "Por las crines de Bucéfalo, lo que dices es intrigante. Debo meditar sobre esto.";
                
                messages.push({ sender: "ai", text: aiResponse });
                appendMessageToDOM("ai", aiResponse);

                // 2. Unlock the UI after the AI replies
                setChatLock(false);
            }, 2000);
        }
    };

    sendBtn.addEventListener("click", handleSend);
    userInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") handleSend();
    });
}

// Helper to render HTML without saving to state
function appendMessageToDOM(sender, text) {
    const chatWindow = document.querySelector("#chat-window");
    if (!chatWindow) return;

    const msgDiv = document.createElement("div");
    msgDiv.classList.add("msg-container", sender === "ai" ? "msg-ai" : "msg-user");

    if (sender === "ai") {
        msgDiv.innerHTML = `
            <span class="ai-name">Alejandro Magno</span>
            <p class="bubble">${text}</p>
        `;
    } else {
        msgDiv.innerHTML = `<p class="bubble">${text}</p>`;
    }

    chatWindow.appendChild(msgDiv);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

function showTypingIndicator() {
    const chatWindow = document.querySelector("#chat-window");
    const typingDiv = document.createElement("div");
    typingDiv.id = "typing-indicator";
    typingDiv.classList.add("msg-container", "msg-ai");
    typingDiv.innerHTML = `
        <span class="ai-name">Alejandro Magno está escribiendo...</span>
        <div class="typing bubble">
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
        </div>
    `;
    chatWindow.appendChild(typingDiv);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

// New Helper Function
function setChatLock(isLocked) {
    const sendBtn = document.querySelector("#send-btn");
    const userInput = document.querySelector("#user-input");

    sendBtn.disabled = isLocked;
    userInput.disabled = isLocked;

    // Optional: Keep focus on the input after unlocking for better UX
    if (!isLocked) {
        userInput.focus();
    }
}

function hideTypingIndicator() {
    const indicator = document.querySelector("#typing-indicator");
    if (indicator) indicator.remove();
}