import { ChangeEvent, ChangeEventHandler, Children, FormEvent, FormEventHandler, useState } from "react";
import "./App.css";
import ProductCard from "./components/ProductCard";
import Modal from "./components/Ui/Modal";
import { formInputsList, productList } from "./components/data";
import Button from "./components/Ui/Button";
import Input from "./components/Ui/Input";
import { IProduct } from "./components/interfaces";
import { productVaildation } from "./components/validation";
const defaultProductObj={
  title: "",
  description: "",
  imageURL: "",
  price: "",
  colors: [],
  category : {
    name :'',
    imageURL:''
}}
function App() {
  
  const [product, setProduct] = useState<IProduct>(defaultProductObj);
  
  const renderProductList = productList.map((product) => (
    <ProductCard key={product.id} product={product} />
  ));
  let [isOpen, setIsOpen] = useState(false);
  /**HANDLER */
  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const onCancel = ()=>{
    setProduct(defaultProductObj)
    setIsOpen(false)
  }

  const SubmitHandler = (e : FormEvent<HTMLFormElement>):void =>{
    e.preventDefault()
    const errors = productVaildation({title : product.title , description : product.description , imageURL:product.imageURL ,  price: product.price})
    console.log(errors)
  }
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
    </div>
  ));

  return (
    <main className="container mx-auto">
      <Button className="bg-gray-300 hover:bg-gray-400" onClick={openModal}>
        Add
      </Button>

      <div className="grid grid-cols -1 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4 container">
        {renderProductList}
      </div>
      <Modal isOpen={isOpen} closeModal={closeModal} title="Add New Title">
        <form className="space-x-3" onSubmit={SubmitHandler}>
          <div className="space-y-3">{renderFormInputList}</div>
          <div className="flex items-center space-x-3 mt-3">
          <Button className=" bg-indigo-700 hover:bg-indigo-800">Submit</Button>

            <Button className="bg-gray-300 hover:bg-gray-400 " onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
    </main>
  );
}

export default App;
