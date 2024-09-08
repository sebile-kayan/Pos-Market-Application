/*
object-cover: Görüntüyü kapsayıcının tamamını kaplayacak şekilde ölçekler, ancak görüntünün orantılarını korur.
hover:shadow-lg: fare üzerine geldiğinde bir gölge belirir.
select-none: seçme işlemini engeller yazı varsa kopyalama vs izin vermez
tailwind.config.js'te gridTemplateColumns:{ "card": " repeat(auto-fill,minmax(150px,1fr))"},  ekledik ve bir grid(çok boyutlu) yapısı oluşturduk. Ekran küçültülüp büyütüldüğünde grid ile düzenli bir yapı oluşturulur.  
*/
import React from "react";
import { useState } from "react";
import ProductItem from "./ProductItem";
import { PlusOutlined, EditOutlined } from "@ant-design/icons";
import Add from "./Add";
import { useNavigate } from "react-router-dom";

const Products = ({ categories, filtered, products, setProducts, search }) => {
  const [isaddModalOpen, setIsaddModalOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="products-wrapper grid grid-cols-card gap-4 ">
      {filtered //BURADA ÜRÜN ARA'YA AİT İŞLEM YAPILDI.
        .filter((product) => product.title.toLowerCase().includes(search))
        .map((item) => (//filtreledikten sonra map'le
          <ProductItem item={item} key={item._id} /> //ürün getirme işlemine ait component çağrıldı
        ))}
      <div
        className="product-item border hover:shadow-lg cursor-pointer hover:opacity-90 transition-all select-none bg-purple-800 flex justify-center items-center "
        onClick={() => setIsaddModalOpen(true)}
      >
        <PlusOutlined className="text-white md:text-2xl min-h-[180px]" />
      </div>
      <div
        className="product-item border hover:shadow-lg cursor-pointer hover:opacity-90 transition-all select-none bg-orange-800 flex justify-center items-center"
        onClick={() => navigate("/products")}
      >
        <EditOutlined className="text-white md:text-2xl min-h-[180px]" />
      </div>
      <Add
        isaddModalOpen={isaddModalOpen}
        setIsaddModalOpen={setIsaddModalOpen}
        categories={categories}
        products={products}
        setProducts={setProducts}
      />
    </div>
  );
};

export default Products;
