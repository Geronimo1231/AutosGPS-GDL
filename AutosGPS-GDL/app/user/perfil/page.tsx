"use client"

import type React from "react"

import { useState } from "react"
import UserLayout from "@/components/user-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { User, Camera, Lock } from "lucide-react"

export default function UserPerfil() {
  const [nombre, setNombre] = useState("María")
  const [apellido, setApellido] = useState("Rodríguez")
  const [telefono, setTelefono] = useState("+34 612 345 678")
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [successMessage, setSuccessMessage] = useState("")

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

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault()
    setSuccessMessage("Perfil actualizado correctamente")
    setTimeout(() => setSuccessMessage(""), 3000)
  }

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault()

    if (newPassword !== confirmPassword) {
      setPasswordError("Las contraseñas no coinciden")
      return
    }

    if (!validatePassword(newPassword)) {
      return
    }

    setSuccessMessage("Contraseña cambiada correctamente")
    setCurrentPassword("")
    setNewPassword("")
    setConfirmPassword("")
    setTimeout(() => setSuccessMessage(""), 3000)
  }

  return (
    <UserLayout>
      <div className="grid gap-6 max-w-4xl">
        <h1 className="text-3xl font-bold">Mi Perfil</h1>

        {successMessage && (
          <Alert className="border-green-200 bg-green-50">
            <AlertDescription className="text-green-800">{successMessage}</AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="perfil" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="perfil">Información Personal</TabsTrigger>
            <TabsTrigger value="password">Cambiar Contraseña</TabsTrigger>
          </TabsList>

          <TabsContent value="perfil">
            <Card>
              <CardHeader>
                <CardTitle>Información Personal</CardTitle>
                <CardDescription>Actualiza tu información personal y foto de perfil</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-4">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src="/placeholder.svg?height=80&width=80" />
                    <AvatarFallback>
                      <User className="w-8 h-8" />
                    </AvatarFallback>
                  </Avatar>
                  <Button variant="outline">
                    <Camera className="w-4 h-4 mr-2" />
                    Cambiar Foto
                  </Button>
                </div>

                <form onSubmit={handleProfileUpdate} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="nombre">Nombre</Label>
                      <Input id="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="apellido">Apellido</Label>
                      <Input id="apellido" value={apellido} onChange={(e) => setApellido(e.target.value)} required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Correo Electrónico</Label>
                    <Input id="email" type="email" value="usuario@vehiculos.com" disabled />
                    <p className="text-sm text-gray-500">El correo electrónico no se puede modificar</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="telefono">Teléfono</Label>
                    <Input id="telefono" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
                  </div>

                  <Button type="submit">Guardar Cambios</Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="password">
            <Card>
              <CardHeader>
                <CardTitle>Cambiar Contraseña</CardTitle>
                <CardDescription>Actualiza tu contraseña para mantener tu cuenta segura</CardDescription>
              </CardHeader>
              <CardContent>
                {passwordError && (
                  <Alert variant="destructive" className="mb-4">
                    <AlertDescription>{passwordError}</AlertDescription>
                  </Alert>
                )}

                <form onSubmit={handlePasswordChange} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Contraseña Actual</Label>
                    <Input
                      id="currentPassword"
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="newPassword">Nueva Contraseña</Label>
                    <Input
                      id="newPassword"
                      type="password"
                      value={newPassword}
                      onChange={(e) => {
                        setNewPassword(e.target.value)
                        if (e.target.value) validatePassword(e.target.value)
                      }}
                      required
                    />
                    <p className="text-xs text-gray-500">
                      Debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirmar Nueva Contraseña</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>

                  <Button type="submit">
                    <Lock className="w-4 h-4 mr-2" />
                    Cambiar Contraseña
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </UserLayout>
  )
}
