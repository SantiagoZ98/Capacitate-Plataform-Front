import "../styles/pages/inicio.css";

export default function Home() {
  const usuario = localStorage.getItem("usuario") || "Usuario";

  return (
    // Usa "container" y "card" para que coincida con tu CSS
    <div className="inicio-container">
      <div className="inicio-card">
        
        <h1 className="inicio-title">
          Bienvenido, <span className="nombre">{usuario}</span>
        </h1>

        <p className="inicio-text">
          En esta plataforma encontrarás cursos...
        </p>

        <div className="inicio-logos"></div>

        <button
          className="inicio-btn"
          onClick={() => window.location.href = "/courses/tthh"}
        >
          Comenzar Capacitación
        </button>

      </div>
    </div>
  );
}