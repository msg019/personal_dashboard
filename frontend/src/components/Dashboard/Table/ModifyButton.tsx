import type { modifyProps } from "../../../interfaces/interfaces"
import { getCookie } from "../../../utils/utils"


export const ModifyButton:React.FC<modifyProps>=({ profit, updateControl, updateMenuOptions })=>{

 
    const deleteDash=(id:String| undefined)=>{
        fetch(`http://localhost:5000/api/dashboard/delete?id=${id}`,{
            method:"DELETE",
            credentials:"include",
            headers:{
                "X-CSRF": getCookie() as string
            }
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
        <div>
            {
                !profit.options && 
                <button type="button" onClick={()=>updateMenuOptions(profit.id,"options",true)}>⚙️</button>
            
            }
            {
                profit.options &&
                <>
                    <button type="button" onClick={()=>{updateMenuOptions(profit.id,"edit",true)}}>✍️</button>
                    <button type="button" onClick={()=>deleteDash(profit.id)}>🗑️</button>
                    <button type="button" onClick={()=>{updateMenuOptions(profit.id,"options",false); updateMenuOptions(profit.id,"edit",false)}}>🔙</button>
                </>
            }
        </div>
    )
}