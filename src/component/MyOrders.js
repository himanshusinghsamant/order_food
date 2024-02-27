import React from 'react'
import { useState, useEffect } from 'react'

const MyOrders = () => {

  const [orderData, setOrderData] = useState();
  
  async function fetchingMyOrdersData(){
        try {
          let response = await fetch("http://localhost:5000/api/myorderdata",{
            method:"POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: localStorage.getItem('userEmail')
            })
          })
          let data = await response.json()
          setOrderData(data)
        } catch (error) {
          console.log(error)
          console.log('error fetching myorder data', error.message)
        }
  }
  useEffect(()=>{
    fetchingMyOrdersData()
  },[])

  console.log(orderData)

  return (
    <div>
      <h1>This is myOrders component</h1>
      <section className='p-[100px] text-white'>
        {
          orderData !== undefined ? Array(orderData).map((data)=>{
            return(
              data.myOrderData.order_data.slice(0).reverse().map((Items)=>{
              return(
                Items.map((arrData ,index)=>{
                  return(
                    <div className='my-2'>
                      {arrData.Order_date ?
                      <h2 className='text-yellow-200 font-bold tracking-wider text-xl mt-11'>
                         {arrData.Order_date}
                         <hr />
                      </h2>:
                      <div className=''>
                        <div key={arrData.id} className="flex space-x-4">
                          <h2 className='mx-3 text-gray-400 font-bold'>{index}.</h2>
                          <h1>{arrData.name} /</h1>
                          <span>{arrData.qty} /</span>
                          <span>{arrData.foodQty} /</span>
                          <span>{arrData.price} /</span>
                          <span>{arrData.totalPrice} /</span>
                        </div>
                      </div>
                      
                      }
                    </div>
                  )
                })
              )
              })
            )
          }) : ''
        }
      </section>
    </div>
  )
}

export default MyOrders
