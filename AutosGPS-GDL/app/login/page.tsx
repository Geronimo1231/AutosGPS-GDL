"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function Login() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const role = searchParams.get("role") || ""

  const [email, setEmail] = useState(
    role === "admin_global"
      ? "admin.global@vehiculos.com"
      : role === "admin"
        ? "admin@vehiculos.com"
        : role === "user"
          ? "usuario@vehiculos.com"
          : "",
  )
  const [password, setPassword] = useState(
    role === "admin_global" ? "AdminGlobal@123" : role === "admin" ? "Admin@123" : role === "user" ? "Usuario@123" : "",
  )
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      // Simulación de autenticación
      if (email === "admin.global@vehiculos.com" && password === "AdminGlobal@123") {
        // Redirigir al panel de administrador global
        localStorage.setItem("userRole", "admin_global")
        localStorage.setItem("userId", "1")
        router.push("/admin/dashboard")
      } else if (email === "admin@vehiculos.com" && password === "Admin@123") {
        // Redirigir al panel de administrador normal
        localStorage.setItem("userRole", "admin")
        localStorage.setItem("userId", "2")
        router.push("/admin/dashboard")
      } else if (email === "usuario@vehiculos.com" && password === "Usuario@123") {
        // Redirigir al panel de usuario
        localStorage.setItem("userRole", "usuario")
        localStorage.setItem("userId", "3")
        router.push("/user/dashboard")
      } else {
        setError("Credenciales inválidas. Por favor, intente nuevamente.")
      }
    } catch (err) {
      setError("Error al iniciar sesión. Por favor, intente nuevamente.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md">
        <Link href="/" className="flex items-center text-sm text-gray-600 mb-6 hover:text-gray-900">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Volver al inicio
        </Link>

        <Card>
          <CardHeader>
            <CardTitle>Iniciar Sesión</CardTitle>
            <CardDescription>Ingrese sus credenciales para acceder al sistema</CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Correo electrónico</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="correo@ejemplo.com"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Contraseña</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              <Button className="w-full mt-6" type="submit" disabled={loading}>
                {loading ? "Iniciando sesión..." : "Iniciar sesión"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col items-center">
            <div className="text-sm text-gray-500 mt-2 space-y-1">
              <p>
                <strong>Admin Global:</strong> admin.global@vehiculos.com / AdminGlobal@123
              </p>
              <p>
                <strong>Admin Normal:</strong> admin@vehiculos.com / Admin@123
              </p>
              <p>
                <strong>Usuario:</strong> usuario@vehiculos.com / Usuario@123
              </p>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
