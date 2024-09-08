import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";

export default configureStore({
  reducer: {// projenin farklı bölümlerinde kullanılacak reducer'ları tanımlayarak store'a ekledim. 
    cart: cartSlice,
  },
});
