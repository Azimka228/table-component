import axios from 'axios'

export const instance = axios.create({
  baseURL: 'https://dummyjson.com/', /* "<-- Fake REST API for testing table component"*/
})

export const productsAPI = {
  getProducts() {
    return instance.get<ResponseProductsType>('products')
  },
}

// TYPES

type ResponseProductsType = {
  limit: number
  products: Array<ProductType>
  skip: number
  total: number
}

export type ProductType = {
  id:number
  title: string
  description: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  brand: string
  category: string
  thumbnail:string
  images: Array<string>
}

