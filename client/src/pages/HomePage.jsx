/*
overflow-auto: Eğer öğe içeriği, öğenin boyutlarını aşarsa, otomatik olarak yatay ve/veya dikey kaydırma çubukları ekler. İçerik taşmazsa, kaydırma çubukları eklenmez.
flex-1 olan bir öğe, varsa kullanılabilir tüm alanı kaplamak için esneyebilir. 

*/
//!BU SAYFA HOME YANİ ANASAYFA:   <Route path="/" element={<HomePage/>}/>    App.jsx'te routelama yaptık.ve ana dizin varsayılan bize HomePage'i çalıştıracak
//!pages'lerde componentleri çağırarak görünümü oluşturduk. App.jsx'te ise route elementi ile pages'leri sayfaları çağırdık yönlendirme yaptık.

import Header from "../components/header/Header"; //componentsin altına header adında kalsör açtık.
import Categories from "../components/categories/Categories";
import Products from "../components/products/Products";
import CartTotals from "../components/cart/CartTotals";
import { useEffect, useState } from "react";
import { Spin } from "antd";

const HomePage = () => {
  const [categories, setCategories] = useState();
  const [products, setProducts] = useState();
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await fetch(
          process.env.REACT_APP_SERVER_URL + "/api/categories/get-category"
        ); //API'den veri çekme, veritabanındaki verileri getirme işlemi
        const data = await res.json();
        data &&
          setCategories(
            data.map((item) => {
              return { ...item, value: item.title };
            })
          );
      } catch (error) {
        console.log(error);
      }
    };
    getCategories();
  }, []);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await fetch(
          process.env.REACT_APP_SERVER_URL + "/api/products/get-product"
        ); //API'den veri çekme, veritabanındaki verileri getirme işlemi
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, []);

  return (
    <>
      <Header setSearch={setSearch} />
      {products && categories ? (
        //Henüz veriler yüklenemediyse(products && categories false ise) spin loading yapısını yüklendiyse de içeriği gösteir.
        <div className="home px-6 flex md:flex-row flex-col justify-between gap-10 md:pb-0 pb-24 h-screen">
          <div className="categories overflow-auto max-h-[calc(100vh_-_112px)] md:pb-10">
            <Categories
              categories={categories}
              setCategories={setCategories}
              setFiltered={setFiltered}
              products={products}
            />
          </div>
          <div className="products flex-[8] max-h-[calc(100vh_-_112px)] overflow-y-auto pb-10 min-h-[500px]">
            <Products
              categories={categories}
              filtered={filtered}
              products={products}
              setProducts={setProducts}
              search={search}
            />
          </div>
          <div className="cart-wrapper min-w-[300px] md:-mr-[24px] md:-mt-[24px] border">
            <CartTotals />
          </div>
        </div>
      ) : (
        <Spin
          size="large"
          className="absolute top-1/2 h-screen w-screen flex justify-center"
        />
      )}
    </>
  );
};

export default HomePage;
