<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
    <!-- Header -->
    <header class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-6">
          <div class="flex items-center">
            <h1 class="text-2xl font-bold text-gray-900">
              🚗 Sistema de Gestión de Vehículos
            </h1>
          </div>
          <div class="flex items-center space-x-4">
            <router-link
              to="/login"
              class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Iniciar Sesión
            </router-link>
          </div>
        </div>
      </div>
    </header>

    <!-- Hero Section -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="text-center">
        <h2 class="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
          Gestión Inteligente de
          <span class="text-blue-600">Vehículos</span>
        </h2>
        <p class="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          Plataforma completa para administrar y monitorear vehículos con seguimiento GPS en tiempo real en Guadalajara, Jalisco.
        </p>
      </div>

      <!-- Features Grid -->
      <div class="mt-16">
        <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <!-- Admin Global Card -->
          <div class="bg-white overflow-hidden shadow-lg rounded-lg hover:shadow-xl transition-shadow">
            <div class="p-6">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <div class="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                    <span class="text-white text-lg">👑</span>
                  </div>
                </div>
                <div class="ml-5 w-0 flex-1">
                  <dl>
                    <dt class="text-sm font-medium text-gray-500 truncate">
                      Administrador Global
                    </dt>
                    <dd class="text-lg font-medium text-gray-900">
                      Control Total
                    </dd>
                  </dl>
                </div>
              </div>
              <div class="mt-4">
                <p class="text-sm text-gray-600">
                  Control total del sistema: gestión completa de usuarios, vehículos y configuraciones.
                </p>
                <div class="mt-4">
                  <router-link
                    to="/login"
                    class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Acceso Admin Global
                  </router-link>
                </div>
              </div>
            </div>
          </div>

          <!-- Admin Card -->
          <div class="bg-white overflow-hidden shadow-lg rounded-lg hover:shadow-xl transition-shadow">
            <div class="p-6">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <span class="text-white text-lg">🔧</span>
                  </div>
                </div>
                <div class="ml-5 w-0 flex-1">
                  <dl>
                    <dt class="text-sm font-medium text-gray-500 truncate">
                      Administrador
                    </dt>
                    <dd class="text-lg font-medium text-gray-900">
                      Gestión Avanzada
                    </dd>
                  </dl>
                </div>
              </div>
              <div class="mt-4">
                <p class="text-sm text-gray-600">
                  Gestiona usuarios y edita información del catálogo de vehículos.
                </p>
                <div class="mt-4">
                  <router-link
                    to="/login"
                    class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Acceso Administrador
                  </router-link>
                </div>
              </div>
            </div>
          </div>

          <!-- User Card -->
          <div class="bg-white overflow-hidden shadow-lg rounded-lg hover:shadow-xl transition-shadow">
            <div class="p-6">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <div class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <span class="text-white text-lg">👤</span>
                  </div>
                </div>
                <div class="ml-5 w-0 flex-1">
                  <dl>
                    <dt class="text-sm font-medium text-gray-500 truncate">
                      Usuario
                    </dt>
                    <dd class="text-lg font-medium text-gray-900">
                      Visualización
                    </dd>
                  </dl>
                </div>
              </div>
              <div class="mt-4">
                <p class="text-sm text-gray-600">
                  Visualiza y monitorea los vehículos asignados a tu cuenta.
                </p>
                <div class="mt-4">
                  <router-link
                    to="/login"
                    class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    Acceso Usuario
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Demo Credentials -->
      <div class="mt-16 bg-white rounded-lg shadow-lg p-8">
        <h3 class="text-lg font-medium text-gray-900 mb-6 text-center">
          📧 Credenciales de Demostración
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="text-center border rounded-lg p-4">
            <h4 class="font-medium text-red-600">🔑 Administrador Global</h4>
            <p class="text-sm text-gray-600 mt-1">Email: admin.global@gmail.com</p>
            <p class="text-sm text-gray-600">Contraseña: AdminGlobal@123</p>
          </div>
          <div class="text-center border rounded-lg p-4">
            <h4 class="font-medium text-orange-600">🔑 Administrador</h4>
            <p class="text-sm text-gray-600 mt-1">Email: admin@gmail.com</p>
            <p class="text-sm text-gray-600">Contraseña: Admin@123</p>
          </div>
          <div class="text-center border rounded-lg p-4">
            <h4 class="font-medium text-blue-600">🔑 Usuario</h4>
            <p class="text-sm text-gray-600 mt-1">Email: usuario@gmail.com</p>
            <p class="text-sm text-gray-600">Contraseña: Usuario@123</p>
          </div>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="bg-white border-t mt-16">
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <p class="text-center text-gray-500">
          © 2025 Sistema de Gestión de Vehículos - Guadalajara, Jalisco
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup>
// Componente de página de inicio
</script>
