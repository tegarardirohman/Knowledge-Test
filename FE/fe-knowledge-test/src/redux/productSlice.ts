import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
}

interface ProductState {
  selectedItem: Product | null;
}

const initialState: ProductState = {
  selectedItem: null,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setSelectedItem(state, action: PayloadAction<Product>) {
      state.selectedItem = action.payload;
    },
    resetSelectedItem(state) {
      state.selectedItem = null;
    },
  },
});

export const { setSelectedItem, resetSelectedItem } = productSlice.actions;

export default productSlice.reducer;
