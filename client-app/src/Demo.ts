export interface dog{
    name : string, 
    age : number,
    DogSound:(sound : any) => void // ? momkn ast5dmha w mmkn la2 lw 3andy 2 classes w inhirit wa7da w al tanya la2
}  
const dog1:dog ={
    name : 'jo',
    age : 10,
    DogSound:(Sound:any)=>console.log(Sound)
}
const dog2 : dog={
    name : 'kayzer',
    age : 9, 
    DogSound:(Sound:any)=>console.log(Sound)
}
dog1.DogSound('wowowowowowowo')// ! mlksh d3wa ana 3aref ana b3mel eh ll compilar
export const dogs = [dog1 , dog2]//export lw 3ayz ast5dmha fy file tany