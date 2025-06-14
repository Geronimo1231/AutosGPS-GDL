// Datos de demostración para el sistema de gestión de vehículos

export interface Usuario {
  id: number
  nombre: string
  apellido: string
  email: string
  telefono?: string
  rol: "admin_global" | "admin" | "usuario"
  fechaCreacion: string
  foto?: string
}

export interface Vehiculo {
  id: number
  marca: string
  modelo: string
  anio: number
  tipo: "sedan" | "pickup" | "suv" | "hatchback" | "deportivo"
  color: string
  matricula: string
  imagen?: string
  asignado: boolean
  usuarioId?: number
  usuarioAsignado?: string
  fechaCreacion: string
}

export interface Asignacion {
  id: number
  usuarioId: number
  vehiculoId: number
  fechaInicio: string
  fechaFin?: string
  notas?: string
  activa: boolean
}

// Usuarios de demostración con 3 roles
export const usuariosData: Usuario[] = [
  {
    id: 1,
    nombre: "Admin",
    apellido: "Global",
    email: "admin.global@vehiculos.com",
    telefono: "+52 33 1234 5678",
    rol: "admin_global",
    fechaCreacion: "2024-01-01",
    foto: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 2,
    nombre: "Admin",
    apellido: "Normal",
    email: "admin@vehiculos.com",
    telefono: "+52 33 2345 6789",
    rol: "admin",
    fechaCreacion: "2024-01-05",
    foto: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 3,
    nombre: "María",
    apellido: "Rodríguez",
    email: "usuario@vehiculos.com",
    telefono: "+52 33 3456 7890",
    rol: "usuario",
    fechaCreacion: "2024-01-15",
    foto: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 4,
    nombre: "Carlos",
    apellido: "García",
    email: "carlos.garcia@empresa.com",
    telefono: "+52 33 4567 8901",
    rol: "usuario",
    fechaCreacion: "2024-02-01",
  },
  {
    id: 5,
    nombre: "Ana",
    apellido: "López",
    email: "ana.lopez@empresa.com",
    telefono: "+52 33 5678 9012",
    rol: "usuario",
    fechaCreacion: "2024-02-15",
  },
  {
    id: 6,
    nombre: "Luis",
    apellido: "Martín",
    email: "luis.martin@empresa.com",
    telefono: "+52 33 6789 0123",
    rol: "usuario",
    fechaCreacion: "2024-03-01",
  },
]

// Catálogo de vehículos con 25 ejemplos
export const vehiculosData: Vehiculo[] = [
  {
    id: 1,
    marca: "Toyota",
    modelo: "Corolla",
    anio: 2023,
    tipo: "sedan",
    color: "Blanco",
    matricula: "JAL-1234",
    imagen: "/placeholder.svg?height=200&width=400",
    asignado: true,
    usuarioId: 3,
    usuarioAsignado: "María Rodríguez",
    fechaCreacion: "2024-01-10",
  },
  {
    id: 2,
    marca: "Ford",
    modelo: "F-150",
    anio: 2022,
    tipo: "pickup",
    color: "Azul",
    matricula: "JAL-5678",
    imagen: "/placeholder.svg?height=200&width=400",
    asignado: true,
    usuarioId: 4,
    usuarioAsignado: "Carlos García",
    fechaCreacion: "2024-01-12",
  },
  {
    id: 3,
    marca: "Honda",
    modelo: "CR-V",
    anio: 2024,
    tipo: "suv",
    color: "Negro",
    matricula: "JAL-9012",
    imagen: "/placeholder.svg?height=200&width=400",
    asignado: false,
    fechaCreacion: "2024-01-15",
  },
  {
    id: 4,
    marca: "Volkswagen",
    modelo: "Golf",
    anio: 2023,
    tipo: "hatchback",
    color: "Rojo",
    matricula: "JAL-3456",
    imagen: "/placeholder.svg?height=200&width=400",
    asignado: true,
    usuarioId: 5,
    usuarioAsignado: "Ana López",
    fechaCreacion: "2024-01-18",
  },
  {
    id: 5,
    marca: "BMW",
    modelo: "Serie 3",
    anio: 2023,
    tipo: "sedan",
    color: "Gris",
    matricula: "JAL-7890",
    imagen: "/placeholder.svg?height=200&width=400",
    asignado: false,
    fechaCreacion: "2024-01-20",
  },
  {
    id: 6,
    marca: "Audi",
    modelo: "A4",
    anio: 2024,
    tipo: "sedan",
    color: "Blanco",
    matricula: "JAL-2468",
    imagen: "/placeholder.svg?height=200&width=400",
    asignado: true,
    usuarioId: 6,
    usuarioAsignado: "Luis Martín",
    fechaCreacion: "2024-01-22",
  },
  {
    id: 7,
    marca: "Mercedes-Benz",
    modelo: "Clase C",
    anio: 2023,
    tipo: "sedan",
    color: "Negro",
    matricula: "JAL-1357",
    imagen: "/placeholder.svg?height=200&width=400",
    asignado: false,
    fechaCreacion: "2024-01-25",
  },
  {
    id: 8,
    marca: "Nissan",
    modelo: "Qashqai",
    anio: 2022,
    tipo: "suv",
    color: "Azul",
    matricula: "JAL-9753",
    imagen: "/placeholder.svg?height=200&width=400",
    asignado: false,
    fechaCreacion: "2024-01-28",
  },
  {
    id: 9,
    marca: "Hyundai",
    modelo: "Tucson",
    anio: 2024,
    tipo: "suv",
    color: "Blanco",
    matricula: "JAL-8642",
    imagen: "/placeholder.svg?height=200&width=400",
    asignado: false,
    fechaCreacion: "2024-02-01",
  },
  {
    id: 10,
    marca: "Kia",
    modelo: "Sportage",
    anio: 2023,
    tipo: "suv",
    color: "Rojo",
    matricula: "JAL-7531",
    imagen: "/placeholder.svg?height=200&width=400",
    asignado: false,
    fechaCreacion: "2024-02-03",
  },
  {
    id: 11,
    marca: "Chevrolet",
    modelo: "Silverado",
    anio: 2022,
    tipo: "pickup",
    color: "Negro",
    matricula: "JAL-9514",
    imagen: "/placeholder.svg?height=200&width=400",
    asignado: false,
    fechaCreacion: "2024-02-05",
  },
  {
    id: 12,
    marca: "Mazda",
    modelo: "CX-5",
    anio: 2024,
    tipo: "suv",
    color: "Gris",
    matricula: "JAL-7428",
    imagen: "/placeholder.svg?height=200&width=400",
    asignado: false,
    fechaCreacion: "2024-02-08",
  },
  {
    id: 13,
    marca: "Subaru",
    modelo: "Outback",
    anio: 2023,
    tipo: "suv",
    color: "Verde",
    matricula: "JAL-8520",
    imagen: "/placeholder.svg?height=200&width=400",
    asignado: false,
    fechaCreacion: "2024-02-10",
  },
  {
    id: 14,
    marca: "Peugeot",
    modelo: "308",
    anio: 2023,
    tipo: "hatchback",
    color: "Azul",
    matricula: "JAL-9630",
    imagen: "/placeholder.svg?height=200&width=400",
    asignado: false,
    fechaCreacion: "2024-02-12",
  },
  {
    id: 15,
    marca: "Renault",
    modelo: "Megane",
    anio: 2022,
    tipo: "hatchback",
    color: "Blanco",
    matricula: "JAL-7410",
    imagen: "/placeholder.svg?height=200&width=400",
    asignado: false,
    fechaCreacion: "2024-02-15",
  },
  {
    id: 16,
    marca: "SEAT",
    modelo: "León",
    anio: 2024,
    tipo: "hatchback",
    color: "Rojo",
    matricula: "JAL-8520",
    imagen: "/placeholder.svg?height=200&width=400",
    asignado: false,
    fechaCreacion: "2024-02-18",
  },
  {
    id: 17,
    marca: "Skoda",
    modelo: "Octavia",
    anio: 2023,
    tipo: "sedan",
    color: "Gris",
    matricula: "JAL-9630",
    imagen: "/placeholder.svg?height=200&width=400",
    asignado: false,
    fechaCreacion: "2024-02-20",
  },
  {
    id: 18,
    marca: "Volvo",
    modelo: "XC60",
    anio: 2024,
    tipo: "suv",
    color: "Negro",
    matricula: "JAL-7410",
    imagen: "/placeholder.svg?height=200&width=400",
    asignado: false,
    fechaCreacion: "2024-02-22",
  },
  {
    id: 19,
    marca: "Lexus",
    modelo: "ES",
    anio: 2023,
    tipo: "sedan",
    color: "Blanco",
    matricula: "JAL-8520",
    imagen: "/placeholder.svg?height=200&width=400",
    asignado: false,
    fechaCreacion: "2024-02-25",
  },
  {
    id: 20,
    marca: "Infiniti",
    modelo: "Q50",
    anio: 2022,
    tipo: "sedan",
    color: "Azul",
    matricula: "JAL-9630",
    imagen: "/placeholder.svg?height=200&width=400",
    asignado: false,
    fechaCreacion: "2024-02-28",
  },
  {
    id: 21,
    marca: "Acura",
    modelo: "TLX",
    anio: 2024,
    tipo: "sedan",
    color: "Gris",
    matricula: "JAL-7410",
    imagen: "/placeholder.svg?height=200&width=400",
    asignado: false,
    fechaCreacion: "2024-03-01",
  },
  {
    id: 22,
    marca: "Cadillac",
    modelo: "XT5",
    anio: 2023,
    tipo: "suv",
    color: "Negro",
    matricula: "JAL-8520",
    imagen: "/placeholder.svg?height=200&width=400",
    asignado: false,
    fechaCreacion: "2024-03-03",
  },
  {
    id: 23,
    marca: "Lincoln",
    modelo: "Navigator",
    anio: 2024,
    tipo: "suv",
    color: "Blanco",
    matricula: "JAL-9630",
    imagen: "/placeholder.svg?height=200&width=400",
    asignado: false,
    fechaCreacion: "2024-03-05",
  },
  {
    id: 24,
    marca: "Porsche",
    modelo: "911",
    anio: 2023,
    tipo: "deportivo",
    color: "Rojo",
    matricula: "JAL-7410",
    imagen: "/placeholder.svg?height=200&width=400",
    asignado: false,
    fechaCreacion: "2024-03-08",
  },
  {
    id: 25,
    marca: "Ferrari",
    modelo: "F8 Tributo",
    anio: 2024,
    tipo: "deportivo",
    color: "Rojo",
    matricula: "JAL-8520",
    imagen: "/placeholder.svg?height=200&width=400",
    asignado: false,
    fechaCreacion: "2024-03-10",
  },
]

// Asignaciones activas
export const asignacionesData: Asignacion[] = [
  {
    id: 1,
    usuarioId: 3,
    vehiculoId: 1,
    fechaInicio: "2024-01-15",
    notas: "Asignación para trabajo de campo",
    activa: true,
  },
  {
    id: 2,
    usuarioId: 4,
    vehiculoId: 2,
    fechaInicio: "2024-01-20",
    notas: "Vehículo para transporte de materiales",
    activa: true,
  },
  {
    id: 3,
    usuarioId: 5,
    vehiculoId: 4,
    fechaInicio: "2024-02-01",
    notas: "Asignación temporal por 6 meses",
    activa: true,
  },
  {
    id: 4,
    usuarioId: 6,
    vehiculoId: 6,
    fechaInicio: "2024-02-15",
    notas: "Vehículo ejecutivo para reuniones",
    activa: true,
  },
]

// Coordenadas de Guadalajara, Jalisco
export const GUADALAJARA_CENTER = {
  lat: 20.659698,
  lng: -103.349609,
}
