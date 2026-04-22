// App.jsx — Iteración 4 (refactorizado): Navegación completa Senda URJC
import { useState } from "react";
import LoginScreen from "./components/LoginScreen.jsx";
import RouteCalculator from "./components/RouteCalculator.jsx";
import VoyContigo from "./components/VoyContigo.jsx";
import IncidenciaForm from "./components/IncidenciaForm.jsx";
import PanelAdmin from "./components/PanelAdmin.jsx";

// Initial demo tickets
const DEMO_TICKETS = [
  { id: 1, tipo: "Farola fundida", icono: "💡", penalty: 15, descripcion: "Farola apagada en el tramo junto a Conserjería", ubicacion: "Campus Móstoles — Acceso Principal", fecha: "21/04/2025, 22:14", estado: "en_curso" },
  { id: 2, tipo: "Zona solitaria / miedo", icono: "😰", penalty: 20, descripcion: "", ubicacion: "Campus Móstoles — Pasaje Interior", fecha: "20/04/2025, 21:30", estado: "pendiente" },
  { id: 3, tipo: "Obstáculo en la vía", icono: "🚧", penalty: 10, descripcion: "Andamio sin señalizar", ubicacion: "Campus Móstoles — Av. de la Universidad", fecha: "19/04/2025, 09:05", estado: "resuelto" },
];

export default function App() {
  const [user, setUser] = useState(null);
  const [screen, setScreen] = useState("rutas"); // rutas | voy | incidencia | admin
  const [activeRoute, setActiveRoute] = useState(null);
  const [tickets, setTickets] = useState(DEMO_TICKETS);
  const [showIncidenciaModal, setShowIncidenciaModal] = useState(false);

  const handleLogin = (userData) => setUser(userData);

  const handleStartTrip = (route) => {
    setActiveRoute(route);
    setScreen("voy");
  };

  const handleEndTrip = () => {
    setActiveRoute(null);
    setScreen("rutas");
  };

  const handleIncidenciaSubmit = (incidencia) => {
    setTickets(prev => [incidencia, ...prev]);
    setTimeout(() => {
      setShowIncidenciaModal(false);
      setScreen("rutas");
    }, 1200);
  };

  const handleUpdateTicket = (id, newStatus) => {
    setTickets(prev => prev.map(t => t.id === id ? { ...t, estado: newStatus } : t));
  };

  if (!user) return <LoginScreen onLogin={handleLogin} />;

  const pendingCount = tickets.filter(t => t.estado === "pendiente").length;

  const screens = {
    rutas: {
      title: "Rutas Seguras",
      content: (
        <>
          <RouteCalculator onStartTrip={handleStartTrip} />
          <div className="divider" />
          <button
            className="btn btn-ghost"
            onClick={() => setShowIncidenciaModal(true)}
            style={{ marginTop: 0 }}
          >
            ⚠️ Reportar incidencia en el entorno
          </button>
        </>
      )
    },
    voy: {
      title: 'Modo "Voy contigo"',
      content: <VoyContigo route={activeRoute} user={user} onEnd={handleEndTrip} />
    },
    admin: {
      title: "Panel de Administración",
      content: <PanelAdmin tickets={tickets} onUpdateTicket={handleUpdateTicket} />
    }
  };

  const currentScreen = screens[screen] || screens.rutas;

  return (
    <div className="app-shell">
      {/* Top bar */}
      <div className="topbar">
        <span className="topbar-logo">🛤️ Senda</span>
        <span className="topbar-title">{currentScreen.title}</span>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 32, height: 32, background: "var(--urjc-red)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: 13, fontWeight: 700 }}>
            {user.username?.[0]?.toUpperCase() || "U"}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="screen-content">
        {showIncidenciaModal ? (
          <>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
              <button onClick={() => setShowIncidenciaModal(false)} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer" }}>←</button>
              <p style={{ fontSize: 16, fontWeight: 700 }}>Reportar incidencia</p>
            </div>
            <IncidenciaForm onSubmit={handleIncidenciaSubmit} onCancel={() => setShowIncidenciaModal(false)} />
          </>
        ) : (
          currentScreen.content
        )}
      </div>

      {/* Bottom navigation */}
      {!showIncidenciaModal && (
        <nav className="bottom-nav">
          <button className={`nav-item${screen === "rutas" ? " active" : ""}`} onClick={() => setScreen("rutas")}>
            <span className="nav-icon">🗺️</span>
            <span className="nav-label">Rutas</span>
          </button>
          <button className={`nav-item${screen === "voy" ? " active" : ""}`} onClick={() => setScreen("voy")}>
            <span className="nav-icon">🙋</span>
            <span className="nav-label">Voy contigo</span>
          </button>
          <button className={`nav-item${screen === "admin" ? " active" : ""}`} onClick={() => setScreen("admin")}>
            <span className="nav-icon">🛡️</span>
            <span className="nav-label" style={{ position: "relative" }}>
              Admin
              {pendingCount > 0 && (
                <span style={{
                  position: "absolute", top: -8, right: -12,
                  background: "var(--urjc-red)", color: "white",
                  borderRadius: "50%", width: 16, height: 16,
                  fontSize: 9, fontWeight: 700,
                  display: "flex", alignItems: "center", justifyContent: "center"
                }}>{pendingCount}</span>
              )}
            </span>
          </button>
        </nav>
      )}
    </div>
  );
}
