import { ChangeEvent, FormEvent, useState } from "react";
import "./App.css";
import { v4 as uuid } from "uuid";
import ProductCard from "./components/ProductCard";
import Modal from "./components/Ui/Modal";
import {
  categories,
  colors,
  formInputsList,
  productList,
} from "./components/data";
import Button from "./components/Ui/Button";
import Input from "./components/Ui/Input";
import { IProduct } from "./components/interfaces";
import { productVaildation } from "./components/validation";
import ErrorMessage from "./components/ErrorMessage";
import CircleColor from "./components/Ui/CircleColor";
import Select from "./components/Ui/Select";
import { ProductnameTypes } from "./types";
const defaultProductObj = {
  title: "",
  description: "",
  imageURL: "",
  price: "",
  colors: [],
  category: {
    name: "",
    imageURL: "",
  },
};
function App() {
  //usestate
  const [products, setProducts] = useState<IProduct[]>(productList);
  const [product, setProduct] = useState<IProduct>(defaultProductObj);
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    imageURL: "",
    price: "",
  });
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);

  const [tempColors, setTempColors] = useState<String[]>([]);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [productToEdit, setProductToEdit] =
    useState<IProduct>(defaultProductObj);
  const [productToEditIdx, setProductToEditIdx] = useState<number>(0);
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);


  console.log(tempColors);

  /**HANDLER */
  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);
  const closeModalEdit = () => setIsOpenEdit(false);
  const openModalEdit = () => setIsOpenEdit(true);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setProduct({ ...product, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };
  const closeConfirmModal = () => setIsOpenConfirmModal(false);
  const openConfirmModal = () => setIsOpenConfirmModal(true);

  const onChangeEditHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setProductToEdit({ ...productToEdit, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };
  const renderProductList = products.map((product, idx) => (
    <ProductCard
      key={product.id}
      product={product}
      setProductToEdit={setProductToEdit}
      openModalEdit={openModalEdit}
      idx={idx}
      setProductToEditIdx={setProductToEditIdx}
    />
  ));
  const onCancel = () => {
    setProduct(defaultProductObj);
    closeModal();
  };

  const removeProductHandler = ()=>{
   console.log("Product ID" , productToEdit.id)
   const filtered = products.filter(product => product.id !== productToEdit.id)
   setProducts(filtered)
   closeConfirmModal()
  }
  const SubmitHandler = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const { title, description, imageURL, price } = product;
    const errors = productVaildation({
      title,
      description,
      imageURL,
      price,
      colors,
    });
    const hasErrorMsg =
      Object.values(errors).some((value) => value === "") &&
      Object.values(errors).every((value) => value === "");
    console.log(hasErrorMsg);
    console.log("Hello World !");
    if (!hasErrorMsg) {
      setErrors(errors);
      return;
    }

    setProducts((prev) => [
      {
        ...product,
        id: uuid(),
        colors: tempColors,
        category: selectedCategory,
      },
      ...prev,
    ]);
    setProduct(defaultProductObj);
    setIsOpen(false);
    setTempColors([]);
    closeModal();
  };
  const SubmitEditHandler = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const { title, description, price, imageURL  } = productToEdit;
    const errors = productVaildation({
      title,
      description,
      price,
      imageURL,
      colors
    });
    const hasErrorMsg =
      Object.values(errors).some((value) => value === "") &&
      Object.values(errors).every((value) => value === "");
    if (!hasErrorMsg) {
      setErrors(errors);
      return;
    }
    //Updated
    const updatedProducts = [...products];
    updatedProducts[productToEditIdx] = {...productToEdit , colors : tempColors.concat(productToEdit.colors)};
    setProducts(updatedProducts);

    setProductToEdit(defaultProductObj);
    setTempColors([]);
    closeModalEdit();
  };
  /**RENDER */
  const renderFormInputList = formInputsList.map((input) => (
    <div className="flex flex-col" key={input.id}>
      <label htmlFor={input.id} className="mb-[1px] text-sm font-medium">
        {input.label}{" "}
      </label>
      <Input
        type="text"
        id={input.id}
        name={input.name}
        value={product[input.name]}
        onChange={onChangeHandler}
      />
      <ErrorMessage msg={errors[input.name]} />
    </div>
  ));
  const renderProductColors = colors.map((color) => (
    <CircleColor
      key={color}
      color={color}
      onClick={() => {
        if (tempColors.includes(color)) {
          setTempColors((prev) => prev.filter((item) => item !== color));
          return;
        }
        if (productToEdit.colors.includes(color)) {
          setTempColors((prev) => prev.filter((item) => item !== color));
          return;
        }
        setTempColors((prev) => [...prev, color]);
      }}
    />
  ));

  const renderProductEditWithErrorMsg = (
    id: string,
    label: string,
    name: keyof ProductnameTypes
  ) => {
    return (
      <div className="flex flex-col">
        <label htmlFor={id} className="mb-[1px] text-sm font-medium">
          {label}
        </label>
        <Input
          type="text"
          name={name}
          value={productToEdit[name]}
          onChange={onChangeEditHandler}
        />
        <ErrorMessage msg={errors[name]} />
      </div>
    );
  };

  return (
    <main className="container mx-auto">
      <Button
        className="bg-indigo-700 hover:bg-indigo-800 text-white flex-1 mb-1"
        onClick={openModal}
      >
        Add
      </Button>

      <div className="m-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-4 p-2 rounded-md">
        {renderProductList}
      </div>
      {/**ADD PRODUCT */}
      <Modal isOpen={isOpen} closeModal={closeModal} title="Add New Title">
        <form className="space-x-3" onSubmit={SubmitHandler}>
          <div className="space-y-3">
            {renderFormInputList}{" "}
            <Select
              selected={selectedCategory}
              setSelected={setSelectedCategory}
            />{" "}
          </div>
          <div className="flex items-center space-x-1 mt-3 flex-wrap">
            {renderProductColors}
          </div>
          <div className="flex items-center space-x-1 mt-3 flex-wrap">
            {tempColors.map((color) => (
              <span
                className="p-1 mr-1 mb-1 text-xs rounded-md text-white"
                style={{ backgroundColor: color }}
              >
                {color}
              </span>
            ))}
          </div>
          {/* <div className="space-y-3 w-full p-2">
          <Select/>

          </div> */}
          <div className="flex items-center space-x-3 mt-3">
            <Button className=" bg-indigo-700 hover:bg-indigo-800">
              Submit
            </Button>

            <Button
              className="bg-gray-300 hover:bg-gray-400 "
              onClick={onCancel}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal>

      {/**EDIT PRODUCT */}
      <Modal
        isOpen={isOpenEdit}
        closeModal={closeModalEdit}
        title="EDIT THIS PRODUCT"
      >
        <form className="space-x-3" onSubmit={SubmitEditHandler}>
          {renderProductEditWithErrorMsg("title", "Product Title", "title")}
          {renderProductEditWithErrorMsg(
            "description",
            "Product Description",
            "description"
          )}
          {renderProductEditWithErrorMsg("price", "Product Price", "price")}
          {renderProductEditWithErrorMsg(
            "imageURL",
            "Product ImageURL",
            "imageURL"
          )}

         <Select selected={productToEdit.category} setSelected={value =>setProductToEdit({...productToEdit , category : value})}/> 
          <div className="flex items-center space-x-1 mt-3 flex-wrap">
            {renderProductColors}
          </div>
          <div className="flex items-center space-x-1 mt-3 flex-wrap">
            {tempColors.concat(productToEdit.colors).map((color) => (
              <span
                className="p-1 mr-1 mb-1 text-xs rounded-md text-white"
                style={{ backgroundColor: color }}
              >
                {color}
              </span>
            ))}
          </div>
          {/* <div className="space-y-3 w-full p-2">
          <Select/>

          </div> */}
          <div className="flex items-center space-x-3 mt-3">
            <Button className=" bg-indigo-700 hover:bg-indigo-800">
              Submit
            </Button>

            <Button
              className="bg-gray-300 hover:bg-gray-400 "
              onClick={onCancel}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal>

      {/* DELETE PRODUCT */}
      <Modal
        isOpen={isOpenConfirmModal}
        closeModal={closeConfirmModal}
        title="Are you sure you want to remove this Product from your Store?"
        description="Deleting this product will remove it permanently from your inventory. Any associated data, sales history, and other related information will also be deleted. Please make sure this is the intended action."
      >
        <div className="flex items-center space-x-3">
          <Button className="bg-[#c2344d] hover:bg-red-800" onClick={removeProductHandler}>
            Yes, remove
          </Button>
          <Button type="button" className="bg-[#f5f5fa] hover:bg-gray-300 !text-black" onClick={closeConfirmModal}>
            Cancel
          </Button>
        </div>
      </Modal>
    </main>
  );
}

export default App;
