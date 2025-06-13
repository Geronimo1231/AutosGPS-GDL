<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold text-gray-900">👤 Mi Perfil</h1>
    </div>

    <!-- Información Personal -->
    <div class="bg-white rounded-lg shadow p-6">
      <h2 class="text-xl font-semibold text-gray-900 mb-4">📝 Información Personal</h2>
      <form @submit.prevent="actualizarPerfil" class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
          <input
            v-model="perfil.nombre"
            type="text"
            required
            class="form-input"
          />
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Apellido</label>
          <input
            v-model="perfil.apellido"
            type="text"
            required
            class="form-input"
          />
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            v-model="perfil.email"
            type="email"
            disabled
            class="form-input bg-gray-100 cursor-not-allowed"
          />
          <p class="text-xs text-gray-500 mt-1">El email no se puede modificar</p>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Teléfono (10 dígitos)</label>
          <input
            v-model="perfil.telefono"
            type="tel"
            maxlength="10"
            class="form-input"
            placeholder="3312345678"
          />
        </div>
        
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">Foto de Perfil</label>
          <input
            @change="manejarFoto"
            type="file"
            accept="image/*"
            class="form-input"
          />
          <div v-if="perfil.foto" class="mt-2">
            <img :src="perfil.foto" alt="Foto de perfil" class="w-20 h-20 rounded-full object-cover" />
          </div>
        </div>
        
        <div class="md:col-span-2">
          <button
            type="submit"
            class="btn-success"
          >
            ✅ Actualizar Perfil
          </button>
        </div>
      </form>
    </div>

    <!-- Cambiar Contraseña -->
    <div class="bg-white rounded-lg shadow p-6">
      <h2 class="text-xl font-semibold text-gray-900 mb-4">🔒 Cambiar Contraseña</h2>
      <form @submit.prevent="cambiarContrasena" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Contraseña Actual</label>
          <input
            v-model="cambioContrasena.actual"
            type="password"
            required
            class="form-input"
          />
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Nueva Contraseña</label>
          <input
            v-model="cambioContrasena.nueva"
            type="password"
            required
            class="form-input"
          />
          <p class="text-xs text-gray-500 mt-1">Mínimo 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial</p>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Confirmar Nueva Contraseña</label>
          <input
            v-model="cambioContrasena.confirmar"
            type="password"
            required
            class="form-input"
          />
        </div>
        
        <button
          type="submit"
          class="btn-primary"
        >
          🔐 Cambiar Contraseña
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { useAuthStore } from "@/stores/auth"
import { useToast } from "vue-toastification"

const authStore = useAuthStore()
const toast = useToast()

const perfil = ref({
  nombre: "",
  apellido: "",
  email: "",
  telefono: "",
  foto: null,
})

const cambioContrasena = ref({
  actual: "",
  nueva: "",
  confirmar: "",
})

const manejarFoto = (event) => {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      perfil.value.foto = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

const actualizarPerfil = () => {
  // ✅ Validar teléfono si se proporciona
  if (perfil.value.telefono && !authStore.validarTelefono(perfil.value.telefono)) {
    toast.error("❌ El teléfono debe tener exactamente 10 dígitos")
    return
  }

  // Guardar en localStorage
  const perfilActualizado = { ...perfil.value }
  localStorage.setItem("perfil_usuario", JSON.stringify(perfilActualizado))

  toast.success("✅ Perfil actualizado correctamente")
}

const cambiarContrasena = () => {
  // ✅ Validar que la nueva contraseña sea diferente
  if (cambioContrasena.value.actual === cambioContrasena.value.nueva) {
    toast.error("❌ La nueva contraseña debe ser diferente a la actual")
    return
  }

  // ✅ Validar nueva contraseña
  if (!authStore.validarContrasena(cambioContrasena.value.nueva)) {
    toast.error("❌ La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial")
    return
  }

  // ✅ Validar confirmación
  if (cambioContrasena.value.nueva !== cambioContrasena.value.confirmar) {
    toast.error("❌ Las contraseñas no coinciden")
    return
  }

  // Limpiar formulario
  cambioContrasena.value = {
    actual: "",
    nueva: "",
    confirmar: "",
  }

  toast.success("✅ Contraseña cambiada correctamente")
}

onMounted(() => {
  // Cargar datos del usuario actual
  const user = authStore.user
  if (user) {
    perfil.value = {
      nombre: user.nombre,
      apellido: user.apellido,
      email: user.email,
      telefono: user.telefono,
      foto: user.foto,
    }
  }

  // Cargar perfil guardado si existe
  const perfilGuardado = localStorage.getItem("perfil_usuario")
  if (perfilGuardado) {
    const datos = JSON.parse(perfilGuardado)
    perfil.value = { ...perfil.value, ...datos }
  }
})
</script>
