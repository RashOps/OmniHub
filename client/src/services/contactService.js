import api from "./api"

export const contactService = {
    getAll: async () => {
        try {
            return await api.get("contacts").json()
        } catch (error) {
            const errorData = await error.response?.json()
            throw errorData?.message || "Erreur lors de la récupération des contacts"
        }
    },

    create: async (newContact) => {
        try {
            return await api.post("contacts", { json: newContact }).json()
        } catch (error) {
            const errorData = await error.response?.json()
            throw errorData?.message || "Erreur lors de la création du contact"
        }
    },

    update: async (id, updatedData) => {
        try {
            return await api.put(`contacts/${id}`, { json: updatedData }).json()
        } catch (error) {
            const errorData = await error.response?.json()
            throw errorData?.message || "Erreur lors de la mise à jour du contact"
        }
    },

    delete: async (id) => {
        try {
            return await api.delete(`contacts/${id}`)
        } catch (error) {
            const errorData = await error.response?.json()
            throw errorData?.message || "Erreur lors de la suppression du contact"
        }
    }
}