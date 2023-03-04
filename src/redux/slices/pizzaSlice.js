import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPizzas = createAsyncThunk(
  'pizzaSlice/fetchPizzasById',
  async ({ selectedPage, categoryId, sortType, searchValue }) => {
    const { data } = await axios.get(
      `https://63c14860376b9b2e6477bf95.mockapi.io/items?limit=4&page=${selectedPage}${
        categoryId > 0 ? `&category=${categoryId}` : ''
      }&sortBy=${sortType.sortProperty}&order=desc&filter=${searchValue}`,
    );
    console.log(data);
    return data;
  },
);

const initialState = {
  items: [],
  status: 'loading',
};

const pizzaSlice = createSlice({
  name: 'pizzaSlice',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: {
    [fetchPizzas.pending]: (state) => {
      state.status = 'loading';
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = 'success';
    },
    [fetchPizzas.rejected]: (state) => {
      state.status = 'error';
      state.items = [];
    },
  },
});

export const { setItems } = pizzaSlice.actions;
export default pizzaSlice.reducer;
