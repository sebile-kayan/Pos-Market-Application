import { Button, Form, Input, Carousel, Checkbox ,message} from "antd";
import { Link } from "react-router-dom";
import AuthCarousel from "../../components/auth/AuthCarousel";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true)
    //İşlem Başladığında: Bir işlem (örneğin, form gönderimi) başladığında setLoading(true) fonksiyonu çağrılır. Bu, loading durumunu true yapar ve buton üzerinde bir yükleme simgesi görünür.
    //Çünkü giriş yap butonunun yüklenme özelliğine bu state'i atadık.
    try {
      const res = await fetch(process.env.REACT_APP_SERVER_URL + "/api/auth/login", {
        method: "POST",
        body: JSON.stringify(values),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });
      const user= await res.json();//logine ait form verilerini user'a atadık. 
console.log(user)
      
      if (res.status === 200) {
        localStorage.setItem(//localstorage'e veri kaydetme.localstorage'de posuser adında veri oluşturur
          "posUser",
          JSON.stringify({
            username:user.username,
            email:user.email
          })
        )
        message.success("Giriş işlemi başarılı.");
        navigate("/");
      }else if(res.status===404){
        message.error("Kullanıcı Bulunamadı!");
      }else if(res.status===403){
        message.error("Şifre Yanlış!");
      }
      setLoading(false)
    } catch (error) {
      message.error("Bir şeyler yanlış gitti.");
      console.log(error);
      setLoading(false)
    }
  };//auth.js'te veritabanı tarafında uyarı hata mesajları verdirdik hata olursa diye ama Login ve Register.jsx'te de frontend için uyarı mesajları verilmeli.

  return (
    <div className="h-screen">
      <div className="flex justify-between h-full">
        <div className="xl:px-20 px-10 w-full flex flex-col h-full justify-center relative">
          <h1 className="text-center text-5xl font-bold mb-2">HOP-AL</h1>
          {/* remember başta false beni hatırla tikli değil */}
          <Form layout="vertical" onFinish={onFinish} initialValues={{remember:false}}>
            <Form.Item
              label="E-mail"
              name={"email"}
              rules={[
                {
                  required: true,
                  message: "E-mail Alanı Boş Bırakılamaz!",
                },
              ]}
              
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Şifre"
              name={"password"}
              rules={[
                {
                  required: true,
                  message: "Şifre Alanı Boş Bırakılamaz!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item name={"remember"} valuePropName="checked">
              <div className="flex justify-between items-center">
                <Checkbox>Beni Hatırla!</Checkbox>
                <Link>Şifremi Unuttum!</Link>
              </div>
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full"
                size="large"
                loading={loading}
              >
                Giriş Yap
              </Button>
            </Form.Item>
          </Form>
          <div className="flex justify-center absolute left-0 bottom-10 w-full">
            Henüz bir hesabınız yok mu?&nbsp;
            <Link to="/register" className="text-blue-600">
              Şimdi kaydol.
            </Link>
          </div>
        </div>
        <div className="xl:w-4/6 lg:w-3/5 md:w-1/2 md:flex hidden bg-[#6c63ff] h-full">
          <div className="w-full h-full flex items-center">
            <div className="w-full">
              <Carousel className="!h-full px-6" autoplay>
                <AuthCarousel
                  img="/images/responsive.svg"
                  title="Responsive"
                  desc="Tüm Cihaz Boyutlarıyla Uyumluluk"
                />
                <AuthCarousel
                  img="/images/statistic.svg"
                  title="İstatistikler"
                  desc="Geniş Tutulan İstatistikler"
                />
                <AuthCarousel
                  img="/images/customer.svg"
                  title="Müşteri Memnuniyeti"
                  desc="Deneyim Sonunda Üründen Memnun Müşteriler"
                />
                <AuthCarousel
                  img="/images/admin.svg"
                  title="Yönetici Paneli"
                  desc="Tek Yerden Yönetim"
                />
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
