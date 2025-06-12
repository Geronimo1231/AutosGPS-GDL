"use client"

import type React from "react"

import { useState } from "react"
import AdminLayout from "@/components/admin-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, Trash2, Edit, Upload } from "lucide-react"
import { vehiculosData } from "@/lib/data"

export default function VehiculosCatalogo() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredVehiculos, setFilteredVehiculos] = useState(vehiculosData)
  const [tipoFiltro, setTipoFiltro] = useState("todos")
  const [selectedVehiculo, setSelectedVehiculo] = useState<any>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [editPreviewImage, setEditPreviewImage] = useState<string | null>(null)

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase()
    setSearchTerm(term)

    filterVehiculos(term, tipoFiltro)
  }

  const handleTipoChange = (value: string) => {
    setTipoFiltro(value)
    filterVehiculos(searchTerm, value)
  }

  const filterVehiculos = (term: string, tipo: string) => {
    let filtered = vehiculosData

    // Filtrar por término de búsqueda
    if (term) {
      filtered = filtered.filter(
        (v) =>
          v.marca.toLowerCase().includes(term) ||
          v.modelo.toLowerCase().includes(term) ||
          v.matricula.toLowerCase().includes(term),
      )
    }

    // Filtrar por tipo
    if (tipo !== "todos") {
      filtered = filtered.filter((v) => v.tipo === tipo)
    }

    setFilteredVehiculos(filtered)
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, isEdit = false) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        if (isEdit) {
          setEditPreviewImage(reader.result as string)
        } else {
          setPreviewImage(reader.result as string)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleEditVehiculo = (vehiculo: any) => {
    setSelectedVehiculo(vehiculo)
    setEditPreviewImage(vehiculo.imagen || null)
    setIsEditDialogOpen(true)
  }

  const handleDeleteVehiculo = (id: number) => {
    // En una aplicación real, aquí se enviaría una solicitud al backend
    // Por ahora, solo simulamos la eliminación
    const updatedVehiculos = filteredVehiculos.filter((v) => v.id !== id)
    setFilteredVehiculos(updatedVehiculos)
  }

  return (
    <AdminLayout>
      <div className="grid gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h1 className="text-3xl font-bold">Catálogo de Vehículos</h1>

          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Nuevo Vehículo
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Añadir Nuevo Vehículo</DialogTitle>
                <DialogDescription>
                  Complete los detalles del vehículo. Los campos marcados con * son obligatorios.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="marca">Marca *</Label>
                    <Input id="marca" placeholder="Toyota" required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="modelo">Modelo *</Label>
                    <Input id="modelo" placeholder="Corolla" required />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="anio">Año *</Label>
                    <Input id="anio" type="number" placeholder="2023" min="1900" max="2025" required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="tipo">Tipo *</Label>
                    <Select>
                      <SelectTrigger id="tipo">
                        <SelectValue placeholder="Seleccionar tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sedan">Sedán</SelectItem>
                        <SelectItem value="pickup">Pickup</SelectItem>
                        <SelectItem value="suv">SUV</SelectItem>
                        <SelectItem value="hatchback">Hatchback</SelectItem>
                        <SelectItem value="deportivo">Deportivo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="matricula">Matrícula *</Label>
                    <Input id="matricula" placeholder="JAL-1234" required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="color">Color *</Label>
                    <Input id="color" placeholder="Blanco" required />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="imagen">Imagen del Vehículo</Label>
                  <div className="flex flex-col items-center gap-4">
                    <div className="border border-dashed border-gray-300 rounded-lg p-4 w-full flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50">
                      <input type="file" id="imagen" accept="image/*" className="hidden" onChange={handleImageChange} />
                      <label htmlFor="imagen" className="cursor-pointer flex flex-col items-center">
                        <Upload className="h-10 w-10 text-gray-400 mb-2" />
                        <span className="text-sm text-gray-500">Haga clic para seleccionar una imagen</span>
                        <span className="text-xs text-gray-400 mt-1">JPG, PNG o GIF hasta 5MB</span>
                      </label>
                    </div>
                    {previewImage && (
                      <div className="relative">
                        <img
                          src={previewImage || "/placeholder.svg"}
                          alt="Vista previa"
                          className="w-full max-h-40 object-contain rounded-md"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-1 right-1 bg-white/80 hover:bg-white"
                          onClick={() => setPreviewImage(null)}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Guardar Vehículo</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Buscar por marca, modelo o matrícula..."
              className="pl-8"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <Select value={tipoFiltro} onValueChange={handleTipoChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filtrar por tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos los tipos</SelectItem>
              <SelectItem value="sedan">Sedán</SelectItem>
              <SelectItem value="pickup">Pickup</SelectItem>
              <SelectItem value="suv">SUV</SelectItem>
              <SelectItem value="hatchback">Hatchback</SelectItem>
              <SelectItem value="deportivo">Deportivo</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVehiculos.map((vehiculo) => (
            <Card key={vehiculo.id} className="overflow-hidden">
              <div className="aspect-video bg-gray-100 relative">
                <img
                  src={vehiculo.imagen || "/placeholder.svg?height=200&width=400"}
                  alt={`${vehiculo.marca} ${vehiculo.modelo}`}
                  className="w-full h-full object-cover"
                />
                <Badge className={`absolute top-2 right-2 ${vehiculo.asignado ? "bg-amber-500" : "bg-green-500"}`}>
                  {vehiculo.asignado ? "Asignado" : "Disponible"}
                </Badge>
              </div>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>
                      {vehiculo.marca} {vehiculo.modelo}
                    </CardTitle>
                    <CardDescription>
                      {vehiculo.anio} • {vehiculo.tipo} • {vehiculo.color}
                    </CardDescription>
                  </div>
                  <Badge variant="outline">{vehiculo.matricula}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                {vehiculo.asignado && (
                  <p className="text-sm text-gray-500">
                    Asignado a: <span className="font-medium">{vehiculo.usuarioAsignado}</span>
                  </p>
                )}
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm" onClick={() => handleEditVehiculo(vehiculo)}>
                  <Edit className="mr-2 h-4 w-4" />
                  Editar
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-500 hover:text-red-700"
                  onClick={() => handleDeleteVehiculo(vehiculo.id)}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Eliminar
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Dialog para editar vehículo */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Editar Vehículo</DialogTitle>
              <DialogDescription>Modifique los detalles del vehículo.</DialogDescription>
            </DialogHeader>
            {selectedVehiculo && (
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="edit-marca">Marca</Label>
                    <Input id="edit-marca" defaultValue={selectedVehiculo.marca} />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="edit-modelo">Modelo</Label>
                    <Input id="edit-modelo" defaultValue={selectedVehiculo.modelo} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="edit-anio">Año</Label>
                    <Input id="edit-anio" type="number" defaultValue={selectedVehiculo.anio} min="1900" max="2025" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="edit-tipo">Tipo</Label>
                    <Select defaultValue={selectedVehiculo.tipo}>
                      <SelectTrigger id="edit-tipo">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sedan">Sedán</SelectItem>
                        <SelectItem value="pickup">Pickup</SelectItem>
                        <SelectItem value="suv">SUV</SelectItem>
                        <SelectItem value="hatchback">Hatchback</SelectItem>
                        <SelectItem value="deportivo">Deportivo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="edit-matricula">Matrícula</Label>
                    <Input id="edit-matricula" defaultValue={selectedVehiculo.matricula} />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="edit-color">Color</Label>
                    <Input id="edit-color" defaultValue={selectedVehiculo.color} />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-imagen">Imagen del Vehículo</Label>
                  <div className="flex flex-col items-center gap-4">
                    <div className="border border-dashed border-gray-300 rounded-lg p-4 w-full flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50">
                      <input
                        type="file"
                        id="edit-imagen"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleImageChange(e, true)}
                      />
                      <label htmlFor="edit-imagen" className="cursor-pointer flex flex-col items-center">
                        <Upload className="h-10 w-10 text-gray-400 mb-2" />
                        <span className="text-sm text-gray-500">Haga clic para cambiar la imagen</span>
                        <span className="text-xs text-gray-400 mt-1">JPG, PNG o GIF hasta 5MB</span>
                      </label>
                    </div>
                    {editPreviewImage && (
                      <div className="relative">
                        <img
                          src={editPreviewImage || "/placeholder.svg"}
                          alt="Vista previa"
                          className="w-full max-h-40 object-contain rounded-md"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-1 right-1 bg-white/80 hover:bg-white"
                          onClick={() => setEditPreviewImage(null)}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button onClick={() => setIsEditDialogOpen(false)}>Guardar Cambios</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  )
}
