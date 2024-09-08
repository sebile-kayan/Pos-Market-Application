import React from "react";
import { Form, Modal, Input, Button, message,Select} from "antd";

const Add = ({
  isaddModalOpen,
  setIsaddModalOpen,
  categories,
  products,
  setProducts,
}) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    try {
      fetch(process.env.REACT_APP_SERVER_URL + "/api/products/add-product", {
        method: "POST",
        body: JSON.stringify(values),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });
      message.success("Ürün Başarıyla Eklendi!");
      form.resetFields(); //formun içine yazdığımız ürün adını veritabanına eklenince siler.
      setProducts([
        //sayfayı yenile yapmadan direkt ürün ekleniyor otomatik güncelliyor.
        ...products,
        {
            ...values,
          _id: Math.random(),
          price:Number(values.price),
        },
      ]);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Modal
      title="Yeni Ürün Ekle"
      open={isaddModalOpen} // Modal isaddModalOpen true olduğunda açılır. isaddModalOpen da PlusOutlined a tıklandığında true oluyor.
      onCancel={() => setIsaddModalOpen(false)}
      footer={false}
    >
      <Form layout="vertical" onFinish={onFinish} form={form}>
        <Form.Item
          name="title" //bu name'ler veritabanındaki ismiyle eşleşmeli veritabanında name img price vs. diye kayıtlı
          label="Ürün Adı"
          rules={[
            { required: true, message: "Ürün Adı Alanı Boş Bırakılamaz!" },
          ]}
        >
          <Input placeholder="Ürün Adı Giriniz." />
        </Form.Item>
        <Form.Item
          name="img"
          label="Ürün Görseli"
          rules={[
            { required: true, message: "Ürün Görseli Alanı Boş Bırakılamaz!" },
          ]}
        >
          <Input placeholder="Ürün Görseli Giriniz." />
        </Form.Item>
        <Form.Item
          name="price"
          label="Ürün Fiyatı"
          rules={[
            { required: true, message: "Ürün Fiyatı Alanı Boş Bırakılamaz!" },
          ]}
        >
          <Input placeholder="Ürün Fiyatı Giriniz." />
        </Form.Item>
        <Form.Item
          name="category"
          label="Kategori Seçin"
          rules={[
            { required: true, message: "Kategori Alanı Boş Bırakılamaz!" },
          ]}
        >
            <Select //seçenek kutusu yapısı antdesign'den aldık.
            showSearch
            placeholder="Kategori Seçin."
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.title ?? "").includes(input)
            }
            filterSort={(optionA, optionB) =>
              (optionA?.title ?? "")
                .toLowerCase()
                .localeCompare((optionB?.title ?? "").toLowerCase())
            }
            options={categories}
          />
        </Form.Item>
        <Form.Item className="flex justify-end mb-0">
          <Button type="primary" htmlType="submit">
            Oluştur
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Add;
