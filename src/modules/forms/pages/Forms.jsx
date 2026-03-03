
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
import { useState } from "react"
import { Trash2 } from "lucide-react"

export const Forms = () => {

    const [tasks, setTasks] = useState([
        {
            id: 1,
            name: "Luis Miguel",
            task: "LLamar a Citroen",
            category: "Personal",
            priority: "Alta",
            completed: false
        },
        {
            id: 2,
            name: "Luis Miguel",
            task: "LLamar a Citroen",
            category: "Personal",
            priority: "Alta",
            completed: false
        }
    ])

    const [formData, setFormData] = useState({

        name: "",
        task: "",
        category: "",
        priority: ""

    })

    const handleInputChange = (e) => {
        //  console.log(e.target.name)
        //  console.log(e.target.value)
        const { name, value } = e.target

        setFormData({
            ...formData,
            [name]: value,
        })

        console.log(formData)
    }


    const handleSubmit = (e) => {
        e.preventDefault()

        if (!formData.name || !formData.task) {
            console.error
            return
        }

        setTasks([
            ...tasks,
            {
                id: Date.now(),
                completed: false,
                ...formData
                //name: formData.name,    ----Formas válidas
                //task: formData.task,
                //category: formData.category,
                //priority: formData.priority
            }
        ])

        console.log("Formulario enviado ✅")
        console.log(formData)

        // Limpiar formulario
        setFormData({
            name: "",
            task: "",
            category: "",
            priority: ""
        })
    }

    // ✅ Aquí está la funcionalidad del onCheckedChange
    const ToggleTask = (id) => {
        setTasks((prev) =>
            prev.map((t) =>
                t.id === id ? { ...t, completed: !t.completed } : t
            )
        )
    }
    const deleteTask = (id) => {
        setTasks((prev) => prev.filter((task) => task.id !== id))
    }

    const pendingTasks = tasks.filter(task => !task.completed).length

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'Alta': return "bg-red-500 hover:bg-red-600"
            case 'Media': return "bg-yellow-500 hover:bg-yellow-600"
            case 'Baja': return "bg-green-500 hover:bg-green-600"
            default: return "bg-slate-500"
        }
    }

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Gestión de Tareas</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                {/* ================= COLUMNA 1: LISTA COMPACTA ================= */}
                <div className="flex flex-col gap-4">
                    <h2 className="text-xl font-semibold border-b pb-2">
                        Tareas Pendientes ({pendingTasks})
                    </h2>

                    <div className="flex flex-col gap-3">

                        {/* TAREA DE EJEMPLO (Plantilla estática) */}
                        {tasks.map(tarea => (

                            <div
                                key={tarea.id}

                                className="flex items-start gap-3 p-3 border rounded-lg transition-colors bg-card hover:bg-accent/50">

                                <Checkbox
                                    id={`task-${tarea.id}`}
                                    className="mt-1"
                                    checked={tarea.completed}
                                    onCheckedChange={() => ToggleTask(tarea.id)}
                                />

                                <div className="flex-1 flex flex-col gap-1 min-w-0">
                                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                                        <label
                                            htmlFor="task-1"
                                            className="text-sm font-medium leading-tight cursor-pointer"
                                        >
                                            {tarea.task}
                                        </label>

                                        <div className="flex items-center gap-2 shrink-0">
                                            <Badge variant="outline" className="text-[10px] px-1.5 h-5">
                                                {tarea.category}
                                            </Badge>

                                            <Badge
                                                className={`text-[10px] px-1.5 h-5 text-white
                                                      ${getPriorityColor(tarea.priority)}`}
                                            >
                                                {tarea.priority}
                                            </Badge>

                                            {/* Botón eliminar */}
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
                                        Asignado a: <span className="font-medium text-foreground">{tarea.name}</span>
                                    </span>
                                </div>
                            </div>
                        ))}
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
                                        <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
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
                                        <Select value={formData.priority} onValueChange={(value) => setFormData({ ...formData, priority: value })}>
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