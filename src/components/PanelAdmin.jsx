// PanelAdmin.jsx — Iteración 4: Panel de Administración (REQ-F-025)
import { useState } from "react";

const STATUS_LABELS = {
  pendiente: { label: "Pendiente", badge: "badge-orange", dot: "dot-orange" },
  en_curso: { label: "En curso", badge: "badge-blue", dot: "dot-orange" },
  resuelto: { label: "Resuelto", badge: "badge-green", dot: "dot-green" },
};

export default function PanelAdmin({ tickets, onUpdateTicket }) {
  const [filter, setFilter] = useState("todos");

  const filtered = filter === "todos" ? tickets : tickets.filter(t => t.estado === filter);

  return (
    <div>
      <div style={{ background: "var(--urjc-red-light)", border: "1px solid var(--urjc-red-mid)", borderRadius: "var(--radius-sm)", padding: "10px 14px", marginBottom: 16 }}>
        <p style={{ fontSize: 13, fontWeight: 600, color: "var(--urjc-red)" }}>🛡️ Panel de Administración</p>
        <p style={{ fontSize: 11, color: "var(--gray-5)", marginTop: 2 }}>Gestión de incidencias reportadas por usuarias/os y LumenSmart</p>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8, marginBottom: 16 }}>
        {[
          { label: "Total", count: tickets.length, color: "var(--dark)" },
          { label: "Pendientes", count: tickets.filter(t => t.estado === "pendiente").length, color: "#c2410c" },
          { label: "Resueltos", count: tickets.filter(t => t.estado === "resuelto").length, color: "var(--green)" },
        ].map(s => (
          <div key={s.label} style={{ background: "var(--gray-1)", borderRadius: "var(--radius-sm)", padding: "10px 8px", textAlign: "center" }}>
            <p style={{ fontSize: 20, fontWeight: 800, color: s.color }}>{s.count}</p>
            <p style={{ fontSize: 11, color: "var(--gray-4)" }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filter */}
      <div style={{ display: "flex", gap: 6, marginBottom: 16, overflowX: "auto" }}>
        {["todos", "pendiente", "en_curso", "resuelto"].map(f => (
          <button
            key={f}
            className={`btn btn-sm ${filter === f ? "btn-primary" : "btn-secondary"}`}
            style={{ whiteSpace: "nowrap", width: "auto", padding: "6px 14px" }}
            onClick={() => setFilter(f)}
          >
            {f === "todos" ? "Todos" : STATUS_LABELS[f].label}
          </button>
        ))}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: "center", padding: "40px 16px", color: "var(--gray-4)" }}>
          <p style={{ fontSize: 32 }}>📭</p>
          <p style={{ fontSize: 14, marginTop: 8 }}>No hay tickets con este filtro</p>
        </div>
      )}

      {filtered.map(ticket => {
        const s = STATUS_LABELS[ticket.estado];
        return (
          <div key={ticket.id} className="ticket-item">
            <span className="ticket-icon">{ticket.icono}</span>
            <div className="ticket-info">
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <p className="ticket-title">{ticket.tipo}</p>
                <span className={`badge ${s.badge}`}>{s.label}</span>
              </div>
              <p className="ticket-meta">📍 {ticket.ubicacion}</p>
              <p className="ticket-meta">🕐 {ticket.fecha}</p>
              {ticket.descripcion && (
                <p style={{ fontSize: 12, color: "var(--gray-5)", marginTop: 4, fontStyle: "italic" }}>"{ticket.descripcion}"</p>
              )}
              <div className="ticket-actions">
                {ticket.estado === "pendiente" && (
                  <button className="btn btn-sm btn-secondary" style={{ width: "auto" }}
                    onClick={() => onUpdateTicket(ticket.id, "en_curso")}>
                    ▶️ Asignar
                  </button>
                )}
                {ticket.estado === "en_curso" && (
                  <button className="btn btn-sm btn-primary" style={{ width: "auto", background: "var(--green)" }}
                    onClick={() => onUpdateTicket(ticket.id, "resuelto")}>
                    ✅ Resolver
                  </button>
                )}
                {ticket.estado === "resuelto" && (
                  <span style={{ fontSize: 12, color: "var(--green)", fontWeight: 600 }}>✓ Incidencia cerrada</span>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
