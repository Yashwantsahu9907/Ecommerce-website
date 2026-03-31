import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'
import RelatedProduct from '../components/RelatedProduct'

const Product = () => {
  const { productId } = useParams()
  const { products, currency } = useContext(ShopContext)

  const [productData, setProductData] = useState(null)
  const [image, setImage] = useState('')
  const [size, setSize] = useState('')

  // Fetch product
  const fetchProductData = () => {
    if (!products || products.length === 0) return

    const foundProduct = products.find((item) => item._id === productId)

    if (foundProduct) {
      setProductData(foundProduct)
      setImage(foundProduct.image?.[0] || '')
    }
  }

  useEffect(() => {
    fetchProductData()
  }, [productId, products])

  // Loading state
  if (!productData) {
    return <div className='text-center mt-20'>Loading...</div>
  }

  return (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>

      {/* -----------Product Data----------- */}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>

        {/* ---------Product Images---------- */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>

          {/* Thumbnail Images */}
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
            {productData.image?.map((item, index) => (
              <img
                key={index}
                onClick={() => setImage(item)}
                src={item}
                className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer'
                alt=""
              />
            ))}
          </div>

          {/* Main Image */}
          <div className='w-full sm:w-[80%]'>
            <img
              className='w-full h-auto'
              src={image || productData.image?.[0]}
              alt=""
            />
          </div>
        </div>

        {/* -----------Product Info----------- */}
        <div className='flex-1'>
          <h1 className='font-medium text-2xl mt-2'>
            {productData.name}
          </h1>

          {/* Rating */}
          <div className='flex items-center gap-1 mt-2'>
            <img src={assets.star_icon} className="w-3" alt="" />
            <img src={assets.star_icon} className="w-3" alt="" />
            <img src={assets.star_icon} className="w-3" alt="" />
            <img src={assets.star_icon} className="w-3" alt="" />
            <img src={assets.star_dull_icon} className="w-3" alt="" />
            <p className='pl-2'>(122)</p>
          </div>

          {/* Price */}
          <p className='mt-5 text-3xl font-medium'>
            {currency}{productData.price}
          </p>

          {/* Description */}
          <p className='mt-5 text-gray-700 md:w-4/5'>
            {productData.description}
          </p>

          {/* -------- Size Selection (SAFE) -------- */}
          <div className='flex flex-col gap-4 my-8'>
            <p>Select Size</p>
            <div className='flex gap-2'>
              {productData.sizes.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setSize(item)}
                  className={`border py-2 px-4 bg-gray-100 ${item === size ? 'border-orange-700' : ''}`}>{item}</button>
              ))}

            </div>
          </div>

          {/* Add to Cart */}
          <button className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700'>
            ADD TO CART
          </button>

         <hr className='mt-8 sm:w-4/5 border-gray-300/40' />

          {/* Info */}
          <div className='text-sm text-gray-700 mt-5 flex flex-col gap-1'>
            <p>100% Original product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days</p>
          </div>
        </div>
      </div>

      {/* -------- Description -------- */}
      <div className='mt-20'>
        <div className='flex'>
          <b className='border border-gray-300 px-5 py-3 text-sm bg-white'>
            Description
          </b>
          <p className='border border-gray-300 px-5 py-3 text-sm bg-white'>
            Reviews (122)
          </p>
        </div>

        <div className='flex flex-col gap-4 border border-gray-300 px-6 py-6 text-sm text-gray-500'>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit, ut sapiente! Voluptas
            accusantium architecto veniam, sunt earum odit velit? Earum itaque obcaecati aspernatur quaerat deleniti inventore possimus est omnis sapiente.</p>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque ut necessitatibus tempore ea repellendus? Vitae est aliquam aperiam iusto esse, totam hic nesciunt aut voluptatibus! Quis, dolorem et. Numquam, magni?</p>
        </div>
      </div>

      {/* -------- Related Products -------- */}
      <RelatedProduct
        category={productData.category}
        subCategory={productData.subCategory}
      />
    </div>
  )
}

export default Product