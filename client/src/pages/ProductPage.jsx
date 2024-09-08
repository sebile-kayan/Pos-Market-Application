import React from 'react'
import Header from '../components/header/Header'
import Editle from '../components/products/Editle'

const ProductPage = () => {
  return (
   <>
   <Header/>
   <div className='px-6'>
    <h1 className='text-4xl font-bold text-center mb-4'>Ürünler</h1>
    <Editle/>
   </div>
   </>
  )
}

export default ProductPage
