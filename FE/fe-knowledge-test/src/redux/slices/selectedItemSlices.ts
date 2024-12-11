// src/redux/slices/selectedItemSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
}

interface SelectedItemState {
  selectedItem: Product | null;
}

const initialState: SelectedItemState = {
  selectedItem: null,
};

const selectedItemSlice = createSlice({
  name: 'selectedItem',
  initialState,
  reducers: {
    setSelectedItem: (state, action: PayloadAction<Product | null>) => {
      state.selectedItem = action.payload;
    },
  },
});

export const { setSelectedItem } = selectedItemSlice.actions;
export default selectedItemSlice.reducer;
