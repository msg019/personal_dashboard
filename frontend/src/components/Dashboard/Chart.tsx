import { Chart as ChartJS, CategoryScale,BarElement, LinearScale, Title,Tooltip, Legend  } from "chart.js"
import { Bar } from "react-chartjs-2"
import { labels } from "../../data/data"
import type{ chartProps } from "../../interfaces/interfaces"

export const Chart:React.FC<chartProps>=({chartData})=>{

    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
    )

    const options = {
        plugins: {
            title: {
            display: true,
            text: 'Mini Dashboard',
            },
        },
        responsive: true,
        interaction: {
            mode: 'index' as const,
            intersect: false,
        },
        scales: {
            x: {
            stacked: true,
            },
            y: {
            stacked: true,
            },
        },
        maintainAspectRatio: false,
    };


    const data = {
        labels,
        datasets: [
            {
            label: 'Income',
            data:chartData?.incomes,
            backgroundColor: 'rgb(255, 99, 132)',
            stack: 'Income',
            },
            {
            label: 'Spend',
            data:chartData?.spends,
            backgroundColor: 'rgb(75, 192, 192)',
            stack: 'Spend',
            },
            
        ],
    };


    return(
        <>
         <Bar 
            options={options}
            data={data}
        />
        </>
    )
}