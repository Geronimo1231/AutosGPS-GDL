<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold text-gray-900">👥 Gestión de Usuarios</h1>
    </div>

    <!-- Formulario para crear usuario -->
    <div class="bg-white rounded-lg shadow p-6">
      <h2 class="text-xl font-semibold text-gray-900 mb-4">➕ Crear Nuevo Usuario</h2>
      <form @submit.prevent="crearUsuario" class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Nombre *</label>
          <input
            v-model="nuevoUsuario.nombre"
            type="text"
            required
            class="form-input"
            placeholder="Nombre"
          />
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Apellido *</label>
          <input
            v-model="nuevoUsuario.apellido"
            type="text"
            required
            class="form-input"
            placeholder="Apellido"
          />
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Email * (@gmail.com)</label>
          <input
            v-model="nuevoUsuario.email"
            type="email"
            required
            class="form-input"
            placeholder="usuario@gmail.com"
          />
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Teléfono * (10 dígitos)</label>
          <input
            v-model="nuevoUsuario.telefono"
            type="tel"
            required
            maxlength="10"
            class="form-input"
            placeholder="3312345678"
          />
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Contraseña *</label>
          <input
            v-model="nuevoUsuario.password"
            type="password"
            required
            class="form-input"
            placeholder="Mín. 8 caracteres, mayús, minús, número, especial"
          />
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Rol *</label>
          <select
            v-model="nuevoUsuario.rol"
            required
            class="form-input"
          >
            <option value="">Seleccionar rol</option>
            <option value="usuario">Usuario</option>
            <option value="admin" v-if="authStore.isAdminGlobal">Admin</option>
          </select>
        </div>
        
        <div class="md:col-span-2">
          <button
            type="submit"
            class="btn-primary"
          >
            ✅ Crear Usuario
          </button>
        </div>
      </form>
    </div>

    <!-- Lista de usuarios -->
    <div class="bg-white rounded-lg shadow">
      <div class="px-6 py-4 border-b border-gray-200">
        <h2 class="text-xl font-semibold text-gray-900">📋 Lista de Usuarios</h2>
      </div>
      <div class="p-6">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Usuario</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Teléfono</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rol</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="usuario in todosLosUsuarios" :key="usuario.email">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-medium text-gray-900">{{ usuario.nombre }} {{ usuario.apellido }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ usuario.email }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ usuario.telefono }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                        :class="{
                          'bg-red-100 text-red-800': usuario.rol === 'admin_global',
                          'bg-blue-100 text-blue-800': usuario.rol === 'admin',
                          'bg-green-100 text-green-800': usuario.rol === 'usuario'
                        }">
                    {{ usuario.rol === 'admin_global' ? 'Admin Global' : usuario.rol === 'admin' ? 'Admin' : 'Usuario' }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    v-if="authStore.isAdminGlobal && !usuario.esDemo"
                    @click="eliminarUsuario(usuario.email)"
                    class="text-red-600 hover:text-red-900"
                  >
                    🗑️ Eliminar
                  </button>
                  <span v-else class="text-gray-400">Demo</span>
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
import { useAuthStore } from "@/stores/auth"
import { useToast } from "vue-toastification"

const authStore = useAuthStore()
const toast = useToast()

const nuevoUsuario = ref({
  nombre: "",
  apellido: "",
  email: "",
  telefono: "",
  password: "",
  rol: "",
})

const usuarios = ref([])

// Usuarios de demostración (no se pueden eliminar)
const usuariosDemostracion = [
  {
    nombre: "Administrador",
    apellido: "Global",
    email: "admin.global@gmail.com",
    telefono: "3312345678",
    rol: "admin_global",
    esDemo: true,
  },
  {
    nombre: "Administrador",
    apellido: "Normal",
    email: "admin@gmail.com",
    telefono: "3312345679",
    rol: "admin",
    esDemo: true,
  },
  {
    nombre: "Usuario",
    apellido: "Demo",
    email: "usuario@gmail.com",
    telefono: "3312345680",
    rol: "usuario",
    esDemo: true,
  },
]

const todosLosUsuarios = computed(() => {
  return [...usuariosDemostracion, ...usuarios.value]
})

const crearUsuario = () => {
  // ✅ Validar email formato
  if (!authStore.validarEmail(nuevoUsuario.value.email)) {
    toast.error("❌ El email debe tener formato @gmail.com")
    return
  }

  // ✅ Validar email único
  const todosEmails = todosLosUsuarios.value.map(u => u.email)
  if (todosEmails.includes(nuevoUsuario.value.email)) {
    toast.error("❌ Ya existe un usuario con este email")
    return
  }

  // ✅ Validar teléfono
  if (!authStore.validarTelefono(nuevoUsuario.value.telefono)) {
    toast.error("❌ El teléfono debe tener exactamente 10 dígitos")
    return
  }

  // ✅ Validar contraseña
  if (!authStore.validarContrasena(nuevoUsuario.value.password)) {
    toast.error("❌ La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial")
    return
  }

  // Crear usuario
  const usuario = {
    ...nuevoUsuario.value,
    id: Date.now(),
    esDemo: false,
  }

  usuarios.value.push(usuario)
  localStorage.setItem("usuarios", JSON.stringify(usuarios.value))

  // Limpiar formulario
  nuevoUsuario.value = {
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    password: "",
    rol: "",
  }

  toast.success("✅ Usuario creado correctamente")
}

const eliminarUsuario = (email) => {
  if (confirm("¿Estás seguro de eliminar este usuario?")) {
    usuarios.value = usuarios.value.filter(u => u.email !== email)
    localStorage.setItem("usuarios", JSON.stringify(usuarios.value))
    toast.success("✅ Usuario eliminado correctamente")
  }
}

onMounted(() => {
  const usuariosGuardados = JSON.parse(localStorage.getItem("usuarios") || "[]")
  usuarios.value = usuariosGuardados
})
</script>
