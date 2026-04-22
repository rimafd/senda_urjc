// LoginScreen.jsx — Iteración 1: Autenticación SSO URJC (REQ-F-001, CU-01)
import { useState } from "react";

export default function LoginScreen({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const VALID_DOMAINS = ["@urjc.es", "@alumnos.urjc.es"];

  const validate = () => {
    if (!email) return "Introduce tu correo universitario.";
    const hasValidDomain = VALID_DOMAINS.some(d => email.toLowerCase().endsWith(d));
    if (!hasValidDomain) return "Utiliza tu correo corporativo (@urjc.es o @alumnos.urjc.es).";
    if (!password) return "Introduce tu contraseña.";
    if (password.length < 6) return "La contraseña debe tener al menos 6 caracteres.";
    return null;
  };

  const handleLogin = () => {
    const err = validate();
    if (err) { setError(err); return; }
    setError("");
    setLoading(true);
    // Simulación del SSO URJC
    setTimeout(() => {
      setLoading(false);
      const username = email.split("@")[0];
      const role = email.endsWith("@urjc.es") ? "PDI/PTGAS" : "Estudiante";
      onLogin({ email, username, role });
    }, 1400);
  };

  return (
    <div style={{ minHeight: "100dvh", display: "flex", flexDirection: "column", background: "var(--white)" }}>
      {/* Header visual */}
      <div style={{
        background: "var(--urjc-red)", padding: "48px 32px 36px",
        display: "flex", flexDirection: "column", alignItems: "center", gap: 12,
        clipPath: "ellipse(120% 100% at 50% 0%)"
      }}>
        <div style={{ fontSize: 48 }}>🛤️</div>
        <div style={{ color: "var(--white)", fontSize: 28, fontWeight: 800, letterSpacing: "-0.5px" }}>Senda URJC</div>
        <div style={{ color: "rgba(255,255,255,0.8)", fontSize: 14, textAlign: "center", maxWidth: 260 }}>
          Movilidad inteligente y segura para toda la comunidad universitaria
        </div>
      </div>

      {/* Form */}
      <div style={{ flex: 1, padding: "32px 24px", display: "flex", flexDirection: "column", gap: 4 }}>
        <p style={{ fontSize: 13, color: "var(--gray-4)", marginBottom: 16, textAlign: "center" }}>
          Accede con tu cuenta corporativa de la URJC
        </p>

        <div className="input-group">
          <label className="input-label">Correo universitario</label>
          <input
            className={`input-field${error && !email ? " error" : ""}`}
            type="email"
            placeholder="nombre@alumnos.urjc.es"
            value={email}
            onChange={e => { setEmail(e.target.value); setError(""); }}
            onKeyDown={e => e.key === "Enter" && handleLogin()}
            autoComplete="email"
          />
        </div>

        <div className="input-group">
          <label className="input-label">Contraseña</label>
          <div style={{ position: "relative" }}>
            <input
              className="input-field"
              type={showPass ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={e => { setPassword(e.target.value); setError(""); }}
              onKeyDown={e => e.key === "Enter" && handleLogin()}
              style={{ paddingRight: 44 }}
            />
            <button
              onClick={() => setShowPass(v => !v)}
              style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", fontSize: 18, color: "var(--gray-4)" }}
              aria-label={showPass ? "Ocultar contraseña" : "Mostrar contraseña"}
            >
              {showPass ? "🙈" : "👁️"}
            </button>
          </div>
        </div>

        {error && (
          <div style={{ background: "var(--urjc-red-light)", border: "1px solid var(--urjc-red-mid)", borderRadius: "var(--radius-sm)", padding: "10px 14px", marginBottom: 8 }}>
            <p style={{ fontSize: 13, color: "var(--urjc-red)", fontWeight: 500 }}>⚠️ {error}</p>
          </div>
        )}

        <button
          className="btn btn-primary"
          onClick={handleLogin}
          disabled={loading}
          style={{ marginTop: 8 }}
        >
          {loading ? (
            <>
              <span className="spin" style={{ display: "inline-block" }}>⏳</span>
              Verificando con el SSO de la URJC…
            </>
          ) : "Iniciar sesión"}
        </button>

        <div className="divider" />

        <div style={{ background: "var(--gray-1)", borderRadius: "var(--radius-sm)", padding: "12px 16px" }}>
          <p style={{ fontSize: 12, color: "var(--gray-4)", textAlign: "center", lineHeight: 1.6 }}>
            🔒 Autenticación gestionada por el Sistema de Autenticación Centralizada (SSO) de la URJC.<br />
            Tus credenciales no se almacenan en esta aplicación.
          </p>
        </div>

        <p style={{ fontSize: 12, color: "var(--gray-4)", textAlign: "center", marginTop: 12 }}>
          ¿Tienes algún problema? Contacta con el{" "}
          <span style={{ color: "var(--urjc-red)", fontWeight: 600 }}>soporte TIC de la URJC</span>
        </p>
      </div>
    </div>
  );
}
