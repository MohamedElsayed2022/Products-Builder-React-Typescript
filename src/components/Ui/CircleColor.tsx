import { HTMLAttributes } from "react"

interface Iprops extends HTMLAttributes<HTMLSpanElement> {
color : string
}
const CircleColor = ({color , ...rest}:Iprops) => {
  return (
    <span className={`block w-5 h-5 rounded-full bg-[${color}] cursor-pointer mb-1`}{...rest} style={{backgroundColor:color}}/>
  )
}

export default CircleColor