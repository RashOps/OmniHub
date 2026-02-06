import api from "./api"

export const noteService = {
    getAll: async () => {
        try {
            return await api.get("notes").json()
        } catch (error) {
            const errorData = await error.response?.json()
            throw errorData?.message || "Erreur lors de la récupération des notes"
        }
    },

    create: async (newNote) => {
        try {
            return await api.post("notes", { json: newNote }).json()
        } catch (error) {
            const errorData = await error.response?.json()
            throw errorData?.message || "Erreur lors de la création de la note"
        }
    },

    update: async (id, updatedData) => {
        try {
            return await api.put(`notes/${id}`, { json: updatedData }).json()
        } catch (error) {
            const errorData = await error.response?.json()
            throw errorData?.message || "Erreur lors de la mise à jour de la note"
        }
    },

    deleteAll: async () => {
    return await api.delete("notes/clear/all");
    },

    delete: async (id) => {
        try {
            return await api.delete(`notes/${id}`)
        } catch (error) {
            const errorData = await error.response?.json()
            throw errorData?.message || "Erreur lors de la suppression de la note"
        }
    },
}