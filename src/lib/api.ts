"use client"
import axios from 'axios'

export const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
  headers: {
    Authorization: typeof window !== "undefined" && localStorage.getItem(process.env.NEXT_PUBLIC_TOKEN_NAME as string) 
    ? `Bearer ${localStorage.getItem(process.env.NEXT_PUBLIC_TOKEN_NAME as string)}` 
    : null, 
    'Access-Control-Allow-Credentials':true,
  }
})
