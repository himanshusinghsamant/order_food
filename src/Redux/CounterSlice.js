import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  selectedData : []
}

export const CounterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    addItems:(state, action)=>{
      state.selectedData.push(action.payload)
    },
    deleteItem:(state, action)=>{
    state.selectedData.splice(action.payload,1)
    },
    removeAllItems:(state)=>{
      state.selectedData = []
    },
    updateItems:(state, action)=>{
     const {id, qty, totalPrice} = action.payload;

     const index = state.selectedData.findIndex(food => food.id === id);

     if (index !== -1) {
      // Update the quantity and price
      state.selectedData[index].qty += qty;
      state.selectedData[index].totalPrice += totalPrice;
    }
    },
    dropCartData:(state)=>{
      state.selectedData = []
    }
  },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount, addItems, deleteItem, removeAllItems, updateItems, dropCartData } = CounterSlice.actions

export default CounterSlice.reducer