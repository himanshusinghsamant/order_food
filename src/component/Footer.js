import React from 'react'

const Footer = () => {
  return (
    <div>
      <section className='text-white p-[100px] bg-lime-900 '>
        <span className='text-2xl font-bold tracking-wider border-b-4  border-white'>
        Order<strong className='text-orange-300 font-extrabold'>Food</strong>
        </span>
       <div>
        <div className=''>
            <li>Home</li>
            <li>MyOrders</li>
            <li>MyCart</li>
        </div>
       </div>
      </section>
      <div className='text-center py-5 border-t-[1px] border-white  bg-lime-900  text-white'>
            <h3>Copyrigh © 2024 OrderFood.in</h3>
        </div>
    </div>
  )
}

export default Footer
