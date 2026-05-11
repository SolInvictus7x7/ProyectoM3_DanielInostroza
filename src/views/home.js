export function renderHome() {
  const app = document.querySelector("#app");
  app.innerHTML = `
    <header class="nav-bar">
        <nav>
            <a href="/about" data-route="about">About</a>
        </nav>
    </header>
    <section class="home-container">
        <h1>Bienvenido al pasado clásico.</h1>
        <p>Prepárate para hablar con el individuo más influyente del mundo antiguo.</p>
        <button class="main-btn" href="/chat" data-route="chat">Comenzar a chatear</button>
    </section>
  `;
}