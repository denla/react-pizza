import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  totalPrice: 0,
  totalCount: 0,
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      const res = state.items.find(
        (obj) =>
          obj.id === action.payload.id &&
          obj.type === action.payload.type &&
          obj.size === action.payload.size,
      );
      if (res) {
        res.count++;
      } else {
        state.items.push(action.payload);
        action.payload.count = 1;
      }
      state.totalPrice = state.items.reduce((sum, obj) => sum + obj.price * obj.count, 0);
      state.totalCount++;
    },
    removeItem(state, action) {
      const res = state.items.find((obj) => obj.id === action.payload);
      state.totalPrice = state.totalPrice - res.count * res.price;
      state.totalCount = state.totalCount - res.count;
      state.items = state.items.filter((obj) => obj.id !== action.payload);
    },
    minusItem(state, action) {},
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
      state.totalCount = 0;
    },
  },
});

export const { addItem, removeItem, clearItems, minusItem } = cartSlice.actions;
export default cartSlice.reducer;
