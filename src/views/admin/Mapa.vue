<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold text-gray-900">🗺️ Mapa GPS - Guadalajara, Jalisco</h1>
      <button
        @click="actualizarUbicaciones"
        class="btn-primary"
      >
        🔄 Actualizar Ubicaciones
      </button>
    </div>

    <!-- Mapa -->
    <div class="bg-white rounded-lg shadow p-6">
      <div id="mapa" class="leaflet-container"></div>
    </div>

    <!-- Lista de vehículos -->
    <div class="bg-white rounded-lg shadow p-6">
      <h2 class="text-xl font-semibold text-gray-900 mb-4">📍 Ubicaciones de Vehículos</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div v-for="vehiculo in vehiculos" :key="vehiculo.id" class="border rounded-lg p-4">
          <h3 class="font-semibold">{{ vehiculo.marca }} {{ vehiculo.modelo }}</h3>
          <p class="text-sm text-gray-600">Matrícula: {{ vehiculo.matricula }}</p>
          <p class="text-sm text-gray-600">Lat: {{ vehiculo.latitud?.toFixed(4) }}</p>
          <p class="text-sm text-gray-600">Lng: {{ vehiculo.longitud?.toFixed(4) }}</p>
          <span class="px-2 py-1 text-xs font-medium rounded-full"
                :class="{
                  'bg-green-100 text-green-800': vehiculo.estado === 'disponible',
                  'bg-yellow-100 text-yellow-800': vehiculo.estado === 'asignado'
                }">
            {{ vehiculo.estado === 'disponible' ? '✅ Disponible' : '📋 Asignado' }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from "vue"
import { useToast } from "vue-toastification"
import L from "leaflet"

const toast = useToast()
const vehiculos = ref([])
let mapa = null
let marcadores = []

const inicializarMapa = async () => {
  await nextTick()
  
  // Crear mapa centrado en Guadalajara, Jalisco
  mapa = L.map('mapa').setView([20.6597, -103.3496], 12)

  // Agregar capa de OpenStreetMap
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(mapa)

  // Agregar marcadores de vehículos
  actualizarMarcadores()
}

const actualizarMarcadores = () => {
  // Limpiar marcadores existentes
  marcadores.forEach(marcador => mapa.removeLayer(marcador))
  marcadores = []

  // Agregar nuevos marcadores
  vehiculos.value.forEach(vehiculo => {
    if (vehiculo.latitud && vehiculo.longitud) {
      const icono = vehiculo.estado === 'disponible' ? '🟢' : '🟡'
      
      const marcador = L.marker([vehiculo.latitud, vehiculo.longitud])
        .addTo(mapa)
        .bindPopup(`
          <div>
            <h3><strong>${vehiculo.marca} ${vehiculo.modelo}</strong></h3>
            <p>Matrícula: ${vehiculo.matricula}</p>
            <p>Estado: ${vehiculo.estado}</p>
            <p>Tipo: ${vehiculo.tipo}</p>
            <p>Color: ${vehiculo.color}</p>
            ${vehiculo.usuarioAsignado ? `<p>Asignado a: ${vehiculo.usuarioAsignado}</p>` : ''}
          </div>
        `)

      marcadores.push(marcador)
    }
  })
}

const actualizarUbicaciones = () => {
  // Simular actualización de ubicaciones GPS
  vehiculos.value.forEach(vehiculo => {
    if (vehiculo.latitud && vehiculo.longitud) {
      // Pequeña variación en la ubicación
      vehiculo.latitud += (Math.random() - 0.5) * 0.001
      vehiculo.longitud += (Math.random() - 0.5) * 0.001
    }
  })

  // Guardar en localStorage
  localStorage.setItem("vehiculos", JSON.stringify(vehiculos.value))
  
  // Actualizar marcadores en el mapa
  actualizarMarcadores()
  
  toast.success("🔄 Ubicaciones actualizadas")
}

onMounted(() => {
  // Cargar vehículos desde localStorage
  const vehiculosGuardados = JSON.parse(localStorage.getItem("vehiculos") || "[]")
  vehiculos.value = vehiculosGuardados

  // Inicializar mapa
  inicializarMapa()

  // Actualizar ubicaciones cada 30 segundos
  setInterval(actualizarUbicaciones, 30000)
})
</script>
