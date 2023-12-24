import { useState } from "react";
import Image from "./Image";
import Button from "./Ui/Button";
import CircleColor from "./Ui/CircleColor";
import { IProduct } from "./interfaces";
import { txtSlicer } from "./utils/functions";
interface Iprops {
  product : IProduct
}
const ProductCard = ({product}: Iprops) => {
  const {category , colors, description , imageURL , price ,title} = product
  const [tempColors, setTempColors] = useState<String[]>([]);

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
        <span >{price} $</span>
      <Image imageUrl={imageURL} className="w-10 h-10 rounded-full object-bottom" alt={"Product Name"}/>
      </div>
      <div className="flex justify-around space-x-2 mt-5">
        <Button  className="bg-indigo-700" width="w-full" onClick={()=>console.log("Cliced !")} >EDIT</Button>
        <Button className="bg-red-700 ">DELETE</Button>
      </div>
    </div>
  );
};

export default ProductCard;
