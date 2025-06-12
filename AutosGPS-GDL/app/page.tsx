import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Sistema de Gestión de Vehículos</h1>
          <div className="flex gap-4">
            <Link href="/login">
              <Button variant="outline">Iniciar Sesión</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Bienvenido al Sistema de Gestión de Vehículos</h2>
          <p className="text-lg text-gray-600 mb-8">
            Una plataforma completa para administrar y monitorear vehículos con seguimiento GPS en tiempo real en
            Guadalajara, Jalisco.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">Administrador Global</h3>
                <p className="text-gray-600 mb-4">
                  Control total del sistema: gestión completa de usuarios, vehículos y configuraciones.
                </p>
                <Link href="/login?role=admin_global">
                  <Button className="w-full">Acceso Admin Global</Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">Administrador</h3>
                <p className="text-gray-600 mb-4">Gestiona usuarios y edita información del catálogo de vehículos.</p>
                <Link href="/login?role=admin">
                  <Button className="w-full">Acceso Administrador</Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">Usuario</h3>
                <p className="text-gray-600 mb-4">Visualiza y monitorea los vehículos asignados a tu cuenta.</p>
                <Link href="/login?role=user">
                  <Button className="w-full">Acceso Usuario</Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg border">
            <h3 className="text-lg font-medium mb-4">Credenciales de Demostración</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="font-medium">Administrador Global:</p>
                <p>Email: admin.global@vehiculos.com</p>
                <p>Contraseña: AdminGlobal@123</p>
              </div>
              <div>
                <p className="font-medium">Administrador:</p>
                <p>Email: admin@vehiculos.com</p>
                <p>Contraseña: Admin@123</p>
              </div>
              <div>
                <p className="font-medium">Usuario:</p>
                <p>Email: usuario@vehiculos.com</p>
                <p>Contraseña: Usuario@123</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-50 border-t py-6">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>© 2025 Sistema de Gestión de Vehículos - Guadalajara, Jalisco</p>
        </div>
      </footer>
    </div>
  )
}
