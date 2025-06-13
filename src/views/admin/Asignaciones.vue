<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold text-gray-900">📋 Gestión de Asignaciones</h1>
    </div>

    <!-- Formulario para crear asignación -->
    <div class="bg-white rounded-lg shadow p-6">
      <h2 class="text-xl font-semibold text-gray-900 mb-4">➕ Nueva Asignación</h2>
      <form @submit.prevent="crearAsignacion" class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Usuario *</label>
          <select v-model="nuevaAsignacion.usuarioId" required class="form-input">
            <option value="">Seleccionar usuario</option>
            <option v-for="usuario in usuariosDisponibles" :key="usuario.email" :value="usuario.email">
              {{ usuario.nombre }} {{ usuario.apellido }} ({{ usuario.email }})
            </option>
          </select>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Vehículo *</label>
          <select v-model="nuevaAsignacion.vehiculoId" required class="form-input">
            <option value="">Seleccionar vehículo</option>
            <option v-for="vehiculo in vehiculosDisponibles" :key="vehiculo.id" :value="vehiculo.id">
              {{ vehiculo.marca }} {{ vehiculo.modelo }} - {{ vehiculo.matricula }}
            </option>
          </select>
        </div>
        
        <div class="md:col-span-2">
          <button type="submit" class="btn-primary">✅ Crear Asignación</button>
        </div>
      </form>
    </div>

    <!-- Lista de asignaciones -->
    <div class="bg-white rounded-lg shadow">
      <div class="px-6 py-4 border-b border-gray-200">
        <h2 class="text-xl font-semibold text-gray-900">📋 Asignaciones Activas</h2>
      </div>
      <div class="p-6">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Usuario</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vehículo</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha Asignación</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="asignacion in asignaciones" :key="asignacion.id">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-medium text-gray-900">{{ asignacion.usuario?.nombre }} {{ asignacion.usuario?.apellido }}</div>
                  <div class="text-sm text-gray-500">{{ asignacion.usuario?.email }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-medium text-gray-900">{{ asignacion.vehiculo?.marca }} {{ asignacion.vehiculo?.modelo }}</div>
                  <div class="text-sm text-gray-500">{{ asignacion.vehiculo?.matricula }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ formatearFecha(asignacion.fechaAsignacion) }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Activa
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    @click="finalizarAsignacion(asignacion.id)"
                    class="text-red-600 hover:text-red-900"
                  >
                    🔚 Finalizar
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue"
import { useToast } from "vue-toastification"

const toast = useToast()

const nuevaAsignacion = ref({
  usuarioId: "",
  vehiculoId: "",
})

const asignaciones = ref([])
const usuarios = ref([])
const vehiculos = ref([])

const usuariosDisponibles = computed(() => {
  return usuarios.value.filter(u => u.rol === 'usuario')
})

const vehiculosDisponibles = computed(() => {
  return vehiculos.value.filter(v => v.estado === 'disponible')
})

const crearAsignacion = () => {
  const usuario = usuarios.value.find(u => u.email === nuevaAsignacion.value.usuarioId)
  const vehiculo = vehiculos.value.find(v => v.id == nuevaAsignacion.value.vehiculoId)

  if (!usuario || !vehiculo) {
    toast.error("❌ Error al crear la asignación")
    return
  }

  const asignacion = {
    id: Date.now(),
    usuarioId: usuario.email,
    vehiculoId: vehiculo.id,
    usuario: usuario,
    vehiculo: vehiculo,
    fechaAsignacion: new Date().toISOString(),
    activa: true,
  }

  // Actualizar estado del vehículo
  vehiculo.estado = 'asignado'
  vehiculo.usuarioAsignado = usuario.nombre + ' ' + usuario.apellido

  asignaciones.value.push(asignacion)
  
  // Guardar en localStorage
  localStorage.setItem("asignaciones", JSON.stringify(asignaciones.value))
  localStorage.setItem("vehiculos", JSON.stringify(vehiculos.value))

  // Limpiar formulario
  nuevaAsignacion.value = {
    usuarioId: "",
    vehiculoId: "",
  }

  toast.success("✅ Asignación creada correctamente")
}

const finalizarAsignacion = (id) => {
  if (confirm("¿Estás seguro de finalizar esta asignación?")) {
    const asignacion = asignaciones.value.find(a => a.id === id)
    if (asignacion) {
      // Actualizar estado del vehículo
      const vehiculo = vehiculos.value.find(v => v.id === asignacion.vehiculoId)
      if (vehiculo) {
        vehiculo.estado = 'disponible'
        vehiculo.usuarioAsignado = null
      }

      // Remover asignación
      asignaciones.value = asignaciones.value.filter(a => a.id !== id)
      
      // Guardar en localStorage
      localStorage.setItem("asignaciones", JSON.stringify(asignaciones.value))
      localStorage.setItem("vehiculos", JSON.stringify(vehiculos.value))

      toast.success("✅ Asignación finalizada correctamente")
    }
  }
}

const formatearFecha = (fecha) => {
  return new Date(fecha).toLocaleDateString('es-ES')
}

onMounted(() => {
  // Cargar datos desde localStorage
  const asignacionesGuardadas = JSON.parse(localStorage.getItem("asignaciones") || "[]")
  const usuariosGuardados = JSON.parse(localStorage.getItem("usuarios") || "[]")
  const vehiculosGuardados = JSON.parse(localStorage.getItem("vehiculos") || "[]")

  asignaciones.value = asignacionesGuardadas
  usuarios.value = usuariosGuardados
  vehiculos.value = vehiculosGuardados

  // Agregar usuarios de demostración
  const usuariosDemostracion = [
    { nombre: "Usuario", apellido: "Demo", email: "usuario@gmail.com", rol: "usuario" },
  ]
  usuarios.value = [...usuariosDemostracion, ...usuariosGuardados]
})
</script>
