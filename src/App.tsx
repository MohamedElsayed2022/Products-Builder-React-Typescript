import { ChangeEvent, FormEvent, useState } from "react";
import "./App.css";
import { v4 as uuid } from 'uuid';
import ProductCard from "./components/ProductCard";
import Modal from "./components/Ui/Modal";
import { categories, colors, formInputsList, productList } from "./components/data";
import Button from "./components/Ui/Button";
import Input from "./components/Ui/Input";
import { IProduct } from "./components/interfaces";
import { productVaildation } from "./components/validation";
import ErrorMessage from "./components/ErrorMessage";
import CircleColor from "./components/Ui/CircleColor";
import Select from "./components/Ui/Select";
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
  const [productToEdit, setProductToEdit] = useState<IProduct>(defaultProductObj);

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

  const onChangeEditHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setProductToEdit({ ...productToEdit, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };
  const renderProductList = products.map((product) => (
    <ProductCard key={product.id} product={product} setProductToEdit={setProductToEdit} openModalEdit={openModalEdit} />
  ));
  const onCancel = () => {
    setProduct(defaultProductObj);
    setIsOpen(false);
    closeModal()
  };
  const { title, description, imageURL, price } = product;
  const SubmitHandler = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const errors = productVaildation({
      title,
      description,
      imageURL,
      price,
      colors
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

    setProducts(prev => [ { ...product, id: uuid() ,colors:tempColors , category:selectedCategory }, ...prev]);
    setProduct(defaultProductObj)
    setIsOpen(false)

  };

  const SubmitEditHandler = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const errors = productVaildation({
      title,
      description,
      imageURL,
      price,
      colors
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

    setProducts(prev => [ { ...product, id: uuid() ,colors:tempColors , category:selectedCategory }, ...prev]);
    setProduct(defaultProductObj)
    setIsOpen(false)

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
        setTempColors((prev) => [...prev, color]);
      }}
    />
  ));

  return (
    <main className="container mx-auto">
      <Button className="bg-indigo-700 hover:bg-indigo-800 text-white flex-1 mb-1" onClick={openModal}>
        Add
      </Button>

      <div className="grid grid-cols -1 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4 container">
        {renderProductList}

      </div>
      {/**ADD PRODUCT */}
      <Modal isOpen={isOpen} closeModal={closeModal} title="Add New Title">
        <form className="space-x-3" onSubmit={SubmitHandler}>
          <div className="space-y-3">{renderFormInputList} <Select selected={selectedCategory} setSelected={setSelectedCategory}/> </div>
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
      <Modal isOpen={isOpenEdit} closeModal={closeModalEdit} title="EDIT THIS PRODUCT">
        <form className="space-x-3" onSubmit={SubmitEditHandler}>
        <div className="flex flex-col" >
      <label  className="mb-[1px] text-sm font-medium">
        Product Title
      </label>
      <Input
        type="text"
        name={productToEdit.title}
        value={productToEdit.title}
        onChange={onChangeEditHandler}
      />
      <ErrorMessage msg={''} />
    </div>
    <div className="flex flex-col" >
      <label  className="mb-[1px] text-sm font-medium">
        Product Desciption
      </label>
      <Input
        type="text"
        name={productToEdit.description}
        value={productToEdit.description}
        onChange={onChangeEditHandler}
      />
      <ErrorMessage msg={''} />
    </div>
          {/* <div className="space-y-3">{renderFormInputList} <Select selected={selectedCategory} setSelected={setSelectedCategory}/> </div> */}
          {/* <div className="flex items-center space-x-1 mt-3 flex-wrap">
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
          </div> */}
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
    </main>
  );
}

export default App;
