import { createSlice } from "@reduxjs/toolkit";
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart")).cartItems
      : [], //eklenen ürünler bu diziye ekleniyor. bu değişken tanımları zaten backendde yapılmıştı. Eğer localstoragede cartıtem değeri varsa ordan alsın yoksa boş dizi döndürsün
    total: localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart")).total
      : 0,
    tax: 8,
  },
  reducers: {
    //reducers kısmı, Redux Toolkit'te durum üzerinde değişiklik yapacak işlemleri tanımlar.
    addProduct: (state, action) => {
      //sepete ürün ekleme
      const findCartItem = state.cartItems.find(
        (item) => item._id === action.payload._id //bulunan ürünle yeni tıkladığımız ürünün id'si aynı mı
      );
      if (findCartItem) {
        findCartItem.quantity = findCartItem.quantity + 1; //bulunan ürünle yeni tıkladığımız ürünün id'si aynıysa bulunan ürün miktarını 1 arttıracak
      } else {
        //değilse direkt ürünü ekleyecek
        state.cartItems.push(action.payload); //payload, eylemle birlikte gelen veridir /addProduct eylemi tetiklendiğinde, payload içinde gelen ürün bilgisi sepetteki ürünler listesine eklenir.
      }
      state.total += action.payload.price;
    },
    deleteCart: (state, action) => {
      //sepetten ürün silme
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload._id
      );
      state.total -= action.payload.price * action.payload.quantity;
    },
    increase: (state, action) => {
      //ürün miktarını arttırma için
      const cartItem = state.cartItems.find(
        (item) => item._id === action.payload._id
      );
      cartItem.quantity += 1;
      state.total += cartItem.price;
    },
    decrease: (state, action) => {
      //ürün miktarını azaltma için
      const cartItem = state.cartItems.find(
        (item) => item._id === action.payload._id
      );
      cartItem.quantity -= 1;
      if (cartItem.quantity === 0) {
        state.cartItems = state.cartItems.filter(
          (item) => item._id !== action.payload._id
        );
      }
      state.total -= cartItem.price;
    },
    //sepeti tamamen temizleme
    reset: (state, action) => {
      state.cartItems = [];
      state.total = 0;
    },
  },
});

export const { addProduct, deleteCart, increase, decrease, reset } =
  cartSlice.actions;
export default cartSlice.reducer;
