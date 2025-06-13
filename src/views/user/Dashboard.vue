<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold text-gray-900">📊 Mi Dashboard</h1>
      <div class="flex items-center space-x-2">
        <span class="text-sm text-gray-500">{{ fechaActual }}</span>
      </div>
    </div>

    <!-- Estadísticas del usuario -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="p-2 bg-green-100 rounded-lg">
            <span class="text-2xl">🚗</span>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Mis Vehículos</p>
            <p class="text-2xl font-bold text-gray-900">{{ misVehiculos.length }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="p-2 bg-blue-100 rounded-lg">
            <span class="text-2xl">📍</span>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Ubicaciones Activas</p>
            <p class="text-2xl font-bold text-gray-900">{{ misVehiculos.length }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="p-2 bg-purple-100 rounded-lg">
            <span class="text-2xl">⏰</span>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Última Actualización</p>
            <p class="text-sm font-bold text-gray-900">{{ ultimaActualizacion }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Mis vehículos asignados -->
    <div class="bg-white rounded-lg shadow p-6">
      <h2 class="text-xl font-semibold text-gray-900 mb-4">🚗 Mis Vehículos Asignados</h2>
      <div v-if="misVehiculos.length === 0" class="text-center py-8">
        <span class="text-4xl">🚫</span>
        <p class="text-gray-500 mt-2">No tienes vehículos asignados</p>
      </div>
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="vehiculo in misVehiculos" :key="vehiculo.id" class="border rounded-lg p-4">
          <div class="aspect-w-16 aspect-h-9 mb-4">
            <img 
              :src="vehiculo.imagen || '/placeholder.svg?height=200&width=300'" 
              :alt="vehiculo.marca + ' ' + vehiculo.modelo"
              class="w-full h-32 object-cover rounded-lg"
            />
          </div>
          <div class="space-y-2">
            <h3 class="text-lg font-semibold">{{ vehiculo.marca }} {{ vehiculo.modelo }}</h3>
            <p class="text-sm text-gray-600">Año: {{ vehiculo.ano }}</p>
            <p class="text-sm text-gray-600">Matrícula: {{ vehiculo.matricula }}</p>
            <p class="text-sm text-gray-600">Tipo: {{ vehiculo.tipo }}</p>
            <p class="text-sm text-gray-600">Color: {{ vehiculo.color }}</p>
            <span class="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
              📋 Asignado a mí
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Acciones rápidas -->
    <div class="bg-white rounded-lg shadow p-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">🚀 Acciones Rápidas</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <router-link
          to="/user/mapa"
          class="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
        >
          <span class="text-2xl mr-3">🗺️</span>
          <div>
            <p class="font-medium text-gray-900">Ver Mapa GPS</p>
            <p class="text-sm text-gray-500">Ubicación de mis vehículos</p>
          </div>
        </router-link>

        <router-link
          to="/user/perfil"
          class="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
        >
          <span class="text-2xl mr-3">👤</span>
          <div>
            <p class="font-medium text-gray-900">Mi Perfil</p>
            <p class="text-sm text-gray-500">Actualizar información</p>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue"
import { useAuthStore } from "@/stores/auth"

const authStore = useAuthStore()
const misVehiculos = ref([])

const fechaActual = computed(() => {
  return new Date().toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
})

const ultimaActualizacion = computed(() => {
  return new Date().toLocaleTimeString('es-ES')
})

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
