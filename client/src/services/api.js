import ky from "ky"

const api = ky.create({
    prefixUrl: "http://localhost:5000/api",
    timeout: 10000, // 10s
    retry: 2,
    hooks: {
        beforeRequest: [
            request => { console.log(`Envoi vers : ${request.url}`)}
        ]
    }
})

export default api