// RouteCalculator.jsx — Iteración 2: Cálculo de Rutas Seguras (REQ-F-002 a REQ-F-011, CU-02)
import { useState, useEffect } from "react";
import { MOCK_ROUTES } from "../mockData.js";

function ISPBar({ value }) {
  const cls = value >= 75 ? "isp-high" : value >= 50 ? "isp-mid" : "isp-low";
  const label = value >= 75 ? "Alta" : value >= 50 ? "Media" : "Baja";
  const color = value >= 75 ? "var(--green)" : value >= 50 ? "#f59e0b" : "#ef4444";
  return (
    <div className="isp-bar-wrap">
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
        <span style={{ fontSize: 11, color: "var(--gray-4)" }}>Índice de Seguridad Percibida</span>
        <span style={{ fontSize: 12, fontWeight: 700, color }}>{value}/100 · {label}</span>
      </div>
      <div className="isp-bar-bg">
        <div className={`isp-bar-fill ${cls}`} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

function MapPlaceholder({ selectedRoute, apagon }) {
  return (
    <div className="map-placeholder" style={{ height: 220 }}>
      <div className="map-grid" />
      {/* Roads */}
      <div className="map-road-h" style={{ top: "40%" }} />
      <div className="map-road-h" style={{ top: "65%" }} />
      <div className="map-road-v" style={{ left: "30%" }} />
      <div className="map-road-v" style={{ left: "65%" }} />
      {/* Route lines simulation */}
      {[0,1,2].map(i => (
        <div key={i} style={{
          position: "absolute",
          height: 4, borderRadius: 2,
          background: i === 0 ? "var(--green)" : i === 1 ? "#f59e0b" : "#ef4444",
          opacity: selectedRoute === i+1 ? 1 : 0.35,
          top: `${38 + i * 8}%`,
          left: "28%", right: "33%",
          transform: `rotate(${i === 1 ? -3 : i === 2 ? -8 : 0}deg)`,
          transformOrigin: "left center",
          transition: "opacity 0.3s",
          boxShadow: selectedRoute === i+1 ? `0 0 8px ${i === 0 ? "var(--green)" : i === 1 ? "#f59e0b" : "#ef4444"}` : "none"
        }} />
      ))}
      {apagon && (
        <div style={{ position: "absolute", top: "30%", left: "50%", transform: "translateX(-50%)", background: "#1a1a1a", color: "#fbbf24", borderRadius: 8, padding: "4px 10px", fontSize: 11, fontWeight: 700, zIndex: 2 }}>
          ⚡ APAGÓN DETECTADO
        </div>
      )}
      <span className="map-pin" style={{ bottom: "30%", right: "28%", fontSize: 20 }}>🏫</span>
      <span className="map-pin" style={{ top: "18%", left: "22%", fontSize: 20 }}>📍</span>
      <div style={{ position: "absolute", bottom: 8, left: 0, right: 0, textAlign: "center" }}>
        <span style={{ fontSize: 10, color: "var(--gray-4)", background: "rgba(255,255,255,0.8)", padding: "2px 8px", borderRadius: 4 }}>
          🗺️ Cartografía OpenStreetMap (simulada)
        </span>
      </div>
    </div>
  );
}

export default function RouteCalculator({ onStartTrip }) {
  const [destino, setDestino] = useState("");
  const [searching, setSearching] = useState(false);
  const [routes, setRoutes] = useState(null);
  const [selected, setSelected] = useState(null);
  const [apagon, setApagon] = useState(false);
  const [showDetail, setShowDetail] = useState(false);

  // Apply blackout penalty to route 3
  const displayRoutes = routes ? routes.map(r => apagon && r.id === 3
    ? { ...r, isp: Math.max(r.isp - 30, 5), iluminacion: Math.max(r.iluminacion - 40, 0), apagonAlert: true }
    : r
  ) : null;

  const handleSearch = () => {
    if (!destino.trim()) return;
    setSearching(true);
    setRoutes(null); setSelected(null);
    setTimeout(() => {
      setSearching(false);
      setRoutes(MOCK_ROUTES);
      setSelected(1);
    }, 1200);
  };

  const selectedRoute = displayRoutes?.find(r => r.id === selected);

  return (
    <div>
      <p className="section-header">¿A dónde vas?</p>

      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <input
          className="input-field"
          placeholder="Ej: Aulario II, Biblioteca…"
          value={destino}
          onChange={e => setDestino(e.target.value)}
          onKeyDown={e => e.key === "Enter" && handleSearch()}
          style={{ flex: 1 }}
        />
        <button className="btn btn-primary" style={{ width: "auto", padding: "0 18px" }} onClick={handleSearch}>
          {searching ? <span className="spin">⏳</span> : "🔍"}
        </button>
      </div>

      {/* LumenSmart toggle */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "var(--gray-1)", borderRadius: "var(--radius-sm)", padding: "10px 14px", marginBottom: 16 }}>
        <div>
          <p style={{ fontSize: 13, fontWeight: 600 }}>⚡ Simular apagón (LumenSmart)</p>
          <p style={{ fontSize: 11, color: "var(--gray-4)" }}>Penaliza tramos oscuros automáticamente</p>
        </div>
        <label style={{ position: "relative", display: "inline-block", width: 44, height: 24, cursor: "pointer" }}>
          <input type="checkbox" checked={apagon} onChange={e => setApagon(e.target.checked)} style={{ opacity: 0, width: 0, height: 0 }} />
          <span style={{
            position: "absolute", inset: 0, background: apagon ? "#ef4444" : "var(--gray-3)", borderRadius: 24, transition: "background 0.2s"
          }}>
            <span style={{
              position: "absolute", width: 18, height: 18, background: "white", borderRadius: "50%",
              top: 3, left: apagon ? 23 : 3, transition: "left 0.2s", boxShadow: "0 1px 4px rgba(0,0,0,0.2)"
            }} />
          </span>
        </label>
      </div>

      {searching && (
        <div style={{ textAlign: "center", padding: "32px 0", color: "var(--gray-4)" }}>
          <div className="spin" style={{ fontSize: 32, display: "block", marginBottom: 12 }}>⏳</div>
          <p style={{ fontSize: 14 }}>Calculando rutas seguras…</p>
          <p style={{ fontSize: 12, marginTop: 4 }}>Consultando datos de iluminación y afluencia</p>
        </div>
      )}

      {displayRoutes && (
        <>
          <MapPlaceholder selectedRoute={selected} apagon={apagon} />
          <div style={{ marginTop: 16 }}>
            <p className="section-header">Alternativas de ruta</p>
            {displayRoutes.sort((a,b) => b.isp - a.isp).map(route => (
              <div
                key={route.id}
                className={`card${selected === route.id ? " card-red" : ""}`}
                style={{ cursor: "pointer", transition: "all 0.18s", borderColor: selected === route.id ? "var(--urjc-red)" : undefined }}
                onClick={() => { setSelected(route.id); setShowDetail(false); }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 700 }}>{route.name}</p>
                    <p style={{ fontSize: 12, color: "var(--gray-4)" }}>📏 {route.distance} · ⏱️ {route.time}</p>
                  </div>
                  {route.apagonAlert && <span className="badge badge-red">⚡ Penalizada</span>}
                  {selected === route.id && !route.apagonAlert && <span className="badge badge-green">✓ Seleccionada</span>}
                </div>
                <ISPBar value={route.isp} />
                {selected === route.id && (
                  <div style={{ marginTop: 10, display: "flex", gap: 6 }}>
                    <div style={{ flex: 1, background: "var(--gray-1)", borderRadius: 6, padding: "6px 8px", textAlign: "center" }}>
                      <p style={{ fontSize: 10, color: "var(--gray-4)" }}>💡 Iluminación</p>
                      <p style={{ fontSize: 14, fontWeight: 700 }}>{route.iluminacion}%</p>
                    </div>
                    <div style={{ flex: 1, background: "var(--gray-1)", borderRadius: 6, padding: "6px 8px", textAlign: "center" }}>
                      <p style={{ fontSize: 10, color: "var(--gray-4)" }}>👥 Afluencia</p>
                      <p style={{ fontSize: 14, fontWeight: 700 }}>{route.afluencia}%</p>
                    </div>
                    <div style={{ flex: 1, background: "var(--gray-1)", borderRadius: 6, padding: "6px 8px", textAlign: "center" }}>
                      <p style={{ fontSize: 10, color: "var(--gray-4)" }}>🏗️ Entorno</p>
                      <p style={{ fontSize: 14, fontWeight: 700 }}>{route.entorno}%</p>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {selectedRoute && (
              <button
                className="btn btn-primary"
                onClick={() => onStartTrip(selectedRoute)}
                style={{ marginTop: 8 }}
              >
                🚶 Iniciar trayecto por esta ruta
              </button>
            )}
          </div>
        </>
      )}

      {!routes && !searching && (
        <div style={{ textAlign: "center", padding: "48px 16px", color: "var(--gray-4)" }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🗺️</div>
          <p style={{ fontSize: 15, fontWeight: 600, color: "var(--gray-5)" }}>Busca tu destino</p>
          <p style={{ fontSize: 13, marginTop: 6 }}>Las rutas se ordenan por seguridad percibida,<br />no por tiempo ni distancia</p>
        </div>
      )}
    </div>
  );
}
