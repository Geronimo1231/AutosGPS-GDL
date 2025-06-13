<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold text-gray-900">📊 Dashboard Administrativo</h1>
      <div class="flex items-center space-x-2">
        <span class="text-sm text-gray-500">{{ fechaActual }}</span>
      </div>
    </div>

    <!-- Estadísticas principales -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="p-2 bg-blue-100 rounded-lg">
            <span class="text-2xl">🚗</span>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Total Vehículos</p>
            <p class="text-2xl font-bold text-gray-900">{{ estadisticas.totalVehiculos }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="p-2 bg-green-100 rounded-lg">
            <span class="text-2xl">✅</span>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Disponibles</p>
            <p class="text-2xl font-bold text-gray-900">{{ estadisticas.vehiculosDisponibles }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="p-2 bg-yellow-100 rounded-lg">
            <span class="text-2xl">📋</span>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Asignados</p>
            <p class="text-2xl font-bold text-gray-900">{{ estadisticas.vehiculosAsignados }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="p-2 bg-purple-100 rounded-lg">
            <span class="text-2xl">👥</span>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Total Usuarios</p>
            <p class="text-2xl font-bold text-gray-900">{{ estadisticas.totalUsuarios }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Acciones rápidas -->
    <div class="bg-white rounded-lg shadow p-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">🚀 Acciones Rápidas</h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <router-link
          to="/admin/vehiculos"
          class="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
        >
          <span class="text-2xl mr-3">🚗</span>
          <div>
            <p class="font-medium text-gray-900">Agregar Vehículo</p>
            <p class="text-sm text-gray-500">Añadir nuevo vehículo</p>
          </div>
        </router-link>

        <router-link
          to="/admin/usuarios"
          class="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
        >
          <span class="text-2xl mr-3">👤</span>
          <div>
            <p class="font-medium text-gray-900">Agregar Usuario</p>
            <p class="text-sm text-gray-500">Crear nuevo usuario</p>
          </div>
        </router-link>

        <router-link
          to="/admin/asignaciones"
          class="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
        >
          <span class="text-2xl mr-3">📋</span>
          <div>
            <p class="font-medium text-gray-900">Nueva Asignación</p>
            <p class="text-sm text-gray-500">Asignar vehículo</p>
          </div>
        </router-link>

         <router-link
          to="/admin/registrarview"
          class="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
        >
          <span class="text-2xl mr-3">📋</span>
          <div>
            <p class="font-medium text-gray-900">Nueva Usuario</p>
            <p class="text-sm text-gray-500">Asignar nuevo usuario</p>
          </div>
        </router-link>
      </div>
    </div>

    <!-- Botón Reset -->
    <div class="bg-red-50 border border-red-200 rounded-lg p-4">
      <div class="flex items-center justify-between">
        <div>
          <h3 class="text-lg font-medium text-red-800">🗑️ Resetear Datos</h3>
          <p class="text-sm text-red-600">Eliminar todos los datos guardados y reiniciar el sistema</p>
        </div>
        <button
          @click="resetearDatos"
          class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          Resetear Todo
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue"
import { useToast } from "vue-toastification"

const toast = useToast()

const estadisticas = ref({
  totalVehiculos: 25,
  vehiculosDisponibles: 18,
  vehiculosAsignados: 7,
  totalUsuarios: 8,
})

const fechaActual = computed(() => {
  return new Date().toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
})

const resetearDatos = () => {
  if (confirm('¿Estás seguro de que quieres resetear todos los datos? Esta acción no se puede deshacer.')) {
    // Limpiar localStorage
    localStorage.clear()
    
    toast.success('Datos reseteados correctamente')
    
    // Recargar la página después de un breve delay
    setTimeout(() => {
      window.location.reload()
    }, 1000)
  }
}

onMounted(() => {
  // Cargar estadísticas desde localStorage si existen
  const vehiculosGuardados = JSON.parse(localStorage.getItem('vehiculos') || '[]')
  const usuariosGuardados = JSON.parse(localStorage.getItem('usuarios') || '[]')
  
  estadisticas.value.totalVehiculos = vehiculosGuardados.length
  estadisticas.value.vehiculosDisponibles = vehiculosGuardados.filter(v => v.estado === 'disponible').length
  estadisticas.value.vehiculosAsignados = vehiculosGuardados.filter(v => v.estado === 'asignado').length
  
  estadisticas.value.totalUsuarios = usuariosGuardados.length + 3 // +3 por los usuarios de demostración
})
</script>
