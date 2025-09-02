import { useEffect, useState } from "react"
import styles from "./Board.module.css"
import type{ Profits,ChartData} from "../../interfaces/interfaces"
import { initialChartData } from "../../data/data"
import { Chart } from "./Chart"
import { Table} from "./Table/Table"
import { Form } from "./Form/Form"
import { getCookie } from "../../utils/utils"



export const Board=()=>{

    const [ show, setShow ]= useState<boolean>(false)
    // to know when it send data and update chart and table
    const [ control, setControl ]= useState<boolean>(false)
    const [ profits, setProfits ]= useState<Array<Profits>>([])
    const [ chartData, setChartData ]= useState<ChartData>(initialChartData)
    const textShow= show ? "Show Table" :"Show Chart"

    const updateProfits=(data:Array<Profits>)=>{
        setProfits(data)
    }

    const updateCharData=(incomes:Array<number>,spends:Array<number>)=>{
        setChartData(()=>{
            return({
                incomes: incomes,
                spends: spends
            })
        })
    }

    const updateShow=()=>{
        setShow(!show)
    }

    const updateControl=()=>{
        setControl(!control)
    }

    const readData=()=>{
        fetch("http://localhost:5000/api/dashboard/read",{
            method:"GET",
            credentials:"include",
            headers:{
                "X-CSRF": getCookie() as string
            }
        })
        .then(res=>res.json()
            .then(data=>{
                if (!res.ok) throw new Error(data.error)
                    updateProfits(data.data)
                    updateCharData(data.incomes,data.spends)       
            })
        )
        .catch(error=>{console.log(error.message)})
    }

    useEffect(()=>{
        readData()
    },[control,])

    return(
        <>
            <button onClick={updateShow}>{textShow}</button>

            <div className={styles.boardContainer}>
             
                <Form 
                    updateControl={updateControl}
                />
                
                {
                    !show && 
                    <Table
                        profits={profits}
                        updateControl={updateControl}
                        setProfits={setProfits}
                    />
                }
            
                {
                    show &&
                    <div className={styles.chartContainer}> 
                        <Chart 
                            chartData={chartData}
                        />
                    </div>
                }
            </div>
        </>

    )
}