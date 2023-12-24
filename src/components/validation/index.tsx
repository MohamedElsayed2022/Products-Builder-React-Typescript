export const productVaildation = (product: { title: string  , description : string , imageURL:string ;  price: string}) => {
  const errors: {description: string; imageURL: string ; price: string; title: string} = {
    title: "",
    description: "",
    imageURL: "",
    price: "",
  };
  const vaildUrl = /(https?:\/\/)?(www.)?[-a-zA-Z0-9@:%._\\+~#?&\/\/=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%._\\+~#?&\/\/=]*)/.test(product.imageURL);

  if(product.title.trim() || product.title.length >10 || product.title.length <80){
    errors.title="Product Title must be between 10 and 80 character"
  }
  if(product.description.trim() || product.description.length >10 || product.description.length <80){
    errors.title="Product description must be between 10 and 900 character"
  }
  if(!product.imageURL.trim() || !vaildUrl){
    errors.imageURL = "Vaild image URL is Required"
  }
  if(!product.price.trim() || isNaN(Number(product.price))){
    errors.price = "Valid price is Required"
  }
  return errors;
};
