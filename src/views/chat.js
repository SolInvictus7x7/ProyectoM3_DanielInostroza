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
            <p class="ai-msg">Esto es un placeholder.</p>
        </div>
        <div class="input-area">
            <input type="text" placeholder="Escribe un mensaje...">
            <button>Enviar</button>
        </div>
    </section>
  `;
}