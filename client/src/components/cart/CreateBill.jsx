import { Button, Card, Form, Input, message, Modal, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { reset } from "../../redux/cartSlice";
import { useNavigate } from "react-router-dom";
//!Home'da Sepete bastıktan sonra çıkan ekranda Sipariş Oluştur butonuna basınca çıkan ekran

const CreateBill = ({ isModalOpen, setIsModalOpen }) => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      const res = await fetch(process.env.REACT_APP_SERVER_URL + "/api/bills/add-bill", {
        method: "POST",
        body: JSON.stringify({
          ...values,
          subTotal: cart.total,
          tax: ((cart.total * cart.tax) / 100).toFixed(2),
          totalAmount: (cart.total + (cart.total * cart.tax) / 100).toFixed(2),
          cartItems: cart.cartItems,
        }),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });
      if (res.status === 200) {
        message.success("Fatura Başarıyla Oluşturuldu.");
        dispatch(reset());//sipariş oluşturlduktan sonra sepeti temizlettik.
        navigate("/bills");//sipariş oluşturlduktan sonra faturalar sayfasına geçsin.
      }
    } catch (error) {
      message.success("Bir Şeyler Yanlış Gitti");
      console.log(error);
    }

    //Form tamamlandığında(onfinish) sipariş oluştura basılınca form elemanlarındaki değerler alınacak daha sonra api'de bu değerler kullanılacak.
  };

  return (
    <Modal
      title="Fatura Oluştur"
      open={isModalOpen} // Modal'ın açık olup olmayacağını belirler. 'isModalOpen' değişkenine bağlıdır. Yani başlangıçta setstate ismodalopen false değerindeydi ve open=false olduğu için modal görünmüyordu CartPage'deki Sipariş Oluştur butonuna tıklandığında setstate ile open=true haline gelir ve bu modal görünür olur.
      footer={false}
      onCancel={() => setIsModalOpen(false)}
    >
      <Form layout={"vertical"} onFinish={onFinish}>
        <Form.Item
          label="Müşteri Adı"
          name={"customerName"}
          rules={[{ required: true, message: "Müşteri Adı Gereklidir." }]}
        >
          <Input placeholder="Bir Müşteri Adı Yazınız." />
        </Form.Item>
        <Form.Item
          label="Telefon No"
          name={"customerPhoneNumber"}
          rules={[{ required: true, message: "Telefon Numarası Gereklidir." }]}
        >
          <Input placeholder="Bir Telefon No Yazınız" maxLength={11} />
        </Form.Item>
        <Form.Item
          label="Ödeme Yöntemi"
          name={"paymentMode"}
          rules={[{ required: true, message: "Ödeme Yöntemi Gereklidir." }]}
        >
          <Select placeholder="Ödeme Yöntemi Seçiniz.">
            <Select.Option value="Nakit"></Select.Option>
            <Select.Option value="Kredi Kartı"></Select.Option>
          </Select>
        </Form.Item>
        <Card>
          <div className="flex justify-between">
            <span>Ara Toplam</span>
            <span>{cart.total > 0 ? cart.total.toFixed(2) : 0}₺</span>
          </div>
          <div className="flex justify-between my-2">
            <span>KDV %{cart.tax}</span>
            <span className="text-red-600">
              {(cart.total * cart.tax) / 100 > 0
                ? `+${((cart.total * cart.tax) / 100).toFixed(2)}`
                : 0}
              ₺
            </span>
          </div>
          <div className="flex justify-between">
            <b>Toplam</b>
            <b>
              {cart.total + (cart.total * cart.tax) / 100 > 0
                ? (cart.total + (cart.total * cart.tax) / 100).toFixed(2)
                : 0}
              ₺
            </b>
          </div>
          <div className="flex justify-end">
            <Button
              className="mt-4"
              type="primary"
              htmlType="submit"
              onClick={() => setIsModalOpen(true)}
              disabled={cart.cartItems.length === 0}
            >
              Sipariş Oluştur
            </Button>
          </div>
        </Card>
      </Form>
    </Modal>
  );
}; //form açtık ve içerisine de inputlar,selectler oluşturduk.

export default CreateBill;
