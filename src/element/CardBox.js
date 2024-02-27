import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItems } from "../Redux/CounterSlice";
import { updateItems } from "../Redux/CounterSlice";


const CardBox = ({id, name, image, description, dropdownItems }) => {
  const [foodPrice, setFoodPrice] = useState('half')
  const [foodTotalPrice, setFoodTotalPrice] = useState(1)
  const cartData = useSelector((state) => state.counter.selectedData);
  let option = dropdownItems;
  let priceOptions = Object.keys(option[0]);
  const quantityArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  const Dispatch = useDispatch()

  function handleQuantityprice(e){
    setFoodPrice(e.target.value)
  }

  function handlFoodTotalprice(e){
    setFoodTotalPrice(e.target.value)
  }

  
  let Price =  foodPrice === "half" ? 200 : 400;
  let Total_Price =   (Price * foodTotalPrice);

  // async function AddToCart (){
  //   let AllItems = await {id:id, name:name, qty:foodTotalPrice, foodQty:foodPrice, price:Price, totalPrice:Total_Price }

  //   let food =[]
  //   for(let item of cartData){
  //     if(item.id === id){
  //       food = item;
  //       break;
  //     }
  //   }
  //   if(food !== []){
  //     if(food.foodPrice === foodPrice){
  //       let newItems = {id:id , price:Price, qty:foodTotalPrice}
  //       await Dispatch(updateItems(newItems))
  //       return;
  //     }
  //     else if(food.foodPrice !== foodPrice){
  //       await Dispatch(addItems(AllItems))
  //       return;
  //     }
  //   }

  
  //   await Dispatch(addItems(AllItems))
  // }

  async function AddToCart() {
    const newItem = {
      id: id,
      name: name,
      qty: foodTotalPrice,
      foodQty: foodPrice,
      price: Price,
      totalPrice: Total_Price
    };
  
    const existingItemIndex = cartData.findIndex(item => item.id === id);
  
    if (existingItemIndex !== -1) {
      const existingItem = cartData[existingItemIndex];
      if (existingItem.foodQty === foodPrice) {
        // If the item with the same id and foodQty already exists, update its quantity and price
        const updatedItem = {
          id: id,
          qty: existingItem.qty + foodTotalPrice,
         totalPrice: existingItem.totalPrice + Total_Price
        };
        Dispatch(updateItems(updatedItem));
      } else {
        // If the item exists but with a different foodQty, add it as a new item
        Dispatch(addItems(newItem));
      }
    } else {
      // If the item does not exist in the cart, add it as a new item
      Dispatch(addItems(newItem));
    }
  }
  


  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg m-6 border-[1px] bg-transparent hover:bg-slate-800 transition duration-500 ease-in-out">
      <img
        className="w-[500px] h-[300px] object-cover"
        src={image}
        alt={name}
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 text-white">{name}</div>
        <p className="text-white text-base">{description.split(' ').length > 6 ? description.split(' ').splice(0,6).join(' ')+ '...' : description}</p>
      </div>
      <div className="px-6 py-4">
        <div className="dropdown inline-block relative">
          <select
            className="bg-yellow-600 mr-4 p-2 rounded-md cursor-pointer font-bold hover:bg-yellow-800  transition duration-500 ease-in-out"
            name=""
            id=""
          >
           {
            quantityArray.map((qty)=>{
              return (
                <option onClick={handlFoodTotalprice} key={qty} value={qty} className="font-bold">
              {qty}
            </option>
              )
            })
           }
        
          </select>

          <select
            className="bg-yellow-600 mr-4 p-2 rounded-md cursor-pointer font-bold hover:bg-yellow-800  transition duration-500 ease-in-out"
            name=""
            id=""
          >
            {priceOptions?.map((items) => {
              return (
                <option onClick={handleQuantityprice} key={items} className="font-bold" value={items}>
                  {items}
                </option>
              );
            })}
          </select>
        </div>
        <div className="flex justify-between mt-3">
          <h1>Price:{Price} Rs</h1>
          <h1>Total Price:{Total_Price} Rs</h1>
        </div>
        <button onClick={AddToCart} className="hover:bg-green-700 font-semibold mt-5 border-2 border-white transition-all duration-300 ease-in-out rounded-xl text-white px-3 py-1">
          Add To Cart
        </button>
      </div>
    </div>
  );
};

export default CardBox;
