import axios from 'axios'
const instance = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}/wp-json/wp/v2`
})

console.log('instance', instance)
export default instance
