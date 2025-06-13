<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold text-gray-900">🗺️ Mis Vehículos - GPS</h1>
      <span class="text-sm text-gray-500">Guadalajara, Jalisco</span>
    </div>

    <!-- Mapa -->
    <div class="bg-white rounded-lg shadow p-6">
      <div id="mapa-usuario" class="leaflet-container"></div>
    </div>

    <!-- Lista de mis vehículos -->
    <div class="bg-white rounded-lg shadow p-6">
      <h2 class="text-xl font-semibold text-gray-900 mb-4">📍 Ubicaciones de Mis Vehículos</h2>
      <div v-if="misVehiculos.length === 0" class="text-center py-8">
        <span class="text-4xl">🚫</span>
        <p class="text-gray-500 mt-2">No tienes vehículos asignados para mostrar en el mapa</p>
      </div>
      <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div v-for="vehiculo in misVehiculos" :key="vehiculo.id" class="border rounded-lg p-4">
          <h3 class="font-semibold">{{ vehiculo.marca }} {{ vehiculo.modelo }}</h3>
          <p class="text-sm text-gray-600">Matrícula: {{ vehiculo.matricula }}</p>
          <p class="text-sm text-gray-600">📍 Lat: {{ vehiculo.latitud?.toFixed(4) }}</p>
          <p class="text-sm text-gray-600">📍 Lng: {{ vehiculo.longitud?.toFixed(4) }}</p>
          <p class="text-sm text-gray-600">🕐 Última actualización: {{ ultimaActualizacion }}</p>
          <span class="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
            📋 Mi vehículo
          </span>
        </div>
      </div>
    </div>

    <!-- Información -->
    <div class="bg-green-50 border border-green-200 rounded-lg p-4">
      <div class="flex">
        <div class="flex-shrink-0">
          <span class="text-2xl">🔄</span>
        </div>
        <div class="ml-3">
          <h3 class="text-sm font-medium text-green-800">Actualización Automática</h3>
          <p class="mt-1 text-sm text-green-700">
            Las ubicaciones se actualizan automáticamente cada 30 segundos para mostrarte la posición más reciente de tus vehículos.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick, computed } from "vue"
import { useAuthStore } from "@/stores/auth"
import L from "leaflet"

const authStore = useAuthStore()
const misVehiculos = ref([])
let mapa = null
let marcadores = []

const ultimaActualizacion = computed(() => {
  return new Date().toLocaleTimeString('es-ES')
})

const inicializarMapa = async () => {
  await nextTick()
  
  // Crear mapa centrado en Guadalajara, Jalisco
  mapa = L.map('mapa-usuario').setView([20.6597, -103.3496], 12)

  // Agregar capa de OpenStreetMap
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(mapa)

  // Agregar marcadores de mis vehículos
  actualizarMarcadores()
}

const actualizarMarcadores = () => {
  // Limpiar marcadores existentes
  marcadores.forEach(marcador => mapa.removeLayer(marcador))
  marcadores = []

  // Agregar marcadores solo de mis vehículos
  misVehiculos.value.forEach(vehiculo => {
    if (vehiculo.latitud && vehiculo.longitud) {
      const marcador = L.marker([vehiculo.latitud, vehiculo.longitud])
        .addTo(mapa)
        .bindPopup(`
          <div>
            <h3><strong>🚗 ${vehiculo.marca} ${vehiculo.modelo}</strong></h3>
            <p>📋 Matrícula: ${vehiculo.matricula}</p>
            <p>🚙 Tipo: ${vehiculo.tipo}</p>
            <p>🎨 Color: ${vehiculo.color}</p>
            <p>👤 Asignado a: ${authStore.user?.nombre} ${authStore.user?.apellido}</p>
            <p>🕐 Actualizado: ${ultimaActualizacion.value}</p>
          </div>
        `)

      marcadores.push(marcador)
    }
  })

  // Ajustar vista del mapa para mostrar todos los marcadores
  if (marcadores.length > 0) {
    const grupo = new L.featureGroup(marcadores)
    mapa.fitBounds(grupo.getBounds().pad(0.1))
  }
}

const actualizarUbicaciones = () => {
  // Cargar vehículos actualizados desde localStorage
  const vehiculos = JSON.parse(localStorage.getItem("vehiculos") || "[]")
  const asignaciones = JSON.parse(localStorage.getItem("asignaciones") || "[]")
  
  // Filtrar mis vehículos
  const asignacionesUsuario = asignaciones.filter(a => 
    a.usuarioId === authStore.user?.email && a.activa
  )
  
  misVehiculos.value = vehiculos.filter(v => 
    asignacionesUsuario.some(a => a.vehiculoId === v.id)
  )

  // Actualizar marcadores en el mapa
  if (mapa) {
    actualizarMarcadores()
  }
}

onMounted(() => {
  // Inicializar mapa
  inicializarMapa()

  // Cargar mis vehículos
  actualizarUbicaciones()

  // Actualizar ubicaciones cada 30 segundos
  setInterval(actualizarUbicaciones, 30000)
})
</script>
