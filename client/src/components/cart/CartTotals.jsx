/*
Danger: Kullanıcılara hata, tehlike veya önemli bir durumu bildiren mesajlar genellikle "danger" olarak sınıflandırılır ve kırmızı renkte görüntülenir.
dispatch fonksiyonu, Redux store'da bir eylem (action) başlatmak için kullanılır. Bu örnekte, addProduct adında bir action, bir ürünü sepete eklemek için tetikleniyor
useSelector: Redux store'daki belirli bir durumu (state) almak için kullanılır.
*/
import React from "react";
import { Button, message } from "antd";
import {
  ClearOutlined,
  PlusCircleOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { deleteCart, increase, decrease, reset } from "../../redux/cartSlice";
import { useNavigate } from "react-router-dom";

const CartTotals = () => {
  const cart = useSelector((state) => state.cart); //cartSlice'deki name'i cart olan dilimi alır ve cart dilimindeki cartItems, total, ve tax gibi özelliklere erişebiliriz.
  const dispatch = useDispatch();
  const navigate = useNavigate()
  return (
    <div className="cart h-full max-h-[calc(100vh_-_90px)] flex flex-col ">
      <h2 className="bg-blue-700 text-center py-4 text-white font-bold tracking-wide ">
        Sepetteki Ürünler
      </h2>
      <ul className="cart-items px-2 flex flex-col gap-y-3 py-2 overflow-y-auto">
        {cart.cartItems.length > 0
          ? cart.cartItems.map((item) => (
              <li className="cart-item flex justify-between" key={item._id}>
                <div className=" flex items-center">
                  <img
                    src={item.img}
                    className="w-16 h-16 object-cover cursor-pointer"
                    onClick={() => {
                      dispatch(deleteCart(item));
                      message.success("Ürün Sepetten Silindi.");
                    }}
                  />
                  <div className=" flex flex-col ml-2">
                    <b>{item.title}</b>
                    <span>
                      {item.price}₺ x {item.quantity}
                    </span>
                  </div>
                </div>
                <div className="flex items-center ">
                  <Button
                    type="primary"
                    size="small"
                    onClick={() => dispatch(increase(item))}
                    className="w-full flex items-center justify-center !rounded-full"
                    icon={<PlusCircleOutlined />}
                  />
                  <span className="font-bold w-6 inline-block text-center">
                    {item.quantity}
                  </span>
                  <Button
                    type="primary"
                    size="small"
                    onClick={() => {
                      if (item.quantity === 1) {
                        if (window.confirm("Ürün Silinsin Mi?")) {
                          //Eğer kullanıcı "Tamam" butonuna tıklarsa, window.confirm true döner. dispatch fonksiyonu çağrılır.
                          dispatch(decrease(item));
                          message.success("Ürün Sepetten Silindi.");
                        }
                      }
                      if (item.quantity > 1) {
                        dispatch(decrease(item));
                      }
                    }}
                    className="w-full flex items-center justify-center"
                    icon={<MinusCircleOutlined />}
                  />
                </div>
              </li>
            )).reverse()//sepette son eklenen en başa gelir.
          : "Sepette Hiç Ürün Yok."}
      </ul>

      <div className="cart-totals mt-auto">
        <div className="border-t border-b">
          <div className="flex justify-between p-2">
            <b>Ara Toplam</b>
            <span>{cart.total > 0 ? cart.total.toFixed(2) : 0}₺</span>
          </div>
          <div className="flex justify-between p-2">
            <b>KDV %{cart.tax}</b>
            <span className="text-red-700">
              {(cart.total * cart.tax) / 100 > 0
                ? `+${((cart.total * cart.tax) / 100).toFixed(2)}`
                : 0}
              ₺
            </span>
          </div>
        </div>
        <div className="border-b mt-4">
          <div className="flex justify-between p-2">
            <b className="text-xl text-green-500">Genel Toplam</b>
            <span className="text-xl">
              {cart.total + (cart.total * cart.tax) / 100 > 0
                ? (cart.total + (cart.total * cart.tax) / 100).toFixed(2)
                : 0}
              ₺{/* tofixed:virgülden sonra 2 rakam görünür */}
            </span>
          </div>
        </div>
        <div className="py-4 px-2">
          <Button
            type="primary"
            size="large"
            className="w-full bg-blue-700 "
            disabled={cart.cartItems.length === 0}
            onClick={()=>navigate("/cart")}
          >
            Sipariş Oluştur
          </Button>
          <Button
            type="primary"
            size="large"
            className="w-full mt-2 flex items-center justify-center"
            icon={<ClearOutlined />}
            danger
            disabled={cart.cartItems.length === 0}//sepette ürün yoksa butonlara tıklanılmayacak.
            onClick={() => {
              if (window.confirm("Emin Misiniz?")) {
                dispatch(reset());
                message.success("Sepet Başarıyla Temizlendi.");
              }
            }}
          >
            Temizle
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartTotals;
