import axios from 'axios'
const instance = axios.create({
  baseURL: 'https://nevypustdusi.cz/wp-json/wp/v2'
})

console.log('instance', instance)
export default instance
