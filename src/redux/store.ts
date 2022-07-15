import { useDispatch } from 'react-redux';
import { configureStore } from "@reduxjs/toolkit";
import filterSlice from "./slices/filterSlice";
import cartSlice from "./slices/cartSlice";
import pizzaSlice from "./slices/pizzaSlice";

export const store = configureStore({
    reducer: {
        filter: filterSlice,
        cart: cartSlice,
        pizza: pizzaSlice
    }
});

export type RootState = ReturnType<typeof store.getState>

type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();