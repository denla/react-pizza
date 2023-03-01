import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categoryId: 0,
  selectedPage: 0,
  sort: { name: 'популярности', sortProperty: 'rating' },
};

const filterSlice = createSlice({
  name: 'filterSlice',
  initialState,
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
    setSortType(state, action) {
      state.sort = action.payload;
    },
    setSelectedPage(state, action) {
      state.selectedPage = action.payload;
    },
    setParams(state, action) {
      //state.sort = action.payload.sort;
      state.selectedPage = Number(action.payload.selectedPage);
      state.categoryId = Number(action.payload.categoryId);
      state.sort = action.payload.obj;
    },
  },
});

export const { setCategoryId, setSortType, setParams, setSelectedPage } = filterSlice.actions;
export default filterSlice.reducer;
