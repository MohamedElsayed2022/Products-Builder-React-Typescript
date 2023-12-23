import { ChangeEvent, ChangeEventHandler, Children, useState } from "react";
import "./App.css";
import ProductCard from "./components/ProductCard";
import Modal from "./components/Ui/Modal";
import { formInputsList, productList } from "./components/data";
import Button from "./components/Ui/Button";
import Input from "./components/Ui/Input";
import { IProduct } from "./components/interfaces";
function App() {
  const [product, setProduct] = useState<IProduct>({
    title: "",
    description: "",
    imageURL: "",
    price: "",
    colors: [],
    category : {
      name :'',
      imageURL:''
    }
  });
  const renderProductList = productList.map((product) => (
    <ProductCard key={product.id} product={product} />
  ));
  let [isOpen, setIsOpen] = useState(false);
  /**HANDLER */
  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(false);
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setProduct({ ...product, [name]: value });
  };
  /**RENDER */
  const renderFormInputList = formInputsList.map((input) => (
    <div className="flex flex-col">
      <label htmlFor={input.id} className="mb-[1px] text-sm font-medium">
        {input.label}{" "}
      </label>
      <Input
        type="text"
        id={input.id}
        name={input.name}
        value={""}
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
        <form className="space-x-3">
          <div className="space-y-3">{renderFormInputList}</div>
          <div className="flex items-center space-x-3 mt-3">
            <Button className="bg-indigo-700 hover:bg-indigo-800 ">
              Cancel
            </Button>
            <Button className="bg-gray-300 hover:bg-gray-400 ">Submit</Button>
          </div>
        </form>
      </Modal>
    </main>
  );
}

export default App;
