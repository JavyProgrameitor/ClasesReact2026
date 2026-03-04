import { useState } from "react"
import { Trash2 } from "lucide-react"
import { useTasks } from "@/context/TaskContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export const FormsContext = () => {
  const { tasks, addTask, toggleTask, deleteTask } = useTasks()

  const [formData, setFormData] = useState({
    name: "",
    task: "",
    category: "",
    priority: "",
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!formData.name || !formData.task) {
      console.error("Faltan campos obligatorios")
      return
    }

    addTask(formData)

    setFormData({
      name: "",
      task: "",
      category: "",
      priority: "",
    })
  }

  const pendingTasks = tasks.filter((t) => !t.completed).length

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "Alta":
        return "bg-red-500 hover:bg-red-600"
      case "Media":
        return "bg-yellow-500 hover:bg-yellow-600"
      case "Baja":
        return "bg-green-500 hover:bg-green-600"
      default:
        return "bg-slate-500"
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Gestión de Tareas</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold border-b pb-2">
            Tareas Pendientes ({pendingTasks})
          </h2>

          <div className="flex flex-col gap-3">
            {tasks.map((tarea) => (
              <div
                key={tarea.id}
                className="flex items-start gap-3 p-3 border rounded-lg transition-colors bg-card hover:bg-accent/50"
              >
                <Checkbox
                  id={`task-${tarea.id}`}
                  className="mt-1"
                  checked={tarea.completed}
                  onCheckedChange={() => toggleTask(tarea.id)}
                />

                <div className="flex-1 flex flex-col gap-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                    <label
                      htmlFor={`task-${tarea.id}`}
                      className="text-sm font-medium leading-tight cursor-pointer"
                    >
                      {tarea.task}
                    </label>

                    <div className="flex items-center gap-2 shrink-0">
                      <Badge variant="outline" className="text-[10px] px-1.5 h-5">
                        {tarea.category}
                      </Badge>

                      <Badge
                        className={`text-[10px] px-1.5 h-5 text-white ${getPriorityColor(
                          tarea.priority
                        )}`}
                      >
                        {tarea.priority}
                      </Badge>

                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteTask(tarea.id)}
                        className="cursor-pointer h-6 w-6 text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <span className="text-xs text-muted-foreground">
                    Asignado a:{" "}
                    <span className="font-medium text-foreground">{tarea.name}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle>Nueva Tarea</CardTitle>
              <CardDescription>Rellena los datos para asignar una nueva tarea.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="name">Responsable</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Ej. María Pérez"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="task">Descripción de la tarea</Label>
                  <Input
                    id="task"
                    name="task"
                    value={formData.task}
                    onChange={handleInputChange}
                    placeholder="Ej. Preparar informe mensual"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <Label>Categoría</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) =>
                        setFormData((prev) => ({ ...prev, category: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Trabajo">Trabajo</SelectItem>
                        <SelectItem value="Personal">Personal</SelectItem>
                        <SelectItem value="Estudios">Estudios</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Label>Prioridad</Label>
                    <Select
                      value={formData.priority}
                      onValueChange={(value) =>
                        setFormData((prev) => ({ ...prev, priority: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Nivel..." />
                      </SelectTrigger>
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