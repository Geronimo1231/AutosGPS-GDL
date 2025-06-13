<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          🔐 Iniciar Sesión
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Sistema de Gestión de Vehículos
        </p>
      </div>
      
      <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="email" class="sr-only">Email</label>
            <input
              id="email"
              v-model="form.email"
              name="email"
              type="email"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Correo electrónico (@gmail.com)"
            />
          </div>
          <div>
            <label for="password" class="sr-only">Contraseña</label>
            <input
              id="password"
              v-model="form.password"
              name="password"
              type="password"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Contraseña"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            :disabled="loading"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            <span v-if="loading" class="spinner w-4 h-4 mr-2"></span>
            {{ loading ? 'Iniciando...' : 'Iniciar Sesión' }}
          </button>
        </div>

        <div class="mt-6">
          <div class="text-sm text-gray-600">
            <h3 class="font-medium mb-2">📧 Usuarios de prueba:</h3>
            <div class="space-y-1 text-xs">
              <p><strong>Admin Global:</strong> admin.global@gmail.com / AdminGlobal@123</p>
              <p><strong>Admin:</strong> admin@gmail.com / Admin@123</p>
              <p><strong>Usuario:</strong> usuario@gmail.com / Usuario@123</p>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router"
import { useAuthStore } from "@/stores/auth"

const router = useRouter()
const authStore = useAuthStore()

const form = ref({
  email: "",
  password: "",
})

const loading = ref(false)

const handleLogin = async () => {
  loading.value = true
  
  const success = await authStore.login(form.value.email, form.value.password)
  
  if (success) {
    if (authStore.isAdmin) {
      router.push("/admin/dashboard")
    } else {
      router.push("/user/dashboard")
    }
  }
  
  loading.value = false
}
</script>
