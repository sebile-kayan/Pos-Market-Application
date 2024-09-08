import { addProduct } from "../../redux/cartSlice";
import { useDispatch } from "react-redux";
import { message } from "antd";

const ProductItem = ({ item }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(addProduct({ ...item, quantity: 1 })); //dispatch fonksiyonu, Redux store'da bir eylem (action) başlatmak için kullanılır. Bu örnekte, addProduct adında bir action, bir ürünü sepete eklemek için tetikleniyor.
    message.success("Ürün Sepete Eklendi.")
  };

  return (
    <div
      className="product-item border hover:shadow-lg cursor-pointer transition-all select-none"
      onClick={handleClick}
    >
      {/* ürüne tıklandığında handleclick çağrılıyor o da dispatch ile addproductu çalıştırıyor. o da cartSlice'daki addproductu çalıştırıyor */}
      <div className="product-img">
        <img
          src={item.img}
          alt=""
          className="h-28 object-cover w-full border-b"
        />
      </div>
      <div className="product-info flex flex-col p-3">
        <span className="font-bold">{item.title}</span>
        <span>{item.price}₺</span>
      </div>
    </div>
  );
};

export default ProductItem;
