import React from "react";
import { dog, dogs } from "./Demo";
interface props{
    dog :dog
}
export default function DogItem({dog}:props){
    return(<div key= {dog.name}>
    <span>{dog.name+' '}</span>
    <button onClick = {()=>dog.DogSound(dog.name + ' wowwoowowowoow')}>Make Sound</button>
  </div>)

}