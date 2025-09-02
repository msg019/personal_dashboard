import type{ tableProps } from "../../../interfaces/interfaces"
import { tHeads } from "../../../data/data"
import styles from "./Table.module.css"
import { ModifyButton } from "./ModifyButton"
import { ModifyMenu } from "./ModifyMenu"


export const Table:React.FC<tableProps>=({ profits, updateControl, setProfits })=>{
  
    const updateMenuOptions=(id:string | undefined, property:string,state:boolean)=>{
        if(!setProfits) return
            setProfits(prev=>
                prev.map(item=>
                    item.id===id ? {...item, [property]:state} : item
                )
            )
    }
    
    return(
        <div>
            <div className={styles.titleContainer}>
                {
                    tHeads.map((head,index)=>{
                        return(
                            <h4 key={index}>{head}</h4>
                        )
                    })
                }
            </div>
                {   
                    profits.length>0 && 
                    profits.map(profit=>{
                        if(!profit.edit){
                            return(
                                //Uneditable
                                <div key={profit.id} className={styles.dataContainer}>
                                    <p>{profit.mon}</p>
                                    <p>{profit.activity}</p>
                                    <p>{profit.details}</p>
                                    <p>{profit.amount}€</p>
                                    <ModifyButton 
                                        updateControl={updateControl}
                                        profit={profit}
                                        updateMenuOptions={updateMenuOptions}
                                    />
                                </div>
                            )
                        }else{
                            return(
                                //Editable
                                <ModifyMenu 
                                    profit={profit}
                                    updateControl={updateControl}
                                    updateMenuOptions={updateMenuOptions}
                                />
                            )
                        }
                    })
                }
                
        </div>
    
    )
}