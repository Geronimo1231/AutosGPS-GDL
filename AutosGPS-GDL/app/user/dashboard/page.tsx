"use client"
import UserLayout from "@/components/user-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Car, MapPin } from "lucide-react"
import { vehiculosData } from "@/lib/data"

// Simular que el usuario actual tiene ID 3
const USUARIO_ACTUAL_ID = 3

export default function UserDashboard() {
  // Filtrar vehículos asignados al usuario actual
  const vehiculosUsuario = vehiculosData.filter((v) => v.usuarioId === USUARIO_ACTUAL_ID)

  return (
    <UserLayout>
      <div className="grid gap-6">
        <h1 className="text-3xl font-bold">Mi Panel - Guadalajara, Jalisco</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Mis Vehículos</CardTitle>
            </CardHeader>
            <CardContent>
              {vehiculosUsuario.length === 0 ? (
                <p className="text-gray-500">No tienes vehículos asignados.</p>
              ) : (
                <div className="space-y-4">
                  {vehiculosUsuario.map((vehiculo) => (
                    <div key={vehiculo.id} className="flex items-start space-x-4 p-3 bg-gray-50 rounded-lg">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <Car className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h3 className="font-medium">
                            {vehiculo.marca} {vehiculo.modelo}
                          </h3>
                          <Badge variant="outline">{vehiculo.matricula}</Badge>
                        </div>
                        <p className="text-sm text-gray-500">
                          {vehiculo.anio} • {vehiculo.tipo} • {vehiculo.color}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Información de Cuenta</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-500">Nombre:</span>
                  <span>María Rodríguez</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Email:</span>
                  <span>usuario@vehiculos.com</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Teléfono:</span>
                  <span>+52 33 3456 7890</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Ubicación:</span>
                  <span>Guadalajara, Jalisco</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Rol:</span>
                  <Badge variant="outline">Usuario</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Actividad Reciente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {vehiculosUsuario.map((vehiculo, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="bg-gray-100 rounded-full p-2">
                    <MapPin className="h-4 w-4 text-gray-500" />
                  </div>
                  <div>
                    <p className="font-medium">
                      {vehiculo.marca} {vehiculo.modelo} ({vehiculo.matricula})
                    </p>
                    <p className="text-sm text-gray-500">
                      Última actualización: hace {Math.floor(Math.random() * 60) + 1} minutos
                    </p>
                    <p className="text-xs text-gray-400">Guadalajara, Jalisco</p>
                  </div>
                </div>
              ))}

              {vehiculosUsuario.length === 0 && (
                <p className="text-gray-500">No hay actividad reciente para mostrar.</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </UserLayout>
  )
}
