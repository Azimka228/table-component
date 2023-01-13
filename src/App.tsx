import React, { useEffect } from 'react'
import './App.css'
import { productsAPI } from './api/api'

function App() {
  useEffect(()=>{
    productsAPI.getProducts().then(res=>{
      res.data.products.map(el => console.log(el.discountPercentage))
    })
  },[])
  return <div className='App'>
    test
  </div>
}

export default App
