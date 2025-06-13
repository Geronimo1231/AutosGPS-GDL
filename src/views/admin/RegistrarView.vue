<template>
  <div class="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md mt-10">
    <h2 class="text-2xl font-bold mb-4 text-center">Registrar Usuario</h2>

    <form @submit.prevent="registrarUsuario">
      <div class="mb-4">
        <label class="block mb-1 font-medium">Nombre</label>
        <input v-model="user.name" type="text" class="w-full p-2 border rounded" required />
      </div>

      <div class="mb-4">
        <label class="block mb-1 font-medium">Correo</label>
        <input v-model="user.email" type="email" class="w-full p-2 border rounded" required />
      </div>

      <div class="mb-4">
        <label class="block mb-1 font-medium">Contraseña</label>
        <input v-model="user.password" type="password" class="w-full p-2 border rounded" required />
      </div>

      <div class="mb-6">
        <label class="block mb-1 font-medium">Rol</label>
        <select v-model="user.role" class="w-full p-2 border rounded" required>
          <option disabled value="">Selecciona un rol</option>
          <option value="client">Cliente</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Registrar Usuario
      </button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'RegistrarView',
  data() {
    return {
      user: {
        name: '',
        email: '',
        password: '',
        role: ''
      }
    }
  },
  methods: {
    async registrarUsuario() {
      try {
        const response = await axios.post('http://localhost:3000/api/users', this.user)
        alert('Usuario registrado con éxito')
        this.user = { name: '', email: '', password: '', role: '' } // Limpia formulario
        this.$router.push('/') // Redirige al login (opcional)
      } catch (error) {
        console.error('Error al registrar usuario:', error)
        alert('Ocurrió un error al registrar el usuario')
      }
    }
  }
}
</script>

<style scoped>
/* Puedes agregar estilos personalizados aquí */
</style>
