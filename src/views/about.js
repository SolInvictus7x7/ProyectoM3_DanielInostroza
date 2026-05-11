export function renderAbout() {
  const app = document.querySelector("#app");
  app.innerHTML = `
    <header class="nav-bar">
        <nav>
            <a href="/" data-route="home">Home</a>
            <a href="/chat" data-route="chat">Chat</a>
        </nav>
    </header>
    <section class="content">
        <h1>Acerca de</h1>
        <h2>Chatea con Alejandro Magno, el gran conquistador helénico.</h2>
        <p>Aléxandros III de Macedonia, conocido como Alejandro Magno o El Grande, nacido en 356 AC, fue un rey helénico que conquistó toda grecia y el imperio aqueménida de persia en una serie de campañas que duraron una década. Detuvo su conquista en el río Beas de la india sólo para evitar un motín de parte de sus tropas. Murió en babilonia al poco tiempo, se presume por malaria o fiebre tifoidea. Su genialidad marcial pocas veces vista en la historia generó un culto religioso en su nombre, venerado como parte del panteón helénico, muchas veces reemplazando figuras como las de Apolo, Dionicio, Hércules o Helios. Aparte de las incontables evidencias físicas y arqueológicas, como son las ciudades que llevan su nombre o el rastro tangible de su conquista, en la actualidad no existen fuentes primarias que confirmen su existencia.</p>
        <h3>Acerca del sitio</h3>
        <p>Chatea con una IA de Alejandro magno en un sitio fácil de navegar.</p>
    </section>
  `;
}