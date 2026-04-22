# 🛤️ Senda URJC — Prototipo Evolutivo

Prototipo de la aplicación móvil **Senda URJC**, desarrollado como parte de la práctica de Análisis e Ingeniería de Requisitos (Grado en Ingeniería del Software, URJC, Curso 2025/26 — Grupo 12).

## Descripción

Senda URJC es una aplicación de movilidad inteligente para la comunidad universitaria de la URJC que prioriza rutas seguras basadas en el **Índice de Seguridad Percibida (ISP)**, calculado a partir de iluminación, afluencia y estado del entorno.

## Funcionalidades implementadas

| Iteración | Funcionalidad | Requisitos |
|-----------|--------------|------------|
| 1 | Login / Autenticación SSO URJC | REQ-F-001, CU-01 |
| 2 | Cálculo de rutas seguras + ISP + integración LumenSmart | REQ-F-002 a REQ-F-011, CU-02 |
| 3 | Modo "Voy contigo" + prealerta + alerta de emergencia | REQ-F-012 a REQ-F-017, CU-03, CU-04 |
| 4 | Reporte de incidencias + Panel de administración | REQ-F-018 a REQ-F-025, CU-05 |

## Requisitos previos

- **Node.js** v18 o superior
- **npm** v9 o superior

## Instalación y ejecución

```bash
# 1. Clonar el repositorio
git clone https://github.com/TU_USUARIO/senda-urjc.git
cd senda-urjc

# 2. Instalar dependencias
npm install

# 3. Iniciar servidor de desarrollo
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## Credenciales de prueba

Usa cualquier correo con dominio `@urjc.es` o `@alumnos.urjc.es` y una contraseña de al menos 6 caracteres.

Ejemplos:
- `alumna@alumnos.urjc.es` / `123456`
- `profesor@urjc.es` / `password`

## Build para producción

```bash
npm run build
npm run preview
```

## Estructura del proyecto

```
src/
├── App.jsx                  # Navegación principal (Iteración 4)
├── index.css                # Sistema de diseño URJC
├── main.jsx                 # Punto de entrada React
├── mockData.js              # Datos simulados (LumenSmart, voluntarios, contactos)
└── components/
    ├── LoginScreen.jsx      # Iteración 1 — Autenticación
    ├── RouteCalculator.jsx  # Iteración 2 — Rutas seguras
    ├── VoyContigo.jsx       # Iteración 3 — Modo supervisado
    ├── IncidenciaForm.jsx   # Iteración 4 — Reporte incidencias
    └── PanelAdmin.jsx       # Iteración 4 — Panel administración
```

## Tecnologías utilizadas

- **React 18** — Framework UI
- **Vite** — Build tool (Open Source)
- **CSS personalizado** — Sistema de diseño corporativo URJC (sin dependencias adicionales)
- **Google Fonts** — DM Sans + DM Mono

> ⚠️ Este es un **prototipo evolutivo** con datos simulados. La integración real con el SSO de la URJC y la API LumenConnect requeriría credenciales y configuración de backend adicional.

---

Grupo 12 — Análisis e Ingeniería de Requisitos — URJC 2025/26
