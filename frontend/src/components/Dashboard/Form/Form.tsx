import type{ FormEvent,FC } from "react"
import { labels } from "../../../data/data"
import type { Month, Activity, Profits, formProps } from "../../../interfaces/interfaces"
import { getCookie } from "../../../utils/utils"
import styles from "./Form.module.css"

export const Form:FC<formProps>=({ updateControl })=>{

    const registerActivity=(e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault()

        const { elements }= e.currentTarget as HTMLFormElement

        const inputs= elements.namedItem("data") 

        if(!inputs)return
        
        const data:string[]=[]

        Object.values(inputs).map(input=>{
            data.push(input.value)
        })

        const profit:Profits={
            mon: data[0] as Month,
            activity: data[1] as Activity,
            details: data[2],
            amount: Number(data[3])
        }  

        fetch("http://localhost:5000/api/dashboard/register",{
            method:"POST",
            credentials: "include",
            headers:{
                "Content-type":"application/json",
                "X-CSRF": getCookie() as string
            },
            body:JSON.stringify(profit)
        })
        .then(res=> res.json()
            .then(data=>{
                if(!res.ok) throw new Error(data.error)
                console.log(data.message)
                updateControl()
            })
        )
        .catch(error=> console.log(error.message))

         Object.values(inputs).map(input=>{
            input.value=""
        })
        
    }
    return(
       <form className={styles.formContainer} onSubmit={registerActivity}>
            <h2>Register activity</h2>
            <div>
                <label>Select a month:</label>
                <select name="data" required>
                    {
                        labels.map((label,index)=>{
                            return(
                                <option key={index}>{label}</option>
                            )
                        })
                    }
                </select>
            </div>
            <div>
                <label>Select an a activity:</label>
                <select name="data" required>
                    <option>Income</option>
                    <option>Spend</option>
                </select>
            </div>
            <div>
                <label>Enter a concept</label>
                <input 
                    required
                    name="data"
                    placeholder="Concept..."
                    autoComplete="off"
                />
            </div>
            <div>
                <label>Enter an amount(€)</label>
                <input 
                    required
                    name="data"
                    placeholder="Amount..."
                    type="number"
                    step="0.1"
                    min="0"
                    autoComplete="off"
                />
            </div>
            <button>Register</button>

        </form>
    )
}