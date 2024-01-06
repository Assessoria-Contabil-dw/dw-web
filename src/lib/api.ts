import axios from 'axios'

export const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
  withCredentials: process.env.NODE_ENV === 'development',
})
