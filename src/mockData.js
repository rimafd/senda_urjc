// mockData.js — Datos simulados del sistema LumenSmart y voluntarios

export const MOCK_ROUTES = [
  {
    id: 1,
    name: "Ruta Principal (Iluminada)",
    distance: "850 m",
    time: "11 min",
    isp: 92,
    iluminacion: 95,
    afluencia: 88,
    entorno: 94,
    color: "#15803d",
    waypoints: ["Parada Metro Móstoles Central", "Av. de la Universidad", "Entrada Campus Principal", "Aulario II"],
    tramos: [
      { id: "t1", nombre: "Av. de la Universidad", isp: 95, farolas: 8, operativas: 8 },
      { id: "t2", nombre: "Paseo del Campus", isp: 90, farolas: 6, operativas: 6 },
      { id: "t3", nombre: "Acceso Aulario II", isp: 92, farolas: 4, operativas: 4 },
    ]
  },
  {
    id: 2,
    name: "Ruta Alternativa (Más corta)",
    distance: "620 m",
    time: "8 min",
    isp: 71,
    iluminacion: 65,
    afluencia: 72,
    entorno: 78,
    color: "#f59e0b",
    waypoints: ["Parada Metro", "Calle Tulipán", "Pasaje Interior", "Aulario II"],
    tramos: [
      { id: "t4", nombre: "Calle Tulipán", isp: 70, farolas: 5, operativas: 4 },
      { id: "t5", nombre: "Pasaje Interior", isp: 62, farolas: 3, operativas: 2 },
      { id: "t6", nombre: "Acceso Sur", isp: 80, farolas: 3, operativas: 3 },
    ]
  },
  {
    id: 3,
    name: "Ruta Parque (Evitar noche)",
    distance: "1.1 km",
    time: "14 min",
    isp: 44,
    iluminacion: 30,
    afluencia: 45,
    entorno: 60,
    color: "#ef4444",
    waypoints: ["Parada Metro", "Parque García Lorca", "Zona Deportiva", "Aulario II"],
    tramos: [
      { id: "t7", nombre: "Parque García Lorca", isp: 35, farolas: 4, operativas: 1 },
      { id: "t8", nombre: "Zona Deportiva (cierre nocturno)", isp: 42, farolas: 6, operativas: 3 },
      { id: "t9", nombre: "Acceso Norte", isp: 58, farolas: 3, operativas: 3 },
    ]
  },
];

export const MOCK_VOLUNTEERS = [
  { id: 1, nombre: "Ana García", zona: "Campus Móstoles", disponible: true, rating: 4.9, viajes: 34 },
  { id: 2, nombre: "Carlos Martínez", zona: "Campus Móstoles", disponible: true, rating: 4.7, viajes: 21 },
  { id: 3, nombre: "Laura Sánchez", zona: "Campus Móstoles", disponible: false, rating: 4.8, viajes: 45 },
];

export const MOCK_CONTACTS = [
  { id: 1, nombre: "Mamá", telefono: "+34 612 345 678", emoji: "👩" },
  { id: 2, nombre: "Compañera piso", telefono: "+34 698 765 432", emoji: "👧" },
];

export const INCIDENT_TYPES = [
  { id: "farola", label: "Farola fundida", icon: "💡", penalty: 15 },
  { id: "solitaria", label: "Zona solitaria / miedo", icon: "😰", penalty: 20 },
  { id: "obstaculo", label: "Obstáculo en la vía", icon: "🚧", penalty: 10 },
  { id: "dificultad", label: "Punto con dificultad", icon: "⚠️", penalty: 12 },
];

export const CAMPUS_LIST = [
  "Campus Móstoles",
  "Campus Fuenlabrada",
  "Campus Alcorcón",
  "Campus Vicálvaro",
  "Campus Aranjuez",
];
