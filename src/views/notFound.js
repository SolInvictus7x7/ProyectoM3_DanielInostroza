export function renderNotFound() {
  const app = document.querySelector("#app");
  app.innerHTML = `
    <section class="not-found-container">
        <h1>404</h1>
        <p>Ruta no encontrada.</p>
        <button id="back-btn" class="main-btn">Volver a la vista anterior</button>
        <p><a href="/" data-route="home">O regresar al inicio</a></p>
    </section>
  `;

  // Lógica para regresar a la vista anterior
  const backBtn = document.querySelector("#back-btn");
  backBtn.addEventListener("click", () => {
    window.history.back();
  });
}