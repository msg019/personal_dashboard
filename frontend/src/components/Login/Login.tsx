import { useState, type FormEvent } from "react";
import type { User, message } from "../../interfaces/interfaces";
import styles from "./Login.module.css"
import { Message } from "../Several/Message";
import { initialMessage } from "../../data/data";

export const Login=()=>{

    const [ msg, setMsg ]= useState<message>(initialMessage)
    
    const updateMsg=(message:string,color:boolean)=>{
        setMsg({
            message: message,
            color : color
        })
    
        setTimeout(()=>{
            setMsg(initialMessage)
        },5000)
    }

     const handlerSubmit=(e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        
        const { elements }= e.currentTarget as HTMLFormElement

        const inputs= elements.namedItem("data")

        if (!inputs){return}

        const data:string[]=[]

        Object.values(inputs).map(input=>{
            data.push(input.value)
        })
    
        const user:User={
            username: data[0],
            passwd: data[1]
        }

        fetch("http://localhost:5000/api/login",{
            method: "POST",
            credentials: "include",    
            headers:{
                'Content-type': "application/json"
            },
            body:JSON.stringify(user)
        })
        .then(res=>res.json()
            .then(data=>{
                if(!res.ok) throw new Error(data.error)
                window.location.href="/dashboard"
            })
        )
        .catch(error=> updateMsg(error.message,false))

    }
    
    return(
        <div className="main-container">
            <h1>Login</h1>
            <form className={styles.formContainer} onSubmit={handlerSubmit}>
                <div className={styles.groupContainer}>
                    <label>Username</label>
                    <input 
                        name="data"
                        placeholder="username..."
                        required
                        maxLength={20}
                        autoComplete="off"
                    />
                </div>
                <div className={styles.groupContainer}>
                    <label>Password</label>
                    <input 
                        name="data"
                        placeholder="password..."
                        type="password"
                        required
                        autoComplete="off"
                        maxLength={20}
                    />
                </div>

                <button>Send</button>
            </form>

            <Message 
                message={msg.message}
                color={msg.color}
            />
        </div>
    )
}