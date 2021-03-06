import React from "react";
import { Message } from "semantic-ui-react";
interface props{
    errors:string[]|null;
}
export function Validationerror({errors}:props){
        return(
            <Message error>
                {errors &&
                (<Message.List>{
                    errors.map((err:any,i)=>(
                        <Message.Item key={i}>{err}</Message.Item>
                ))}
                </Message.List>
                )}
            </Message>
        )

}