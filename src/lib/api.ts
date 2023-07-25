import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://189.90.36.16/:3330',
})
