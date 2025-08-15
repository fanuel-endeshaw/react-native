import { createSlice } from "@reduxjs/toolkit";
const initialState = { item: [] };

const Cartslice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addItemsToCart: (state, action) => {
      const existingItem = state.item.find(
        (item) => item.id === action.payload.id
      );
      //   state.item.push(action.payload);
      if (existingItem) {
        (existingItem.qty += 1), (existingItem.sum += action.payload.price);
      } else {
        state.item.push({
          ...action.payload,
          qty: 1,
          sum: action.payload.price,
        });
      }
    },

    removeItemFromCart: (state, action) => {
      const existingItem = state.item.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem && existingItem.qty != 1) {
        existingItem.qty -= 1;
        existingItem.sum -= action.payload.price;
      } else {
        state.item = state.item.filter((item) => item.id !== action.payload.id);
      }
    },

    // removeProductFromCart
    removeProductFromCart: (state, action) => {
      state.item = state.item.filter((item) => item.id !== action.payload.id);
    },
    // ///////////////
  },
});
export const { addItemsToCart, removeProductFromCart } = Cartslice.actions;

export default Cartslice.reducer;
