/*
+Flex(tek boyutlu satır ya da sütundan birini düzenler). Grid ise çok boyutlu ikisini de düzenleyebilir.
+className="border-b mb-6"  :border-b  elemanın alt kenarına (bottom) bir sınır (çizgi) ekler.  mb-11 elemanın altındaki (bottom) dış boşluğunu (margin) ayarlar.
+className="py4 px-6  flex justify-between items-center gap-10": padding x ve y ,  flex justify-between ise headerdakileri logo search ve menu kısmını yan yana hizalar. gap-10 grid veya flex container'daki her iki eksen (satır ve sütun) arasındaki boşluğu 10 birim olarak ayarlar.
+className="text-2xl font-bold md:text-4xl" :  texti metin boyutunu 2xl büyüklükte yazdık metin bold kalın olacak, Orta ve daha büyük ekranlarda (md boyutundan büyük ekranlar) metin boyutunu "4xl" olarak ayarlar.Küçük ekranlarda (md boyutunun altındaki ekranlar) ikon 2xl boyutunda görünür.
+className="header-search flex-1: flex-1 olan bir öğe, varsa kullanılabilir tüm alanı kaplamak için esneyebilir. 
+prefix={<SearchOutlined />} //önünde prefix yani ikon var. SearchOutlined, genellikle Ant Design (Antd) gibi bir UI kütüphanesiyle kullanılan bir ikon bileşenidir. Rounded full da kenarları yuvarlaklaştırır. max-w-800 maksimum genişlik belirler
+HomeOutlined className="md:text-2xl text-xl":  HomeOutlined ikonu &  Orta ve daha büyük ekranlarda (md boyutundan büyük ekranlar) ikon 2xl boyutunda (1.5rem) Küçük ekranlarda (md boyutunun altındaki ekranlar) ikon xl boyutunda (1.25rem) görünür.
+menu-link flex flex-col hover:text-[#40a9ff] flex-col:flex container içindeki çocuk öğelerin dikey olarak (yukarıdan aşağıya) hizalanmasını sağlar. hover:text-[#40a9ff]  üzerine getirdiğinde (hover durumu), metin rengini #40a9ff (açık mavi tonunda bir renk) yapar. transition-all Stil değişikliklerinin (örneğin, renk değişiklikleri) yumuşak bir geçişle gerçekleşmesini sağlar
+className="menu-links flex justify-between items-center gap-7 md:static fixed bottom-0 md:w-auto w-screen md:bg-transparent  bg-white  left-0 md:border-t-0 border-t md:px-0  px-4 py-1: ile menü kısmını sayfa md yani geniş ekran olduğunda farklı md olmadan yazılanlar ile de sayfa küçüldüğünde farklı yaptık. sayfa küçülünce menü kısmı aşağı indi.
+Badge genellikle dikkat çekici bildirimlerin veya kullanıcı avatarlarının yakınında görünür ve genellikle okunmamış mesaj sayısını gösterir.
+Badge count={5} offset={[0, 6]} className="md:hidden flex": yatay eksende (x-axis) 0 piksel, dikey eksende (y-axis) 6 piksel kaydırılacağını belirtir. md:hidden: elemanın orta boyutlu (medium) md ve daha büyük ekranlarda gizlenmesini sağlar. Küçük boyutlu ekranlarda menü kısmı yerinde sadece sepet ikonu bulunur.

*/
import "./index.css";
import React from "react";
import { Badge, Input, message } from "antd";
import {
  SearchOutlined,
  CopyOutlined,
  ShoppingCartOutlined,
  HomeOutlined,
  UserOutlined,
  BarChartOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Link, useLocation, useNavigate } from "react-router-dom"; //yönlendirme link verme işlemleri yapılıyor anasayfa sepet vb. yapılara LİNK ile yönlendirme yapılıyor.
import { useSelector } from "react-redux";

const Header = ({ setSearch }) => {
  const cart = useSelector((state) => state.cart); //redux ile oluşturulan action state her yerde bu şekilde kolayca çağırılabilir.
  //cartSlice'deki name'i cart olan dilimi alır ve cart dilimindeki cartItems, total, ve tax gibi özelliklere erişebiliriz..
  const { pathname } = useLocation(); // useLocation path'i sayfa yolunu verir
  const navigate = useNavigate();
  const logOut = () => {
    if (window.confirm("Çıkış Yapmak İstediğinize Emin Misiniz?")) {
      localStorage.removeItem("posUser");
      navigate("/login");
      message.success("Çıkış işlemi başarılı.");
    }
  }; //çıkış butonuna tıklanınca logOut çağrılıyor ve o da localstorage'den posuserı kullanıcıyı kaldırıyor.
  return (
    <div className="border-b mb-6">
      <header className="py-4 px-6  flex justify-between items-center gap-10">
        <div className="hopal">
          <Link to={"/"}>
            <h2 className="text-2xl font-bold md:text-4xl">HOP-AL</h2>{" "}
          </Link>
        </div>
        <div
          className="header-search flex-1 flex justify-center"
          onClick={() => {
            pathname !== "/" && navigate("/"); //eğer ürün ara'ya tıklandığında anasayfada değilse anasayfaya yönlendir çünkü ürünler orda.
          }}
        >
          <Input //antdesign ile hazır arama girdisi aldık.
            size="large"
            placeholder="Ürün Ara"
            prefix={<SearchOutlined />}
            className="rounded-full max-w-[800px]"
            onChange={(e) => setSearch(e.target.value.toLowerCase())}
          />
        </div>
        <div className="menu-links">
          <Link to={"/"} className={`menu-link ${pathname=== "/" && "active"}`}>
            <HomeOutlined className="md:text-2xl text-xl" />
            <span className="md:text-xs text-[10px]">Ana Sayfa</span>
          </Link>
          <Badge
            count={cart.cartItems.length}
            offset={[0, 0]}
            className="md:flex hidden "
          >
            <Link
              to={"/cart"} // md'de flex ve görünür iken ekran küçüldüğünde görünmez hidden olur. küçülünce, aşağı taşınmış menüde sepete gerek yok yukarda olacak tek başına zaten
              className={`menu-link ${pathname=== "/cart" && "active"}`}
            >
              <ShoppingCartOutlined className="md:text-2xl text-xl" />
              <span className="md:text-xs text-[10px]">Sepet</span>
            </Link>
          </Badge>
          {/* badge rozet tarzı ikon  */}

          <Link to={"/bills"} className={`menu-link ${pathname=== "/bills" && "active"}`}>
            <CopyOutlined className="md:text-2xl text-xl" />
            <span className="md:text-xs text-[10px]">Faturalar</span>
          </Link>
          <Link to={"/customers"} className={`menu-link ${pathname=== "/customers" && "active"}`}>
            <UserOutlined className="md:text-2xl text-xl" />
            <span className="md:text-xs text-[10px]">Müşteriler</span>
          </Link>
          <Link to={"/statistic"} className={`menu-link ${pathname=== "/statistic" && "active"}`}>
            <BarChartOutlined className="md:text-2xl text-xl" />
            <span className="md:text-xs text-[10px]">İstatistikler</span>
          </Link>
          <div onClick={logOut}>
            <Link className={`menu-link`}>
              <LogoutOutlined className="md:text-2xl text-xl" />
              <span className="md:text-xs text-[10px]">Çıkış</span>
            </Link>
          </div>
        </div>
        <Badge
          count={cart.cartItems.length}
          offset={[0, 0]}
          className="md:hidden flex"
        >
          <Link
            to={"/"}
            className={`menu-link ${pathname=== "/" && "active"}`} // sepet kısmı md ekran küçük olduğunda menü kısmında tek başına bulunur.
          >
            <ShoppingCartOutlined className="text-2xl" />
            <span className="md:text-xs text-[10px]">Sepet</span>
          </Link>
        </Badge>
      </header>
    </div>
  );
};

export default Header;
