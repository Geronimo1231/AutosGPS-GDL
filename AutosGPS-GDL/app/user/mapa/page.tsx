"use client"

import { useState, useEffect } from "react"
import UserLayout from "@/components/user-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin } from "lucide-react"
import { vehiculosData, GUADALAJARA_CENTER } from "@/lib/data"

// Simular que el usuario actual tiene ID 3
const USUARIO_ACTUAL_ID = 3

export default function UserMapa() {
  // Filtrar vehículos asignados al usuario actual
  const vehiculosUsuario = vehiculosData.filter((v) => v.usuarioId === USUARIO_ACTUAL_ID)
  const [vehiculosConUbicacion, setVehiculosConUbicacion] = useState<any[]>([])

  // Simular ubicaciones de vehículos en Guadalajara
  useEffect(() => {
    // Generar ubicaciones aleatorias para los vehículos en Guadalajara
    const ubicaciones = vehiculosUsuario.map((vehiculo) => {
      return {
        ...vehiculo,
        ubicacion: {
          lat: GUADALAJARA_CENTER.lat + (Math.random() * 0.1 - 0.05), // Área de Guadalajara
          lng: GUADALAJARA_CENTER.lng + (Math.random() * 0.1 - 0.05),
        },
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
  }, [vehiculosUsuario])

  return (
    <UserLayout>
      <div className="grid gap-6">
        <h1 className="text-3xl font-bold">Mapa de Mis Vehículos - Guadalajara, Jalisco</h1>

        {vehiculosUsuario.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-gray-500">No tienes vehículos asignados para mostrar en el mapa.</p>
            </CardContent>
          </Card>
        ) : (
          <>
            <Card className="overflow-hidden">
              <CardHeader className="pb-0">
                <CardTitle>Ubicación en Tiempo Real - Guadalajara, Jalisco</CardTitle>
                <p className="text-sm text-gray-500">Solo visualización - No se puede editar</p>
              </CardHeader>
              <CardContent className="p-0">
                <div className="relative w-full h-[500px] bg-gray-100">
                  {/* Aquí iría el mapa real con una biblioteca como Leaflet o Google Maps */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-gray-500 mb-2">
                        Mapa interactivo de Guadalajara, Jalisco (solo visualización)
                      </p>
                      <p className="text-xs text-gray-400 mt-2">
                        Centro: {GUADALAJARA_CENTER.lat}, {GUADALAJARA_CENTER.lng}
                      </p>
                    </div>
                  </div>

                  {/* Simulación visual de ubicaciones */}
                  {vehiculosConUbicacion.map((vehiculo) => (
                    <div
                      key={vehiculo.id}
                      className="absolute w-8 h-8 transform -translate-x-1/2 -translate-y-1/2"
                      style={{
                        left: `${(vehiculo.ubicacion.lng - GUADALAJARA_CENTER.lng) * 2000 + 250}px`,
                        top: `${(GUADALAJARA_CENTER.lat - vehiculo.ubicacion.lat) * 2000 + 250}px`,
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
                          <p className="text-xs mt-1">
                            Lat: {vehiculo.ubicacion.lat.toFixed(6)}, Lng: {vehiculo.ubicacion.lng.toFixed(6)}
                          </p>
                          <p className="text-xs text-gray-400">Guadalajara, Jalisco</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {vehiculosConUbicacion.map((vehiculo) => (
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
                        <p className="text-xs mt-1">
                          Lat: {vehiculo.ubicacion.lat.toFixed(6)}, Lng: {vehiculo.ubicacion.lng.toFixed(6)}
                        </p>
                        <p className="text-xs text-gray-400">Guadalajara, Jalisco</p>
                        <p className="text-xs text-green-600">
                          Última actualización: hace {Math.floor(Math.random() * 60) + 1} minutos
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}
      </div>
    </UserLayout>
  )
}
