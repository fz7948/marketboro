import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export type ItemsProps = {
  id: number;
  name: string;
  unitName: string;
  unitPrice: number;
  check?: boolean | undefined;
};

export interface IProductProps extends ItemsProps {
  count: number;
}

export interface IProductInStorage {
  data: IProductProps[] | undefined;
  loading: boolean;
  error: string | undefined;
}

export const initialState: IProductInStorage = {
  data: undefined,
  loading: false,
  error: undefined,
};

export const getProductsInStorage = createAsyncThunk(
  "products/getProductsInStorage",
  async () => {
    try {
      const response = await axios.get("/data/items.json", {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProductCheck: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers: {
    [getProductsInStorage.pending.type]: (state) => {
      state.loading = true;
    },
    [getProductsInStorage.fulfilled.type]: (
      state,
      action: PayloadAction<IProductProps[]>,
    ) => {
      state.loading = false;
      state.data = action.payload;
    },
    [getProductsInStorage.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { setProductCheck } = productSlice.actions;

export default productSlice.reducer;
