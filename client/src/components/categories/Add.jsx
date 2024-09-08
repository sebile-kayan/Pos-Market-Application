import React from "react";
import { Form, Modal, Input, Button,message } from "antd";

const Add = ({
  isaddModalOpen,
  setIsaddModalOpen,
  categories,
  setCategories,
}) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    try {
      //veritabanına front-end tarafında veri ekleyebilmemizi sağlar çıkan modala kategori adını girip kategori ekledik
      fetch(process.env.REACT_APP_SERVER_URL + "/api/categories/add-category", {
        //bu adres postmanda add-category deki adres
        method: "POST",
        body: JSON.stringify(values),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });
      message.success("Kategori Başarıyla Eklendi!");
      form.resetFields(); //formun içine yazdığımız kategori adını veritabanına eklenince siler.
      setCategories([  //sayfayı yenile yapmadan direkt kategori ekleniyor otomatik güncelliyor.
        ...categories,
        {
          _id: Math.random(),
          title: values.title,
        },
      ]);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Modal
      title="Basic Modal"
      open={isaddModalOpen} // Modal isaddModalOpen true olduğunda açılır. isaddModalOpen da PlusOutlined a tıklandığında true oluyor.
      onCancel={() => setIsaddModalOpen(false)}
      footer={false}
    >
      <Form layout="vertical" onFinish={onFinish} form={form}>
        <Form.Item
          name="title"
          label="Kategori Ekle"
          rules={[
            { required: true, message: "Kategori Alanı Boş Bırakılamaz!" },
          ]}
        >
          <Input />
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
