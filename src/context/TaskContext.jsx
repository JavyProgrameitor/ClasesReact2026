import { createContext, useContext, useState } from "react"

const TaskContext = createContext(null)

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      name: "Luis Miguel",
      task: "LLamar a Citroen",
      category: "Personal",
      priority: "Alta",
      completed: false,
    },
    {
      id: 2,
      name: "Pepe Ruiz",
      task: "Comer en casa de Pepe",
      category: "Personal",
      priority: "Alta",
      completed: false,
    },
  ])

  const addTask = (newTask) => {
    setTasks((prev) => [
      ...prev,
      { id: Date.now(), completed: false, ...newTask },
    ])
  }

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    )
  }

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id))
  }

  return (
    <TaskContext value={{ tasks, addTask, toggleTask, deleteTask }}>
      {children}
    </TaskContext>
  )
}

export const useTasks = () => {
  const context = useContext(TaskContext)
  if (!context) {
    throw new Error("useTasks debe usarse dentro de <TaskProvider>")
  }
  return context
}