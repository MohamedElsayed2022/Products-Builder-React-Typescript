import { useState } from "react";
import Image from "./Image";
import Button from "./Ui/Button";
import CircleColor from "./Ui/CircleColor";
import { IProduct } from "./interfaces";
import { txtSlicer } from "./utils/functions";
interface Iprops {
  product : IProduct,
  setProductToEdit : (product : IProduct)=>void,
  openModalEdit : ()=> void,
  idx : number ;
  setProductToEditIdx : (value : number) => void
}

const ProductCard = ({product ,setProductToEdit , openModalEdit , idx , setProductToEditIdx}: Iprops) => {
  const {category , colors, description , imageURL , price ,title  } = product
  const [tempColors, setTempColors] = useState<String[]>([]);
/**HANDLER */
const onEdit = ()=>{
  setProductToEdit(product)
  openModalEdit()
  setProductToEditIdx(idx)
}
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
    <div className="max-w-sm md:max-w-lg mx-auto md:mx-0 border p-2 rounded-2 text-lg flex flex-col">
      
        <Image 
        imageUrl={product.imageURL} alt={category.name} className="mb-2 rounded-md" />
      <h3 className="font-bold">{title}</h3>
      <p className="text-gray-500">
       {txtSlicer(description)}
      </p>
      <div className="flex flex-row flex-wrap gap-2 my-4">
       {renderProductColors}
      </div>
      <div className="flex justify-between items-center">
        <span className="text-blue-700 font-semibold" >{price} $</span>
        <div className="flex gap-3 items-center font-medium">
          <h5>{category.name}</h5>
        <Image imageUrl={imageURL} className="w-10 h-10 rounded-full object-bottom" alt={"Product Name"}/>

        </div>
      </div>
      <div className="flex justify-around space-x-2 mt-5">
        <Button  className="bg-indigo-700 font-medium" width="w-full" onClick={onEdit} >Edit</Button>
        <Button className="bg-red-700 font-medium">Remove</Button>
      </div>
    </div>
  );
};

export default ProductCard;
