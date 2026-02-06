import api from "./api"

export const todoService = {
    getAll: async () => {
        try {
            return await api.get("todos").json()
        } catch (error) {
            const errorData = await error.response?.json()
            throw errorData?.message || "Erreur lors de la récupération des tâches"
        }
    },

    create: async (newTodo) => {
        try {
            return await api.post("todos", { json: newTodo }).json()
        } catch (error) {
            const errorData = await error.response?.json()
            throw errorData?.message || "Erreur lors de la création de la tâche"
        }
    },

    update: async (id, updatedData) => {
        try {
            return await api.put(`todos/${id}`, { json: updatedData }).json()
        } catch (error) {
            const errorData = await error.response?.json()
            throw errorData?.message || "Erreur lors de la mise à jour de la tâche"
        }
    },

    deleteAll: async () => {
    return await api.delete("todos/clear/all");
    },

    delete: async (id) => {
        try {
            return await api.delete(`todos/${id}`)
        } catch (error) {
            const errorData = await error.response?.json()
            throw errorData?.message || "Erreur lors de la suppression de la tâche"
        }
    },
}