import type { RoutesNav, message, Profits,ChartData } from "../interfaces/interfaces"

export const nav:string[]=["Home","Login","Register","Dashboard"]
export const routes: RoutesNav= {
    Home : "/",
    Login: "/login",
    Register: "/register",
    Dashboard: "/dashboard"
}

export const initialMessage:message={
    message:"",
    color: true
}

export const initialProfit:Profits={
    mon :"January",
    activity: "Income",
    details : "",
    amount :0
}

export const tHeads=['Month','Activity','Concept','Amount']

export const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

export const initialChartData:ChartData={
    incomes: new Array(12).fill(0),
    spends: new Array(12).fill(0)
}



