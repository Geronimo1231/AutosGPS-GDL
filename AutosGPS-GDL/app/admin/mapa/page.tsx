"use client"

import { useState, useEffect } from "react"
import AdminLayout from "@/components/admin-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { vehiculosData, usuariosData, GUADALAJARA_CENTER } from "@/lib/data"
import { MapPin } from "lucide-react"

export default function MapaAdmin() {
  const [selectedVehiculo, setSelectedVehiculo] = useState<string>("todos")
  const [vehiculosConUbicacion, setVehiculosConUbicacion] = useState<any[]>([])

  // Simular ubicaciones de vehículos en Guadalajara
  useEffect(() => {
    // Generar ubicaciones aleatorias para los vehículos en Guadalajara
    const ubicaciones = vehiculosData.map((vehiculo) => {
      const usuario = usuariosData.find((u) => u.id === vehiculo.usuarioId)

      return {
        ...vehiculo,
        ubicacion: {
          lat: GUADALAJARA_CENTER.lat + (Math.random() * 0.1 - 0.05), // Área de Guadalajara
          lng: GUADALAJARA_CENTER.lng + (Math.random() * 0.1 - 0.05),
        },
        usuarioNombre: usuario ? `${usuario.nombre} ${usuario.apellido}` : "No asignado",
      }
    })

    setVehiculosConUbicacion(ubicaciones)

    // Simular actualizaciones de ubicación cada 10 segundos
    const interval = setInterval(() => {
      setVehiculosConUbicacion((prev) =>
        prev.map((v) => ({
          ...v,
          ubicacion: {
            lat: v.ubicacion.lat + (Math.random() * 0.002 - 0.001),
            lng: v.ubicacion.lng + (Math.random() * 0.002 - 0.001),
          },
        })),
      )
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  // Filtrar vehículos según la selección
  const vehiculosFiltrados =
    selectedVehiculo === "todos"
      ? vehiculosConUbicacion
      : vehiculosConUbicacion.filter((v) => v.id.toString() === selectedVehiculo)

  return (
    <AdminLayout>
      <div className="grid gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h1 className="text-3xl font-bold">Mapa de Vehículos - Guadalajara, Jalisco</h1>

          <Select value={selectedVehiculo} onValueChange={setSelectedVehiculo}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Filtrar por vehículo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos los vehículos</SelectItem>
              {vehiculosData.map((vehiculo) => (
                <SelectItem key={vehiculo.id} value={vehiculo.id.toString()}>
                  {vehiculo.marca} {vehiculo.modelo} ({vehiculo.matricula})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Card className="overflow-hidden">
          <CardHeader className="pb-0">
            <CardTitle>Ubicación en Tiempo Real - Guadalajara, Jalisco</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="relative w-full h-[600px] bg-gray-100">
              {/* Aquí iría el mapa real con una biblioteca como Leaflet o Google Maps */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-gray-500 mb-2">Mapa interactivo de Guadalajara, Jalisco</p>
                  <p className="text-sm text-gray-400">(se requiere integración con API de mapas)</p>
                  <p className="text-xs text-gray-400 mt-2">
                    Centro: {GUADALAJARA_CENTER.lat}, {GUADALAJARA_CENTER.lng}
                  </p>
                </div>
              </div>

              {/* Simulación visual de ubicaciones */}
              {vehiculosFiltrados.map((vehiculo) => (
                <div
                  key={vehiculo.id}
                  className="absolute w-8 h-8 transform -translate-x-1/2 -translate-y-1/2"
                  style={{
                    left: `${(vehiculo.ubicacion.lng - GUADALAJARA_CENTER.lng) * 2000 + 300}px`,
                    top: `${(GUADALAJARA_CENTER.lat - vehiculo.ubicacion.lat) * 2000 + 300}px`,
                  }}
                >
                  <div className="relative group">
                    <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-full text-white">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 bg-white p-2 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10">
                      <p className="font-medium">
                        {vehiculo.marca} {vehiculo.modelo}
                      </p>
                      <p className="text-xs">{vehiculo.matricula}</p>
                      <p className="text-xs text-gray-500">Asignado a: {vehiculo.usuarioNombre}</p>
                      <p className="text-xs mt-1">
                        Lat: {vehiculo.ubicacion.lat.toFixed(6)}, Lng: {vehiculo.ubicacion.lng.toFixed(6)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {vehiculosFiltrados.map((vehiculo) => (
            <Card key={vehiculo.id}>
              <CardContent className="p-4">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">
                      {vehiculo.marca} {vehiculo.modelo}
                    </h3>
                    <p className="text-sm text-gray-500">Matrícula: {vehiculo.matricula}</p>
                    <p className="text-sm">Asignado a: {vehiculo.usuarioNombre}</p>
                    <p className="text-xs mt-1">
                      Lat: {vehiculo.ubicacion.lat.toFixed(6)}, Lng: {vehiculo.ubicacion.lng.toFixed(6)}
                    </p>
                    <p className="text-xs text-gray-400">Guadalajara, Jalisco</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AdminLayout>
  )
}
