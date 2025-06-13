<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold text-gray-900">🚗 Mis Vehículos</h1>
    </div>

    <!-- Mis vehículos asignados -->
    <div class="bg-white rounded-lg shadow p-6">
      <h2 class="text-xl font-semibold text-gray-900 mb-4">📋 Vehículos Asignados</h2>
      <div v-if="misVehiculos.length === 0" class="text-center py-12">
        <span class="text-6xl">🚫</span>
        <h3 class="text-xl font-medium text-gray-900 mt-4">No tienes vehículos asignados</h3>
        <p class="text-gray-500 mt-2">Contacta al administrador para solicitar la asignación de un vehículo</p>
      </div>
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="vehiculo in misVehiculos" :key="vehiculo.id" class="border rounded-lg p-4 hover:shadow-lg transition-shadow">
          <div class="aspect-w-16 aspect-h-9 mb-4">
            <img 
              :src="vehiculo.imagen || '/placeholder.svg?height=200&width=300'" 
              :alt="vehiculo.marca + ' ' + vehiculo.modelo"
              class="w-full h-48 object-cover rounded-lg"
            />
          </div>
          <div class="space-y-2">
            <h3 class="text-lg font-semibold">{{ vehiculo.marca }} {{ vehiculo.modelo }}</h3>
            <p class="text-sm text-gray-600">📅 Año: {{ vehiculo.ano }}</p>
            <p class="text-sm text-gray-600">🔢 Matrícula: {{ vehiculo.matricula }}</p>
            <p class="text-sm text-gray-600">🚙 Tipo: {{ vehiculo.tipo }}</p>
            <p class="text-sm text-gray-600">🎨 Color: {{ vehiculo.color }}</p>
            <div class="flex items-center justify-between">
              <span class="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
                📋 Asignado a mí
              </span>
              <div class="text-xs text-gray-500">
                📍 Lat: {{ vehiculo.latitud?.toFixed(4) }}<br>
                📍 Lng: {{ vehiculo.longitud?.toFixed(4) }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Información adicional -->
    <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
      <div class="flex">
        <div class="flex-shrink-0">
          <span class="text-2xl">ℹ️</span>
        </div>
        <div class="ml-3">
          <h3 class="text-sm font-medium text-blue-800">Información</h3>
          <div class="mt-2 text-sm text-blue-700">
            <p>• Puedes ver la ubicación en tiempo real de tus vehículos en el mapa GPS</p>
            <p>• Los vehículos se actualizan automáticamente cada 30 segundos</p>
            <p>• Para solicitar cambios en las asignaciones, contacta al administrador</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { useAuthStore } from "@/stores/auth"

const authStore = useAuthStore()
const misVehiculos = ref([])

onMounted(() => {
  // Cargar vehículos asignados al usuario actual
  const vehiculos = JSON.parse(localStorage.getItem("vehiculos") || "[]")
  const asignaciones = JSON.parse(localStorage.getItem("asignaciones") || "[]")
  
  // Filtrar vehículos asignados al usuario actual
  const asignacionesUsuario = asignaciones.filter(a => 
    a.usuarioId === authStore.user?.email && a.activa
  )
  
  misVehiculos.value = vehiculos.filter(v => 
    asignacionesUsuario.some(a => a.vehiculoId === v.id)
  )
})
</script>
