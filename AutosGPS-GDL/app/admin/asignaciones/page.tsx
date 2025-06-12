"use client"

import { useState } from "react"
import AdminLayout from "@/components/admin-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Plus, Car, User, Trash2, Calendar, FileText } from "lucide-react"
import { asignacionesData, vehiculosData, usuariosData } from "@/lib/data"

export default function Asignaciones() {
  const [asignaciones, setAsignaciones] = useState(asignacionesData)
  const [selectedUsuario, setSelectedUsuario] = useState<string | null>(null)
  const [selectedVehiculo, setSelectedVehiculo] = useState<string | null>(null)
  const [fechaInicio, setFechaInicio] = useState<string>(new Date().toISOString().split("T")[0])
  const [notas, setNotas] = useState<string>("")

  // Filtrar solo usuarios con rol "usuario"
  const usuariosDisponibles = usuariosData.filter((u) => u.rol === "usuario")

  // Filtrar solo vehículos disponibles (no asignados)
  const vehiculosDisponibles = vehiculosData.filter((v) => !v.asignado)

  const handleDeleteAsignacion = (id: number) => {
    // En una aplicación real, aquí se enviaría una solicitud al backend
    // Por ahora, solo simulamos la eliminación
    const updatedAsignaciones = asignaciones.filter((a) => a.id !== id)
    setAsignaciones(updatedAsignaciones)
  }

  const handleCreateAsignacion = () => {
    // En una aplicación real, aquí se enviaría una solicitud al backend
    // Por ahora, solo simulamos la creación
    if (selectedUsuario && selectedVehiculo && fechaInicio) {
      const newAsignacion = {
        id: asignaciones.length + 1,
        usuarioId: Number.parseInt(selectedUsuario),
        vehiculoId: Number.parseInt(selectedVehiculo),
        fechaInicio,
        notas,
        activa: true,
      }

      setAsignaciones([...asignaciones, newAsignacion])

      // Limpiar el formulario
      setSelectedUsuario(null)
      setSelectedVehiculo(null)
      setFechaInicio(new Date().toISOString().split("T")[0])
      setNotas("")
    }
  }

  return (
    <AdminLayout>
      <div className="grid gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h1 className="text-3xl font-bold">Asignaciones de Vehículos</h1>

          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Nueva Asignación
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[700px]">
              <DialogHeader>
                <DialogTitle>Asignar Vehículo</DialogTitle>
                <DialogDescription>
                  Seleccione un usuario y un vehículo disponible para crear una nueva asignación.
                </DialogDescription>
              </DialogHeader>

              <Tabs defaultValue="usuario" className="w-full">
                <TabsList className="grid grid-cols-3 mb-4">
                  <TabsTrigger value="usuario">
                    <User className="mr-2 h-4 w-4" />
                    Usuario
                  </TabsTrigger>
                  <TabsTrigger value="vehiculo">
                    <Car className="mr-2 h-4 w-4" />
                    Vehículo
                  </TabsTrigger>
                  <TabsTrigger value="detalles">
                    <Calendar className="mr-2 h-4 w-4" />
                    Detalles
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="usuario" className="space-y-4">
                  <div className="grid gap-2">
                    <Label>Seleccione un Usuario</Label>
                    <RadioGroup value={selectedUsuario || ""} onValueChange={setSelectedUsuario}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[300px] overflow-y-auto p-1">
                        {usuariosDisponibles.map((usuario) => (
                          <div key={usuario.id} className="flex items-center space-x-2">
                            <RadioGroupItem value={usuario.id.toString()} id={`usuario-${usuario.id}`} />
                            <Label htmlFor={`usuario-${usuario.id}`} className="cursor-pointer flex-1">
                              <Card
                                className={`border ${selectedUsuario === usuario.id.toString() ? "border-primary" : ""}`}
                              >
                                <CardContent className="p-3 flex items-center space-x-3">
                                  <div className="bg-primary/10 p-2 rounded-full">
                                    <User className="h-5 w-5 text-primary" />
                                  </div>
                                  <div>
                                    <p className="font-medium">
                                      {usuario.nombre} {usuario.apellido}
                                    </p>
                                    <p className="text-xs text-gray-500">{usuario.email}</p>
                                  </div>
                                </CardContent>
                              </Card>
                            </Label>
                          </div>
                        ))}
                      </div>
                    </RadioGroup>
                  </div>
                </TabsContent>

                <TabsContent value="vehiculo" className="space-y-4">
                  <div className="grid gap-2">
                    <Label>Seleccione un Vehículo Disponible</Label>
                    <RadioGroup value={selectedVehiculo || ""} onValueChange={setSelectedVehiculo}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[300px] overflow-y-auto p-1">
                        {vehiculosDisponibles.map((vehiculo) => (
                          <div key={vehiculo.id} className="flex items-center space-x-2">
                            <RadioGroupItem value={vehiculo.id.toString()} id={`vehiculo-${vehiculo.id}`} />
                            <Label htmlFor={`vehiculo-${vehiculo.id}`} className="cursor-pointer flex-1">
                              <Card
                                className={`border ${selectedVehiculo === vehiculo.id.toString() ? "border-primary" : ""}`}
                              >
                                <CardContent className="p-0 overflow-hidden">
                                  <div className="aspect-video bg-gray-100 relative">
                                    <img
                                      src={vehiculo.imagen || "/placeholder.svg?height=100&width=200"}
                                      alt={`${vehiculo.marca} ${vehiculo.modelo}`}
                                      className="w-full h-full object-cover"
                                    />
                                    <Badge className="absolute top-2 right-2 bg-green-500">Disponible</Badge>
                                  </div>
                                  <div className="p-3">
                                    <p className="font-medium">
                                      {vehiculo.marca} {vehiculo.modelo}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                      {vehiculo.matricula} • {vehiculo.color}
                                    </p>
                                  </div>
                                </CardContent>
                              </Card>
                            </Label>
                          </div>
                        ))}
                      </div>
                    </RadioGroup>
                  </div>
                </TabsContent>

                <TabsContent value="detalles" className="space-y-4">
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="fechaInicio">Fecha de Inicio</Label>
                      <Input
                        type="date"
                        id="fechaInicio"
                        value={fechaInicio}
                        onChange={(e) => setFechaInicio(e.target.value)}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="notas">Notas (opcional)</Label>
                      <textarea
                        id="notas"
                        className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Añadir notas sobre esta asignación..."
                        value={notas}
                        onChange={(e) => setNotas(e.target.value)}
                      />
                    </div>

                    {selectedUsuario && selectedVehiculo && (
                      <Card className="border-dashed border-gray-300">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">Resumen de Asignación</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <User className="h-4 w-4 text-gray-500" />
                            <span>
                              {usuariosData.find((u) => u.id === Number.parseInt(selectedUsuario))?.nombre}{" "}
                              {usuariosData.find((u) => u.id === Number.parseInt(selectedUsuario))?.apellido}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Car className="h-4 w-4 text-gray-500" />
                            <span>
                              {vehiculosData.find((v) => v.id === Number.parseInt(selectedVehiculo))?.marca}{" "}
                              {vehiculosData.find((v) => v.id === Number.parseInt(selectedVehiculo))?.modelo} (
                              {vehiculosData.find((v) => v.id === Number.parseInt(selectedVehiculo))?.matricula})
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4 text-gray-500" />
                            <span>{new Date(fechaInicio).toLocaleDateString()}</span>
                          </div>
                          {notas && (
                            <div className="flex items-start space-x-2">
                              <FileText className="h-4 w-4 text-gray-500 mt-0.5" />
                              <span className="text-sm">{notas}</span>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </TabsContent>
              </Tabs>

              <DialogFooter>
                <Button
                  type="submit"
                  onClick={handleCreateAsignacion}
                  disabled={!selectedUsuario || !selectedVehiculo || !fechaInicio}
                >
                  Crear Asignación
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {asignaciones.map((asignacion) => {
            const vehiculo = vehiculosData.find((v) => v.id === asignacion.vehiculoId)
            const usuario = usuariosData.find((u) => u.id === asignacion.usuarioId)

            if (!vehiculo || !usuario) return null

            return (
              <Card key={asignacion.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <CardTitle>Asignación #{asignacion.id}</CardTitle>
                    <Badge>{new Date(asignacion.fechaInicio).toLocaleDateString()}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <User className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">Usuario</h3>
                        <p>
                          {usuario.nombre} {usuario.apellido}
                        </p>
                        <p className="text-sm text-gray-500">{usuario.email}</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <Car className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">Vehículo</h3>
                        <p>
                          {vehiculo.marca} {vehiculo.modelo}
                        </p>
                        <p className="text-sm text-gray-500">Matrícula: {vehiculo.matricula}</p>
                      </div>
                    </div>
                  </div>

                  {asignacion.notas && (
                    <div className="mt-4 p-3 bg-gray-50 rounded-md">
                      <p className="text-sm">{asignacion.notas}</p>
                    </div>
                  )}

                  <div className="mt-4 flex justify-end">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleDeleteAsignacion(asignacion.id)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Eliminar Asignación
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </AdminLayout>
  )
}
