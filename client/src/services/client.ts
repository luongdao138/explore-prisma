import axios from "axios";

const client = axios.create({
     baseURL: import.meta.env.VITE_SERVER_URL,
     withCredentials: true
})

client.interceptors.response.use((res) => {
      return res
}, (error) => {
      if(error.response) {
         return Promise.reject(error.response.data)
      } else {
         return Promise.reject({ message: 'Opps! Something went wrong!' })
      }
}) 

export default client
