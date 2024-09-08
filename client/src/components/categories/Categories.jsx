import { useState, useEffect } from "react";
import "./style.css";
import { PlusOutlined, EditOutlined } from "@ant-design/icons";
import Add from "./Add";
import Editle from "./Editle";

const Categories = ({ categories, setCategories, setFiltered, products }) => {
  const [isaddModalOpen, setIsaddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [categoryTitle, setCategoryTitle] = useState("Tümü");

  useEffect(() => {
    if (categoryTitle === "Tümü") {
      setFiltered(products);
    } else {
      setFiltered(products.filter((item) => item.category === categoryTitle));
    }
  }, [products, setFiltered, categoryTitle]);

  return (
    //HomePage.jsx'te veritabanından fetch ile çektiğimiz verileri anasayfanın kategoriler kısmında solda kategoriler olarak listelettik.
    <ul className="flex gap-4 flex-col text-lg">
      {categories.map((item) => (
        <li
          className={`category-item ${
            item.title === categoryTitle && "!bg-pink-700"
          }`}
          key={item._id}
          onClick={() => setCategoryTitle(item.title)}
        >
          <span>{item.title}</span>
        </li>
      ))}
      <li
        className="category-item !bg-purple-800 hover:opacity-90"
        onClick={() => setIsaddModalOpen(true)}
      >
        <PlusOutlined className="md:text-2xl " />
      </li>
      <li
        className="category-item !bg-orange-800 hover:opacity-90"
        onClick={() => setIsEditModalOpen(true)}
      >
        <EditOutlined className="md:text-2xl " />
      </li>
      <Add // kategori ekleme için açılan component
        isaddModalOpen={isaddModalOpen}
        setIsaddModalOpen={setIsaddModalOpen}
        categories={categories}
        setCategories={setCategories}
      />
      <Editle // kategorileri Editlemek için açılan component
        isEditModalOpen={isEditModalOpen}
        setIsEditModalOpen={setIsEditModalOpen}
        categories={categories}
        setCategories={setCategories}
      />
    </ul>
  );
};

export default Categories;
