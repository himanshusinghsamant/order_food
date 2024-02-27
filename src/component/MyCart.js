import React from "react";
import { useSelector } from "react-redux";
import { FaTrashCan } from "react-icons/fa6";
import { BiSolidEdit } from "react-icons/bi";
import { deleteItem } from "../Redux/CounterSlice";
import { removeAllItems } from "../Redux/CounterSlice";
import { useDispatch } from "react-redux";
import { dropCartData } from "../Redux/CounterSlice";

const MyCart = () => {
  const ItemsData = useSelector((state) => state.counter.selectedData);
  const Dispatch = useDispatch()

  const Total_Price = ItemsData.reduce((total, food)=>{
    return total + food.totalPrice;
  },0)


  async function handleCheckOut(){
    let userEmail = localStorage.getItem('userEmail')
    let response = await fetch('http://localhost:5000/api/orderdata', {
      method:'POST',
      headers:{
        "Content-Type": "application/json",
      },
      body:JSON.stringify({
        order_data: ItemsData,
        email: userEmail,
        order_date: new Date().toDateString()
      })
    })
    console.log('order_response', response)
    if(response.status === 200){
      Dispatch(dropCartData());
    }
  }

  return (
    <div className="pt-[80px]">
      <div className="text-white font-semibold text-2xl text-center my-11">
        <h1>Check Your Selected Items You Added in a Cart!</h1>
        <div>
          <button onClick={()=>Dispatch(removeAllItems())} className="border-2 border-white px-3 py-1 rounded-xl hover:text-red-300 hover:border-red-700 transition-all duration-300 ease-in-out text-base mx-3 mt-7">Remove All</button>
          <button onClick={handleCheckOut} className="border-2 border-white px-3 py-1 rounded-xl hover:text-green-300 hover:border-green-700 transition-all duration-300 ease-in-out text-base mx-3 mt-7">Check Out</button>
        </div>
        <h2 className="my-10">Total Price : {Total_Price}</h2>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-blue-100 dark:text-blue-100">
          <thead className="text-xs text-white uppercase bg-gray-500 border-b border-gray-300 dark:text-white">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 bg-gray-700 font-bold text-lg"
              >
                Food name
              </th>
              <th scope="col" className="px-6 py-3 font-bold text-lg">
                Food Quantity
              </th>
              <th
                scope="col"
                className="px-6 py-3 bg-gray-700 font-bold text-lg"
              >
                Number of Quantity
              </th>
              <th scope="col" className="px-6 py-3 font-bold text-lg">
                Price
              </th>
              <th
                scope="col"
                className="px-6 py-3  bg-gray-700 font-bold text-lg"
              >
                Food Total
              </th>
              <th scope="col" className="px-6 py-3 font-bold text-lg">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {ItemsData.length !== 0 ? (
              ItemsData.map((item,index) => {
                return (
                  <tr key={index} className="bg-gray-500 border-b border-gray-300">
                    <th
                      scope="row"
                      className="px-6 py-4 bg-gray-700 text-white whitespace-nowrap  font-bold"
                    >
                      {item.name}
                    </th>
                    <td className="px-6 py-4 font-bold">{item.foodQty}</td>
                    <td className="px-6 py-4 bg-gray-700 font-bold">
                      {item.qty}
                    </td>
                    <td className="px-6 py-4 font-bold">{item.price}</td>
                    <td className="px-6 py-4 bg-gray-700 font-bold">
                      {item.totalPrice}
                    </td>
                    <td className="px-6 py-4 font-bold flex justify-around">
                      {/* <a href="#" className="font-medium text-white hover:underline">Edit</a> */}
                      <button onClick={()=>Dispatch(deleteItem(index))} className="text-white hover:text-red-500 text-lg transition-all duration-300 ease-in-out">
                        <FaTrashCan />
                      </button>
                      <button  className="text-white hover:text-blue-600 text-lg transition-all duration-300 ease-in-out">
                        <BiSolidEdit />
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <h1 className="text-white text-xl pl-5 py-11 font-bold">
                Cart is Empty .....
              </h1>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyCart;
