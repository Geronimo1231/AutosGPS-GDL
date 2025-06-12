"use client"
import AdminLayout from "@/components/admin-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Car, Users, CheckCircle, AlertCircle } from "lucide-react"
import { vehiculosData } from "@/lib/data"

export default function AdminDashboard() {
  const totalVehiculos = vehiculosData.length
  const vehiculosAsignados = vehiculosData.filter((v) => v.asignado).length
  const vehiculosDisponibles = totalVehiculos - vehiculosAsignados

  // Contar vehículos por marca
  const marcasCount: Record<string, number> = {}
  vehiculosData.forEach((vehiculo) => {
    if (marcasCount[vehiculo.marca]) {
      marcasCount[vehiculo.marca]++
    } else {
      marcasCount[vehiculo.marca] = 1
    }
  })

  return (
    <AdminLayout>
      <div className="grid gap-6">
        <h1 className="text-3xl font-bold">Panel de Administración</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6 flex flex-col items-center">
              <Car className="h-12 w-12 text-primary mb-4" />
              <CardTitle className="text-xl mb-2">Total Vehículos</CardTitle>
              <p className="text-3xl font-bold">{totalVehiculos}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 flex flex-col items-center">
              <CheckCircle className="h-12 w-12 text-green-500 mb-4" />
              <CardTitle className="text-xl mb-2">Asignados</CardTitle>
              <p className="text-3xl font-bold">{vehiculosAsignados}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 flex flex-col items-center">
              <AlertCircle className="h-12 w-12 text-amber-500 mb-4" />
              <CardTitle className="text-xl mb-2">Disponibles</CardTitle>
              <p className="text-3xl font-bold">{vehiculosDisponibles}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 flex flex-col items-center">
              <Users className="h-12 w-12 text-blue-500 mb-4" />
              <CardTitle className="text-xl mb-2">Usuarios</CardTitle>
              <p className="text-3xl font-bold">5</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Vehículos por Marca</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(marcasCount).map(([marca, count]) => (
                  <div key={marca} className="flex items-center justify-between">
                    <span className="font-medium">{marca}</span>
                    <div className="flex items-center">
                      <div className="w-48 h-2 bg-gray-200 rounded-full mr-2">
                        <div
                          className="h-full bg-primary rounded-full"
                          style={{ width: `${(count / totalVehiculos) * 100}%` }}
                        />
                      </div>
                      <span>{count}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Estado de Asignación</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex h-[200px] items-center justify-center">
                <div className="relative h-40 w-40">
                  {/* Gráfico circular simple */}
                  <svg className="h-full w-full" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#f0f0f0" strokeWidth="20" />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="transparent"
                      stroke="hsl(var(--primary))"
                      strokeWidth="20"
                      strokeDasharray={`${(vehiculosAsignados / totalVehiculos) * 251.2} 251.2`}
                      transform="rotate(-90 50 50)"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-3xl font-bold">{Math.round((vehiculosAsignados / totalVehiculos) * 100)}%</p>
                      <p className="text-sm text-gray-500">Asignados</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full bg-primary mr-2" />
                  <span>Asignados: {vehiculosAsignados}</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full bg-gray-200 mr-2" />
                  <span>Disponibles: {vehiculosDisponibles}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  )
}
