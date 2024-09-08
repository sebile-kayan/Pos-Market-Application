import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"; //BrowserRouter:genel kapsayıcı  Routes: birden çok sayfa yönlendirmesi
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import BillPage from "./pages/BillPage";
import CustomerPage from "./pages/CustomerPage";
import StatisticPage from "./pages/StatisticPage";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import ProductPage from "./pages/ProductPage";
import { useEffect } from "react";
import { useSelector } from "react-redux";

function App() {
  const cart=useSelector((state)=> state.cart);
  useEffect(() => {
    localStorage.setItem("cart",JSON.stringify(cart))
  }, [cart])//Bu kod, sepet (cart) durumunu her güncellendiğinde yerel depolamaya kaydeder. 
  //Bu sayede, kullanıcı sayfayı yenilediğinde ya da tarayıcıyı kapatıp tekrar açtığında, sepetin içeriği localStorage'dan alınarak geri yüklenebilir.
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <RouteControl>
              <HomePage />
            </RouteControl>
          }
        />
        <Route
          path="/cart"
          element={
            <RouteControl>
              <CartPage />
            </RouteControl>
          }
        />
        <Route
          path="/bills"
          element={
            <RouteControl>
              <BillPage />
            </RouteControl>
          }
        />
        <Route
          path="/customers"
          element={
            <RouteControl>
              <CustomerPage />
            </RouteControl>
          }
        />
        <Route
          path="/statistic"
          element={
            <RouteControl>
              <StatisticPage />
            </RouteControl>
          }
        />
        <Route
          path="/products"
          element={
            <RouteControl>
              <ProductPage />
            </RouteControl>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
/* örneğin path içerisine /cart yazdık: websitede urlde en sona ..../cart yazılınca bizi elemente yani  CartPage sayfasına götürecek */

export const RouteControl = ({ children }) => {
  if (localStorage.getItem("posUser")) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};//Eğer local storagede kullanıcı kaydı(posuser) varsa  routetaki sayfayı açan kullanıcı kaydı yoksa login sayfasına yönlendiren  bir kontrol mekanizması
//yukardaki route'ları da routecontrol ile sardık.
//yani eğer oturum açmadıysan sitenin diğer sayfalarına içeriğine ulaşamıyorsun.