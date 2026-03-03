import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export const Forms = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Gestión de Tareas</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* ================= COLUMNA 1: LISTA COMPACTA ================= */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold border-b pb-2">
            Tareas Pendientes (1)
          </h2>
          
          <div className="flex flex-col gap-3">
            
            {/* TAREA DE EJEMPLO (Plantilla estática) */}
            <div className="flex items-start gap-3 p-3 border rounded-lg transition-colors bg-card hover:bg-accent/50">
              
              <Checkbox 
                id="task-1"
                className="mt-1" 
              />
              
              <div className="flex-1 flex flex-col gap-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                  <label 
                    htmlFor="task-1"
                    className="text-sm font-medium leading-tight cursor-pointer"
                  >
                    Revisar correos del equipo
                  </label>
                  
                  <div className="flex items-center gap-1 shrink-0">
                    <Badge variant="outline" className="text-[10px] px-1.5 h-5">
                      Trabajo
                    </Badge>
                    <Badge className="text-[10px] px-1.5 h-5 bg-red-500 hover:bg-red-600 text-white">
                      Alta
                    </Badge>
                  </div>
                </div>
                
                <span className="text-xs text-muted-foreground">
                  Asignado a: <span className="font-medium text-foreground">Juan</span>
                </span>
              </div>
            </div>
            {/* FIN TAREA DE EJEMPLO */}

          </div>
        </div>

        {/* ================= COLUMNA 2: FORMULARIO ================= */}
        <div>
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle>Nueva Tarea</CardTitle>
              <CardDescription>Rellena los datos para asignar una nueva tarea.</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="flex flex-col gap-4">
                
                <div className="flex flex-col gap-2">
                  <Label htmlFor="name">Responsable</Label>
                  <Input 
                    id="name" 
                    name="name" 
                    placeholder="Ej. María Pérez" 
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="task">Descripción de la tarea</Label>
                  <Input 
                    id="task" 
                    name="task" 
                    placeholder="Ej. Preparar informe mensual" 
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <Label>Categoría</Label>
                    <Select>
                      <SelectTrigger><SelectValue placeholder="Selecciona..." /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Trabajo">Trabajo</SelectItem>
                        <SelectItem value="Personal">Personal</SelectItem>
                        <SelectItem value="Estudios">Estudios</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Label>Prioridad</Label>
                    <Select>
                      <SelectTrigger><SelectValue placeholder="Nivel..." /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Alta">Alta</SelectItem>
                        <SelectItem value="Media">Media</SelectItem>
                        <SelectItem value="Baja">Baja</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button type="submit" className="mt-4 w-full">
                  Añadir Tarea
                </Button>
                
              </form>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  )
}