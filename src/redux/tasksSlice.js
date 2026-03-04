import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  taskList: [
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
  ],
}

const tasksSlice = createSlice({
  name: "tareas",
  initialState,
  reducers: {
    addTask: (state, action) => {
      const newTask = {
        id: Date.now(),
        completed: false,
        ...action.payload,
      }

      state.taskList.push(newTask)
    },

    toggleTask: (state, action) => {
      const id = action.payload

      const task = state.taskList.find((t) => t.id === id)

      if (task) {
        task.completed = !task.completed
      }
    },

    deleteTask: (state, action) => {
      const id = action.payload

      state.taskList = state.taskList.filter((task) => task.id !== id)
    },
  },
})

export const { addTask, toggleTask, deleteTask } = tasksSlice.actions

export default tasksSlice.reducer