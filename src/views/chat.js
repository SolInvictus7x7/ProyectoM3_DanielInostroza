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
        <div id="chat-window"></div>
        <div class="input-area">
            <input type="text" id="user-input" placeholder="Escribe un mensaje...">
            <button id="send-btn">Enviar</button>
        </div>
    </section>
  `;

    const chatWindow = document.querySelector("#chat-window");
    messages.forEach(msg => {
        appendMessageToDOM(msg.sender, msg.text);
    });

    initChatLogic();
}

function initChatLogic() {
    const sendBtn = document.querySelector("#send-btn");
    const userInput = document.querySelector("#user-input");

    const handleSend = async () => {
        const text = userInput.value.trim();
        
        if (text !== "" && !sendBtn.disabled) {
            setChatLock(true);
            
            const userMsg = { sender: "user", text };
            messages.push(userMsg);
            appendMessageToDOM("user", text);
            userInput.value = "";
            showTypingIndicator();

            const limitedMessages = messages.slice(-8);

            const payload = {
                model: "gemini-2.5-flash",
                system: "Eres Alejandro Magno, Rey de Macedonia. Responde con nobleza y autoridad. Usa metáforas militares o filosóficas.",
                max_tokens: 80,
                messages: limitedMessages 
            };

            try {
                const response = await fetch('/api/chat', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                if (!response.ok) throw new Error('Network response was not ok');

                const data = await response.json();

                const usage = data.usage || {};
                console.log(`[Tokens] input: ${usage.input_tokens}, output: ${usage.output_tokens}`);

                const aiResponse = data.reply;
                hideTypingIndicator();
                
                messages.push({ sender: "ai", text: aiResponse });
                appendMessageToDOM("ai", aiResponse);

            } catch (error) {
                hideTypingIndicator();
                appendMessageToDOM("ai", "Mis mensajeros han sido interceptados. Prueba de nuevo.");
                console.error("Chat Error:", error);
            } finally {
                setChatLock(false);
            }
        }
    };

    sendBtn.addEventListener("click", handleSend);
    userInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") handleSend();
    });
}

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

function setChatLock(isLocked) {
    const sendBtn = document.querySelector("#send-btn");
    const userInput = document.querySelector("#user-input");
    if (sendBtn) sendBtn.disabled = isLocked;
    if (userInput) userInput.disabled = isLocked;
    if (!isLocked && userInput) userInput.focus();
}

function hideTypingIndicator() {
    const indicator = document.querySelector("#typing-indicator");
    if (indicator) indicator.remove();
}