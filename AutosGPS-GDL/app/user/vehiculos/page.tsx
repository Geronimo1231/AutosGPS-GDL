"use client"
import UserLayout from "@/components/user-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { vehiculosData } from "@/lib/data"

// Simular que el usuario actual tiene ID 2
const USUARIO_ACTUAL_ID = 2

export default function UserVehiculos() {
  // Filtrar vehículos asignados al usuario actual
  const vehiculosUsuario = vehiculosData.filter((v) => v.usuarioId === USUARIO_ACTUAL_ID)

  return (
    <UserLayout>
      <div className="grid gap-6">
        <h1 className="text-3xl font-bold">Mis Vehículos</h1>

        {vehiculosUsuario.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-gray-500">No tienes vehículos asignados actualmente.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vehiculosUsuario.map((vehiculo) => (
              <Card key={vehiculo.id} className="overflow-hidden">
                <div className="aspect-video bg-gray-100 relative">
                  <img
                    src={vehiculo.imagen || "/placeholder.svg?height=200&width=400"}
                    alt={`${vehiculo.marca} ${vehiculo.modelo}`}
                    className="w-full h-full object-cover"
                  />
                  <Badge className="absolute top-2 right-2 bg-green-500">Asignado</Badge>
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle>
                      {vehiculo.marca} {vehiculo.modelo}
                    </CardTitle>
                    <Badge variant="outline">{vehiculo.matricula}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="detalles">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="detalles">Detalles</TabsTrigger>
                      <TabsTrigger value="ubicacion">Ubicación</TabsTrigger>
                    </TabsList>
                    <TabsContent value="detalles" className="space-y-2 mt-4">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <p className="text-sm font-medium">Año</p>
                          <p className="text-sm text-gray-500">{vehiculo.anio}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Tipo</p>
                          <p className="text-sm text-gray-500">{vehiculo.tipo}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Color</p>
                          <p className="text-sm text-gray-500">{vehiculo.color}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Estado</p>
                          <p className="text-sm text-gray-500">Activo</p>
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="ubicacion" className="mt-4">
                      <div className="bg-gray-100 rounded-md h-[150px] flex items-center justify-center">
                        <p className="text-sm text-gray-500">Mapa de ubicación (solo visualización)</p>
                      </div>
                      <div className="mt-2 text-xs text-gray-500">
                        <p>Última actualización: hace {Math.floor(Math.random() * 60) + 1} minutos</p>
                        <p>Lat: {(40.416775 + (Math.random() * 0.1 - 0.05)).toFixed(6)}</p>
                        <p>Lng: {(-3.70379 + (Math.random() * 0.1 - 0.05)).toFixed(6)}</p>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </UserLayout>
  )
}
