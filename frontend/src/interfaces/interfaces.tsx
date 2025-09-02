export type Activity= "Income" | "Spend"
export type Month= "January" | "February" | 'March' | 'April'| 'May'|'June'|'July'| 'August' |'September' |'October'| 'November' |'December'

export interface User{
    username: string,
    passwd: string
}


export interface message{
    message: string,
    color: boolean
}

export interface MessageProp{
    message:string,
    color : boolean
}

export interface RoutesNav{
    Home:string,
    Login:string,
    Register:string,
    Dashboard:string
}

export interface Profits{
    id?: string,
    mon: Month,
    activity: Activity,
    details: string,
    amount: number,
    edit?: boolean,
    options? : boolean
}

export interface ChartData{
    incomes: Array<number>,
    spends: Array<number>
}

export interface chartProps{
    chartData: ChartData
}

export interface tableProps{
    profits: Array<Profits>,
    setProfits: React.Dispatch<React.SetStateAction<Profits[]>>,
    updateControl: ()=>void
}

export interface formProps{
    updateControl: ()=>void
}

export interface modifyProps{
    profit: Profits,
    updateControl: ()=>void,
    updateMenuOptions: (id:string | undefined, property:string,state:boolean)=>void,
}