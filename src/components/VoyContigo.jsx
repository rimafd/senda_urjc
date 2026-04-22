// VoyContigo.jsx — Iteración 3: Modo "Voy contigo" + Alertas (REQ-F-012 a REQ-F-017, CU-03, CU-04)
import { useState, useEffect, useRef } from "react";
import { MOCK_CONTACTS, MOCK_VOLUNTEERS } from "../mockData.js";

function AlertaEmergencia({ onDismiss, ubicacion }) {
  return (
    <div className="overlay">
      <div className="sheet" style={{ borderTop: "4px solid #ef4444" }}>
        <div style={{ textAlign: "center", marginBottom: 16 }}>
          <div style={{ fontSize: 48 }}>🚨</div>
          <h2 style={{ fontSize: 20, fontWeight: 800, color: "#ef4444", marginTop: 8 }}>Alerta de emergencia enviada</h2>
          <p style={{ fontSize: 13, color: "var(--gray-5)", marginTop: 6, lineHeight: 1.5 }}>
            Se ha notificado al contacto de confianza y al Servicio de Seguridad del campus con tu última ubicación conocida e historial del trayecto.
          </p>
        </div>
        <div style={{ background: "var(--gray-1)", borderRadius: "var(--radius-sm)", padding: "12px 14px", marginBottom: 16 }}>
          <p style={{ fontSize: 12, fontWeight: 600, color: "var(--gray-5)" }}>📍 Última ubicación registrada</p>
          <p style={{ fontSize: 13, fontWeight: 700, marginTop: 4 }}>{ubicacion}</p>
          <p style={{ fontSize: 11, color: "var(--gray-4)", marginTop: 2 }}>Enviada a: Servicio de Seguridad URJC · Contacto de confianza</p>
        </div>
        <button className="btn btn-danger" onClick={onDismiss}>Confirmar — estoy bien ✅</button>
        <p style={{ fontSize: 11, color: "var(--gray-4)", textAlign: "center", marginTop: 10 }}>
          Si necesitas ayuda inmediata llama al <strong>112</strong>
        </p>
      </div>
    </div>
  );
}

function PreAlertaSheet({ countdown, onConfirm }) {
  return (
    <div className="overlay">
      <div className="sheet" style={{ borderTop: "4px solid #f59e0b" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 40 }}>⚠️</div>
          <h2 style={{ fontSize: 18, fontWeight: 800, color: "#c2410c", marginTop: 8 }}>Parada detectada</h2>
          <p style={{ fontSize: 13, color: "var(--gray-5)", marginTop: 6 }}>
            Se ha detectado una detención inesperada. ¿Estás bien?
          </p>
          <div className="countdown-ring">
            <span className="countdown-num pulse">{countdown}</span>
          </div>
          <p style={{ fontSize: 12, color: "var(--gray-4)", marginBottom: 16 }}>
            Si no respondes en {countdown}s se enviará una alerta de emergencia
          </p>
          <button className="btn btn-primary" onClick={onConfirm}>
            ✅ Estoy bien — cancelar alerta
          </button>
        </div>
      </div>
    </div>
  );
}

export default function VoyContigo({ route, user, onEnd }) {
  const [step, setStep] = useState("setup"); // setup | active | prealerta | emergencia | finished
  const [selectedContact, setSelectedContact] = useState(null);
  const [selectedVolunteer, setSelectedVolunteer] = useState(null);
  const [contactType, setContactType] = useState("contact"); // contact | volunteer
  const [countdown, setCountdown] = useState(30);
  const [elapsed, setElapsed] = useState(0);
  const [simulateStop, setSimulateStop] = useState(false);
  const timerRef = useRef(null);
  const elapsedRef = useRef(null);

  const WAYPOINTS = route?.waypoints || ["Punto de inicio", "Destino"];
  const currentWaypoint = WAYPOINTS[Math.min(Math.floor(elapsed / 15), WAYPOINTS.length - 1)];
  const progress = Math.min((elapsed / (WAYPOINTS.length * 15)) * 100, 100);

  // Elapsed timer when active
  useEffect(() => {
    if (step === "active") {
      elapsedRef.current = setInterval(() => setElapsed(e => e + 1), 1000);
    }
    return () => clearInterval(elapsedRef.current);
  }, [step]);

  // Auto-finish
  useEffect(() => {
    if (progress >= 100 && step === "active") {
      clearInterval(elapsedRef.current);
      setStep("finished");
    }
  }, [progress, step]);

  // Countdown for pre-alert
  useEffect(() => {
    if (step === "prealerta") {
      timerRef.current = setInterval(() => {
        setCountdown(c => {
          if (c <= 1) {
            clearInterval(timerRef.current);
            setStep("emergencia");
            return 0;
          }
          return c - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [step]);

  const handleSimulateStop = () => {
    clearInterval(elapsedRef.current);
    setCountdown(30);
    setStep("prealerta");
  };

  const handleConfirmOk = () => {
    clearInterval(timerRef.current);
    setStep("active");
    setCountdown(30);
  };

  const handleStart = () => {
    if (!selectedContact && !selectedVolunteer) return;
    setStep("active");
  };

  if (step === "finished") return (
    <div style={{ textAlign: "center", padding: "48px 24px" }}>
      <div style={{ fontSize: 64, marginBottom: 16 }}>🎉</div>
      <h2 style={{ fontSize: 22, fontWeight: 800, color: "var(--green)" }}>¡Trayecto completado!</h2>
      <p style={{ fontSize: 14, color: "var(--gray-5)", marginTop: 8, lineHeight: 1.6 }}>
        Has llegado a tu destino de forma segura.<br />
        El seguimiento se ha desactivado.
      </p>
      <div style={{ background: "var(--green-light)", borderRadius: "var(--radius)", padding: "16px", marginTop: 24, marginBottom: 24 }}>
        <p style={{ fontSize: 13, color: "var(--green)", fontWeight: 600 }}>
          ✓ La ubicación en tiempo real ha dejado de compartirse<br />
          ✓ Historial del trayecto eliminado (retención 24h)
        </p>
      </div>
      <button className="btn btn-secondary" onClick={onEnd}>Volver al inicio</button>
    </div>
  );

  if (step === "setup") return (
    <div>
      <div className="card card-red" style={{ marginBottom: 20 }}>
        <p style={{ fontSize: 14, fontWeight: 700, marginBottom: 4 }}>🛤️ Ruta seleccionada</p>
        <p style={{ fontSize: 13, color: "var(--gray-5)" }}>{route?.name}</p>
        <p style={{ fontSize: 12, color: "var(--gray-4)", marginTop: 4 }}>📏 {route?.distance} · ISP: {route?.isp}/100</p>
      </div>

      <p className="section-header">¿Con quién vas?</p>

      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <button
          className={`btn btn-sm ${contactType === "contact" ? "btn-primary" : "btn-secondary"}`}
          style={{ flex: 1 }}
          onClick={() => setContactType("contact")}
        >👥 Contacto de confianza</button>
        <button
          className={`btn btn-sm ${contactType === "volunteer" ? "btn-primary" : "btn-secondary"}`}
          style={{ flex: 1 }}
          onClick={() => setContactType("volunteer")}
        >🙋 Voluntario/a</button>
      </div>

      {contactType === "contact" && (
        <>
          <p style={{ fontSize: 13, color: "var(--gray-5)", marginBottom: 10 }}>Selecciona a quién compartir tu ubicación:</p>
          {MOCK_CONTACTS.map(c => (
            <div
              key={c.id}
              className={`card${selectedContact?.id === c.id ? " card-red" : ""}`}
              style={{ cursor: "pointer", borderColor: selectedContact?.id === c.id ? "var(--urjc-red)" : undefined }}
              onClick={() => setSelectedContact(c)}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontSize: 28 }}>{c.emoji}</span>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 600 }}>{c.nombre}</p>
                  <p style={{ fontSize: 12, color: "var(--gray-4)" }}>{c.telefono}</p>
                </div>
                {selectedContact?.id === c.id && <span style={{ marginLeft: "auto", color: "var(--urjc-red)", fontWeight: 700 }}>✓</span>}
              </div>
            </div>
          ))}
        </>
      )}

      {contactType === "volunteer" && (
        <>
          <p style={{ fontSize: 13, color: "var(--gray-5)", marginBottom: 10 }}>Voluntarios/as disponibles cerca:</p>
          {MOCK_VOLUNTEERS.map(v => (
            <div
              key={v.id}
              className={`card${selectedVolunteer?.id === v.id ? " card-red" : ""}`}
              style={{ cursor: v.disponible ? "pointer" : "not-allowed", opacity: v.disponible ? 1 : 0.5, borderColor: selectedVolunteer?.id === v.id ? "var(--urjc-red)" : undefined }}
              onClick={() => v.disponible && setSelectedVolunteer(v)}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontSize: 28 }}>🙋</span>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 14, fontWeight: 600 }}>{v.nombre}</p>
                  <p style={{ fontSize: 12, color: "var(--gray-4)" }}>⭐ {v.rating} · {v.viajes} acompañamientos</p>
                  <span className={`badge ${v.disponible ? "badge-green" : "badge-gray"}`} style={{ marginTop: 4 }}>
                    {v.disponible ? "Disponible" : "No disponible"}
                  </span>
                </div>
                {selectedVolunteer?.id === v.id && <span style={{ color: "var(--urjc-red)", fontWeight: 700 }}>✓</span>}
              </div>
            </div>
          ))}
        </>
      )}

      <button
        className="btn btn-primary"
        style={{ marginTop: 8 }}
        disabled={contactType === "contact" ? !selectedContact : !selectedVolunteer}
        onClick={handleStart}
      >
        🚶 Iniciar trayecto supervisado
      </button>
    </div>
  );

  return (
    <div>
      {/* Active trip view */}
      <div style={{ background: "var(--urjc-red)", borderRadius: "var(--radius)", padding: "16px 18px", marginBottom: 16, color: "white" }}>
        <div style={{ display: "flex", justify: "space-between", alignItems: "center", marginBottom: 8 }}>
          <p style={{ fontSize: 13, fontWeight: 700 }}>🟢 Modo "Voy contigo" activo</p>
          <span style={{ fontSize: 11, opacity: 0.8 }}>
            {contactType === "contact" ? `📲 ${selectedContact?.nombre}` : `🙋 ${selectedVolunteer?.nombre}`}
          </span>
        </div>
        <div style={{ background: "rgba(255,255,255,0.2)", borderRadius: 6, height: 8, marginBottom: 8 }}>
          <div style={{ background: "white", height: "100%", borderRadius: 6, width: `${progress}%`, transition: "width 1s linear" }} />
        </div>
        <p style={{ fontSize: 12, opacity: 0.9 }}>📍 {currentWaypoint}</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
        <div className="card" style={{ textAlign: "center", padding: "14px 10px" }}>
          <p style={{ fontSize: 24, fontWeight: 800, color: "var(--urjc-red)" }}>{Math.floor(elapsed / 60)}:{String(elapsed % 60).padStart(2,"0")}</p>
          <p style={{ fontSize: 11, color: "var(--gray-4)" }}>Tiempo en ruta</p>
        </div>
        <div className="card" style={{ textAlign: "center", padding: "14px 10px" }}>
          <p style={{ fontSize: 24, fontWeight: 800, color: "var(--green)" }}>{route?.isp}</p>
          <p style={{ fontSize: 11, color: "var(--gray-4)" }}>ISP de la ruta</p>
        </div>
      </div>

      <div className="card" style={{ marginBottom: 16 }}>
        <p style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>📍 Recorrido</p>
        {WAYPOINTS.map((wp, i) => {
          const done = i < Math.floor(elapsed / 15);
          const current = i === Math.floor(elapsed / 15);
          return (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
              <span style={{ fontSize: 14 }}>{done ? "✅" : current ? "🔵" : "⚪"}</span>
              <p style={{ fontSize: 13, color: done ? "var(--green)" : current ? "var(--dark)" : "var(--gray-4)", fontWeight: current ? 700 : 400 }}>{wp}</p>
            </div>
          );
        })}
      </div>

      <button className="btn btn-secondary" style={{ marginBottom: 10 }} onClick={handleSimulateStop}>
        ⏸️ Simular parada inesperada (demo)
      </button>
      <button className="btn btn-ghost" onClick={() => { clearInterval(elapsedRef.current); onEnd(); }}>
        Cancelar trayecto
      </button>

      {/* Emergency button — always accessible, one hand */}
      <button className="emergency-btn" title="Alerta de emergencia" onClick={() => { clearInterval(elapsedRef.current); setStep("emergencia"); }}>
        🆘
      </button>

      {step === "prealerta" && <PreAlertaSheet countdown={countdown} onConfirm={handleConfirmOk} />}
      {step === "emergencia" && (
        <AlertaEmergencia
          ubicacion={currentWaypoint}
          onDismiss={() => { setStep("finished"); }}
        />
      )}
    </div>
  );
}
