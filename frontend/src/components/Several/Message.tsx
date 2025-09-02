import type { FC } from "react"
import styles from "./Message.module.css"
import type {  MessageProp } from "../../interfaces/interfaces"


export const Message:FC<MessageProp>=({message,color})=>{
  
    const colorText= color ? "green" : "red"
    
    return(
        <div className={styles.msgContainer}>
            <label style={{color: colorText}}>{message}</label>
        </div>
    )
}