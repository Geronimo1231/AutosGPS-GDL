"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { LayoutDashboard, Car, Users, UserCheck, Map, Menu, LogOut } from "lucide-react"

const navigation = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Vehículos", href: "/admin/vehiculos", icon: Car },
  { name: "Usuarios", href: "/admin/usuarios", icon: Users },
  { name: "Asignaciones", href: "/admin/asignaciones", icon: UserCheck },
  { name: "Mapa", href: "/admin/mapa", icon: Map },
]

interface AdminLayoutProps {
  children: React.ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleLogout = () => {
    router.push("/")
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar for desktop */}
      <div className="hidden md:flex md:w-64 md:flex-col">
        <div className="flex flex-col flex-grow pt-5 overflow-y-auto bg-white border-r">
          <div className="flex items-center flex-shrink-0 px-4">
            <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
          </div>
          <div className="mt-5 flex-grow flex flex-col">
            <nav className="flex-1 px-2 pb-4 space-y-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    <item.icon className="mr-3 h-5 w-5" />
                    {item.name}
                  </Link>
                )
              })}
            </nav>
            <div className="px-2 pb-4">
              <Button variant="outline" className="w-full justify-start" onClick={handleLogout}>
                <LogOut className="mr-3 h-5 w-5" />
                Cerrar Sesión
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top bar */}
        <div className="bg-white border-b px-4 py-3 flex items-center justify-between md:hidden">
          <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0">
              <div className="flex flex-col h-full">
                <div className="flex items-center flex-shrink-0 px-4 py-5">
                  <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
                </div>
                <div className="flex-grow flex flex-col">
                  <nav className="flex-1 px-2 pb-4 space-y-1">
                    {navigation.map((item) => {
                      const isActive = pathname === item.href
                      return (
                        <Link
                          key={item.name}
                          href={item.href}
                          onClick={() => setSidebarOpen(false)}
                          className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                            isActive
                              ? "bg-primary text-primary-foreground"
                              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                          }`}
                        >
                          <item.icon className="mr-3 h-5 w-5" />
                          {item.name}
                        </Link>
                      )
                    })}
                  </nav>
                  <div className="px-2 pb-4">
                    <Button variant="outline" className="w-full justify-start" onClick={handleLogout}>
                      <LogOut className="mr-3 h-5 w-5" />
                      Cerrar Sesión
                    </Button>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
          <h1 className="text-lg font-semibold">Admin Panel</h1>
          <div className="w-8" /> {/* Spacer */}
        </div>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  )
}
