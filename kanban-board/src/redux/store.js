import { configureStore } from "@reduxjs/toolkit";
import BoardSlice from "./BoardSlice";

const store = configureStore({
    reducer:{
        // redux slices
        boards: BoardSlice.reducer
    }
})

export default store;