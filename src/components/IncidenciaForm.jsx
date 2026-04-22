// IncidenciaForm.jsx — Iteración 4: Reporte de Incidencias (REQ-F-018 a REQ-F-020, CU-05)
import { useState } from "react";
import { INCIDENT_TYPES } from "../mockData.js";

export default function IncidenciaForm({ onSubmit, onCancel }) {
  const [selected, setSelected] = useState(null);
  const [descripcion, setDescripcion] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!selected) return;
    const type = INCIDENT_TYPES.find(t => t.id === selected);
    setSubmitted(true);
    setTimeout(() => {
      onSubmit({
        id: Date.now(),
        tipo: type.label,
        icono: type.icon,
        penalty: type.penalty,
        descripcion: descripcion || "(Sin descripción adicional)",
        ubicacion: "Campus Móstoles — Paseo Central",
        fecha: new Date().toLocaleString("es-ES"),
        estado: "pendiente",
      });
    }, 1000);
  };

  if (submitted) return (
    <div style={{ textAlign: "center", padding: "48px 16px" }}>
      <div style={{ fontSize: 56, marginBottom: 12 }}>✅</div>
      <h3 style={{ fontSize: 18, fontWeight: 800 }}>Incidencia registrada</h3>
      <p style={{ fontSize: 13, color: "var(--gray-5)", marginTop: 8, lineHeight: 1.6 }}>
        Se ha actualizado el Índice de Seguridad Percibida de la zona.<br />
        Se ha generado un ticket en el panel de administración.
      </p>
      <div className="spin" style={{ fontSize: 24, display: "block", marginTop: 16 }}>⏳</div>
    </div>
  );

  return (
    <div>
      <p style={{ fontSize: 14, color: "var(--gray-5)", marginBottom: 16, lineHeight: 1.5 }}>
        Reporta un problema en el entorno. Esto mejorará la seguridad de las rutas calculadas para toda la comunidad.
      </p>

      <p className="section-header">Tipo de incidencia</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 20 }}>
        {INCIDENT_TYPES.map(type => (
          <div
            key={type.id}
            onClick={() => setSelected(type.id)}
            style={{
              border: `2px solid ${selected === type.id ? "var(--urjc-red)" : "var(--gray-2)"}`,
              borderRadius: "var(--radius)",
              padding: "16px 12px",
              cursor: "pointer",
              textAlign: "center",
              background: selected === type.id ? "var(--urjc-red-light)" : "var(--white)",
              transition: "all 0.15s",
            }}
          >
            <div style={{ fontSize: 28, marginBottom: 6 }}>{type.icon}</div>
            <p style={{ fontSize: 12, fontWeight: 600, color: selected === type.id ? "var(--urjc-red)" : "var(--dark)" }}>
              {type.label}
            </p>
            <p style={{ fontSize: 10, color: "var(--gray-4)", marginTop: 2 }}>ISP -{type.penalty}pts</p>
          </div>
        ))}
      </div>

      <div className="input-group">
        <label className="input-label">Descripción adicional (opcional)</label>
        <textarea
          className="input-field"
          rows={3}
          placeholder="Añade más detalles sobre la incidencia…"
          value={descripcion}
          onChange={e => setDescripcion(e.target.value)}
          style={{ resize: "none" }}
        />
      </div>

      <div style={{ background: "var(--gray-1)", borderRadius: "var(--radius-sm)", padding: "10px 14px", marginBottom: 16 }}>
        <p style={{ fontSize: 12, color: "var(--gray-4)" }}>
          📍 Ubicación registrada automáticamente: <strong>Campus Móstoles — Paseo Central</strong>
        </p>
      </div>

      <button className="btn btn-primary" disabled={!selected} onClick={handleSubmit} style={{ marginBottom: 10 }}>
        📤 Enviar incidencia
      </button>
      <button className="btn btn-secondary" onClick={onCancel}>Cancelar</button>
    </div>
  );
}
