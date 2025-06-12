"use client"

import type React from "react"

import { useState, useEffect } from "react"
import AdminLayout from "@/components/admin-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, User, Edit, Trash2, Key, Mail } from "lucide-react"
import { usuariosData } from "@/lib/data"

export default function Usuarios() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredUsuarios, setFilteredUsuarios] = useState(usuariosData)
  const [passwordError, setPasswordError] = useState("")
  const [userRole, setUserRole] = useState<string>("")
  const [selectedUser, setSelectedUser] = useState<any>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false)
  const [isEmailDialogOpen, setIsEmailDialogOpen] = useState(false)

  useEffect(() => {
    const role = localStorage.getItem("userRole") || ""
    setUserRole(role)
  }, [])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase()
    setSearchTerm(term)

    if (term) {
      setFilteredUsuarios(
        usuariosData.filter(
          (u) =>
            u.nombre.toLowerCase().includes(term) ||
            u.apellido.toLowerCase().includes(term) ||
            u.email.toLowerCase().includes(term),
        ),
      )
    } else {
      setFilteredUsuarios(usuariosData)
    }
  }

  const validatePassword = (password: string) => {
    const hasUpperCase = /[A-Z]/.test(password)
    const hasLowerCase = /[a-z]/.test(password)
    const hasNumber = /[0-9]/.test(password)
    const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)
    const isLongEnough = password.length >= 8

    if (!hasUpperCase || !hasLowerCase || !hasNumber || !hasSpecialChar || !isLongEnough) {
      setPasswordError(
        "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial.",
      )
      return false
    }

    setPasswordError("")
    return true
  }

  const getRoleBadgeVariant = (rol: string) => {
    switch (rol) {
      case "admin_global":
        return "default"
      case "admin":
        return "secondary"
      default:
        return "outline"
    }
  }

  const getRoleDisplayName = (rol: string) => {
    switch (rol) {
      case "admin_global":
        return "Admin Global"
      case "admin":
        return "Administrador"
      default:
        return "Usuario"
    }
  }

  const canDeleteUser = (usuario: any) => {
    return userRole === "admin_global" && usuario.rol !== "admin_global"
  }

  const canChangePassword = (usuario: any) => {
    return userRole === "admin_global"
  }

  const canChangeEmail = (usuario: any) => {
    return userRole === "admin_global"
  }

  return (
    <AdminLayout>
      <div className="grid gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h1 className="text-3xl font-bold">Gestión de Usuarios</h1>

          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Nuevo Usuario
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Añadir Nuevo Usuario</DialogTitle>
                <DialogDescription>
                  Complete los datos del usuario. Los campos marcados con * son obligatorios.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="nombre">Nombre *</Label>
                    <Input id="nombre" placeholder="Juan" required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="apellido">Apellido *</Label>
                    <Input id="apellido" placeholder="Pérez" required />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Correo Electrónico *</Label>
                  <Input id="email" type="email" placeholder="juan.perez@ejemplo.com" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="telefono">Teléfono</Label>
                  <Input id="telefono" placeholder="+52 33 1234 5678" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Contraseña *</Label>
                  <Input id="password" type="password" onChange={(e) => validatePassword(e.target.value)} required />
                  {passwordError && <p className="text-xs text-red-500">{passwordError}</p>}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="rol">Rol *</Label>
                  <Select>
                    <SelectTrigger id="rol">
                      <SelectValue placeholder="Seleccionar rol" />
                    </SelectTrigger>
                    <SelectContent>
                      {userRole === "admin_global" && (
                        <SelectItem value="admin_global">Administrador Global</SelectItem>
                      )}
                      <SelectItem value="admin">Administrador</SelectItem>
                      <SelectItem value="usuario">Usuario</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Guardar Usuario</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Buscar por nombre, apellido o email..."
            className="pl-8 mb-6"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsuarios.map((usuario) => (
            <Card key={usuario.id}>
              <CardHeader className="pb-2">
                <div className="flex justify-between">
                  <CardTitle className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                    {usuario.nombre} {usuario.apellido}
                  </CardTitle>
                  <Badge variant={getRoleBadgeVariant(usuario.rol)}>{getRoleDisplayName(usuario.rol)}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm">
                    <span className="font-medium">Email:</span> {usuario.email}
                  </p>
                  {usuario.telefono && (
                    <p className="text-sm">
                      <span className="font-medium">Teléfono:</span> {usuario.telefono}
                    </p>
                  )}
                  <div className="pt-4 flex flex-wrap gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedUser(usuario)
                        setIsEditDialogOpen(true)
                      }}
                    >
                      <Edit className="mr-2 h-4 w-4" />
                      Editar
                    </Button>

                    {canChangePassword(usuario) && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedUser(usuario)
                          setIsPasswordDialogOpen(true)
                        }}
                      >
                        <Key className="mr-2 h-4 w-4" />
                        Contraseña
                      </Button>
                    )}

                    {canChangeEmail(usuario) && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedUser(usuario)
                          setIsEmailDialogOpen(true)
                        }}
                      >
                        <Mail className="mr-2 h-4 w-4" />
                        Email
                      </Button>
                    )}

                    {canDeleteUser(usuario) && (
                      <Button variant="outline" size="sm" className="text-red-500 hover:text-red-700">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Eliminar
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Dialog para editar usuario */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Editar Usuario</DialogTitle>
              <DialogDescription>Modifica la información del usuario.</DialogDescription>
            </DialogHeader>
            {selectedUser && (
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="edit-nombre">Nombre</Label>
                    <Input id="edit-nombre" defaultValue={selectedUser.nombre} />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="edit-apellido">Apellido</Label>
                    <Input id="edit-apellido" defaultValue={selectedUser.apellido} />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-telefono">Teléfono</Label>
                  <Input id="edit-telefono" defaultValue={selectedUser.telefono} />
                </div>
                {userRole === "admin_global" && (
                  <div className="grid gap-2">
                    <Label htmlFor="edit-rol">Rol</Label>
                    <Select defaultValue={selectedUser.rol}>
                      <SelectTrigger id="edit-rol">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin_global">Administrador Global</SelectItem>
                        <SelectItem value="admin">Administrador</SelectItem>
                        <SelectItem value="usuario">Usuario</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>
            )}
            <DialogFooter>
              <Button onClick={() => setIsEditDialogOpen(false)}>Guardar Cambios</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Dialog para cambiar contraseña */}
        <Dialog open={isPasswordDialogOpen} onOpenChange={setIsPasswordDialogOpen}>
          <DialogContent className="sm:max-w-[400px]">
            <DialogHeader>
              <DialogTitle>Cambiar Contraseña</DialogTitle>
              <DialogDescription>
                Cambiar la contraseña de {selectedUser?.nombre} {selectedUser?.apellido}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="new-password">Nueva Contraseña</Label>
                <Input id="new-password" type="password" onChange={(e) => validatePassword(e.target.value)} />
                {passwordError && <p className="text-xs text-red-500">{passwordError}</p>}
                <p className="text-xs text-gray-500">
                  Debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial
                </p>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={() => setIsPasswordDialogOpen(false)}>Cambiar Contraseña</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Dialog para cambiar email */}
        <Dialog open={isEmailDialogOpen} onOpenChange={setIsEmailDialogOpen}>
          <DialogContent className="sm:max-w-[400px]">
            <DialogHeader>
              <DialogTitle>Cambiar Email</DialogTitle>
              <DialogDescription>
                Cambiar el email de {selectedUser?.nombre} {selectedUser?.apellido}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="new-email">Nuevo Email</Label>
                <Input id="new-email" type="email" defaultValue={selectedUser?.email} />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={() => setIsEmailDialogOpen(false)}>Cambiar Email</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  )
}
