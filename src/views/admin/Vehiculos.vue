<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold text-gray-900">🚗 Gestión de Vehículos</h1>
    </div>

    <!-- Formulario para crear vehículo -->
    <div class="bg-white rounded-lg shadow p-6">
      <h2 class="text-xl font-semibold text-gray-900 mb-4">➕ Agregar Nuevo Vehículo</h2>
      <form @submit.prevent="crearVehiculo" class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Marca *</label>
          <select v-model="nuevoVehiculo.marca" required class="form-input">
            <option value="">Seleccionar marca</option>
            <option value="Toyota">Toyota</option>
            <option value="Honda">Honda</option>
            <option value="Ford">Ford</option>
            <option value="Chevrolet">Chevrolet</option>
            <option value="Nissan">Nissan</option>
            <option value="Volkswagen">Volkswagen</option>
            <option value="BMW">BMW</option>
            <option value="Mercedes-Benz">Mercedes-Benz</option>
          </select>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Modelo *</label>
          <input v-model="nuevoVehiculo.modelo" type="text" required class="form-input" placeholder="Modelo" />
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Año * (hasta 2025)</label>
          <input v-model="nuevoVehiculo.ano" type="number" min="1990" max="2025" required class="form-input" placeholder="2024" />
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Matrícula *</label>
          <input v-model="nuevoVehiculo.matricula" type="text" required class="form-input" placeholder="ABC-123" />
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Tipo *</label>
          <select v-model="nuevoVehiculo.tipo" required class="form-input">
            <option value="">Seleccionar tipo</option>
            <option value="Sedan">Sedan</option>
            <option value="SUV">SUV</option>
            <option value="Pickup">Pickup</option>
            <option value="Hatchback">Hatchback</option>
            <option value="Coupe">Coupe</option>
            <option value="Convertible">Convertible</option>
            <option value="Van">Van</option>
            <option value="Camion">Camion</option>
          </select>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Color *</label>
          <input v-model="nuevoVehiculo.color" type="text" required class="form-input" placeholder="Color" />
        </div>
        
        <div class="md:col-span-3">
          <label class="block text-sm font-medium text-gray-700 mb-1">Imagen del Vehículo</label>
          <input @change="manejarImagen" type="file" accept="image/*" class="form-input" />
        </div>
        
        <div class="md:col-span-3">
          <button type="submit" class="btn-primary">✅ Agregar Vehículo</button>
        </div>
      </form>
    </div>

    <!-- Lista de vehículos -->
    <div class="bg-white rounded-lg shadow">
      <div class="px-6 py-4 border-b border-gray-200">
        <h2 class="text-xl font-semibold text-gray-900">📋 Catálogo de Vehículos</h2>
      </div>
      <div class="p-6">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="vehiculo in vehiculos" :key="vehiculo.id" class="border rounded-lg p-4 hover:shadow-lg transition-shadow">
            <div class="aspect-w-16 aspect-h-9 mb-4">
              <img 
                :src="vehiculo.imagen || '/placeholder.svg?height=200&width=300'" 
                :alt="vehiculo.marca + ' ' + vehiculo.modelo"
                class="w-full h-48 object-cover rounded-lg"
              />
            </div>
            <div class="space-y-2">
              <h3 class="text-lg font-semibold">{{ vehiculo.marca }} {{ vehiculo.modelo }}</h3>
              <p class="text-sm text-gray-600">Año: {{ vehiculo.ano }}</p>
              <p class="text-sm text-gray-600">Matrícula: {{ vehiculo.matricula }}</p>
              <p class="text-sm text-gray-600">Tipo: {{ vehiculo.tipo }}</p>
              <p class="text-sm text-gray-600">Color: {{ vehiculo.color }}</p>
              <div class="flex items-center justify-between">
                <span class="px-2 py-1 text-xs font-medium rounded-full"
                      :class="{
                        'bg-green-100 text-green-800': vehiculo.estado === 'disponible',
                        'bg-yellow-100 text-yellow-800': vehiculo.estado === 'asignado'
                      }">
                  {{ vehiculo.estado === 'disponible' ? '✅ Disponible' : '📋 Asignado' }}
                </span>
                <button
                  v-if="authStore.isAdminGlobal"
                  @click="eliminarVehiculo(vehiculo.id)"
                  class="text-red-600 hover:text-red-900 text-sm"
                >
                  🗑️ Eliminar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { useAuthStore } from "@/stores/auth"
import { useToast } from "vue-toastification"

const authStore = useAuthStore()
const toast = useToast()

const nuevoVehiculo = ref({
  marca: "",
  modelo: "",
  ano: "",
  matricula: "",
  tipo: "",
  color: "",
  imagen: null,
})

const vehiculos = ref([])

// Vehículos de ejemplo
const vehiculosEjemplo = [
  { id: 1, marca: "Toyota", modelo: "Corolla", ano: 2023, matricula: "ABC-001", tipo: "Sedan", color: "Blanco", estado: "disponible", imagen: "/placeholder.svg?height=200&width=300" },
  { id: 2, marca: "Honda", modelo: "Civic", ano: 2022, matricula: "ABC-002", tipo: "Sedan", color: "Negro", estado: "disponible", imagen: "/placeholder.svg?height=200&width=300" },
  { id: 3, marca: "Ford", modelo: "F-150", ano: 2024, matricula: "ABC-003", tipo: "Pickup", color: "Azul", estado: "asignado", imagen: "/placeholder.svg?height=200&width=300" },
  { id: 4, marca: "Chevrolet", modelo: "Tahoe", ano: 2023, matricula: "ABC-004", tipo: "SUV", color: "Gris", estado: "disponible", imagen: "/placeholder.svg?height=200&width=300" },
  { id: 5, marca: "Nissan", modelo: "Sentra", ano: 2022, matricula: "ABC-005", tipo: "Sedan", color: "Rojo", estado: "disponible", imagen: "/placeholder.svg?height=200&width=300" },
]

const manejarImagen = (event) => {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      nuevoVehiculo.value.imagen = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

const crearVehiculo = () => {
  // Validar año
  if (nuevoVehiculo.value.ano > 2025) {
    toast.error("❌ El año no puede ser mayor a 2025")
    return
  }

  // Validar matrícula única
  const matriculas = vehiculos.value.map(v => v.matricula)
  if (matriculas.includes(nuevoVehiculo.value.matricula)) {
    toast.error("❌ Ya existe un vehículo con esta matrícula")
    return
  }

  // Crear vehículo
  const vehiculo = {
    ...nuevoVehiculo.value,
    id: Date.now(),
    estado: "disponible",
    latitud: 20.6597 + (Math.random() - 0.5) * 0.1, // Guadalajara con variación
    longitud: -103.3496 + (Math.random() - 0.5) * 0.1,
  }

  vehiculos.value.push(vehiculo)
  localStorage.setItem("vehiculos", JSON.stringify(vehiculos.value))

  // Limpiar formulario
  nuevoVehiculo.value = {
    marca: "",
    modelo: "",
    ano: "",
    matricula: "",
    tipo: "",
    color: "",
    imagen: null,
  }

  toast.success("✅ Vehículo agregado correctamente")
}

const eliminarVehiculo = (id) => {
  if (confirm("¿Estás seguro de eliminar este vehículo?")) {
    vehiculos.value = vehiculos.value.filter(v => v.id !== id)
    localStorage.setItem("vehiculos", JSON.stringify(vehiculos.value))
    toast.success("✅ Vehículo eliminado correctamente")
  }
}

onMounted(() => {
  const vehiculosGuardados = JSON.parse(localStorage.getItem("vehiculos") || "[]")
  if (vehiculosGuardados.length === 0) {
    // Si no hay vehículos guardados, usar los de ejemplo
    vehiculos.value = vehiculosEjemplo
    localStorage.setItem("vehiculos", JSON.stringify(vehiculosEjemplo))
  } else {
    vehiculos.value = vehiculosGuardados
  }
})
</script>
