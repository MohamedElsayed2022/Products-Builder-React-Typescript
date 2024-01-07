import { ProductnameTypes } from "../../types"

export interface IProduct{
    id? : string ,
    title : string,
    description : string ,
    imageURL : string,
    price : string ,
    colors : string[],
    category : {
        name : string,
        imageURL : string
    }
}

export interface IFormInput {
    id : string,
    type : string ,
    name : ProductnameTypes,
    label :string
}

export interface ICategory {
    id: string,
    name : string ,
    imageURL : string
}