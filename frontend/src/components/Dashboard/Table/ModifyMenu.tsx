import type { modifyProps,Month,Activity, Profits  } from "../../../interfaces/interfaces"
import { labels } from "../../../data/data"
import { getCookie } from "../../../utils/utils"
import styles from "./Table.module.css"



export const ModifyMenu:React.FC<modifyProps>=({profit, updateControl,updateMenuOptions})=>{

    const updateDash=(e:React.FormEvent<HTMLFormElement>, id:string | undefined)=>{
        e.preventDefault()

        const { elements }=e.currentTarget as HTMLFormElement

        const inputs= elements.namedItem("data") 
        
        if(!inputs)return
                
        const data:string[]=[]
        
        Object.values(inputs).map(input=>{
            data.push(input.value)
        })
        
        const profit:Profits={
            id: id,
            mon: data[0] as Month,
            activity: data[1] as Activity,
            details: data[2],
            amount: Number(data[3])
        } 

        fetch(`http://localhost:5000/api/dashboard/update`,{
            method:"PUT",
            credentials:"include",
            headers:{
                "Content-type":"application/json",
                "X-CSRF": getCookie() as string
            },
            body:JSON.stringify(profit)
        })
        .then(res=>res.json()
                .then(data=>{
                    if(!res.ok) throw new Error(data.error)
                    console.log(data.message)
                    updateControl()
                })   
        )
        .catch(error=>console.log(error.message))

    }
    return(
        <>
            <form className={styles.modifyMenu} onSubmit={(e)=>{updateDash(e,profit.id)}}>
                <select name="data" required defaultValue={profit.mon}>
                    {
                        labels.map((label,index)=>{
                            return(
                                <option  key={index}>{label}</option>
                            )
                        })
                    }
                </select>
                                              
                <select defaultValue={profit.activity} name="data" required>
                    <option>Income</option>
                    <option>Spend</option>
                </select>
                                           
                <input 
                    name="data" 
                    defaultValue={profit.details} 
                    required 
                    autoComplete="off"
                />
                                            
                <input 
                    name="data"
                    defaultValue={profit.amount}
                    required 
                    type="number" 
                    step="0.1" 
                    min="0"
                />
                <div style={{"display":"flex"}}>
                    <button type="submit">✅</button>
                    <button type="button" onClick={()=>{updateMenuOptions(profit.id, "edit",false)}}>❌</button>
                </div>
                                            
            </form>
           
        </>
    )
}