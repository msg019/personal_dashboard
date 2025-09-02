import styles from "./NavBar.module.css"
import { Link } from "react-router-dom"
import type { RoutesNav } from "../../interfaces/interfaces" 
import { nav,routes } from "../../data/data"
import { useState } from "react"


export const NavBar=()=>{
    const [ menu, setMenu ]= useState<boolean>(false)

    const updateMenu=()=>{
        setMenu(!menu)
    }

    // Hide responsive menu after clicking in a navbar element
    const hideMenu=()=>{
        if(resp==styles.navbarResponsive){
            setMenu(false)
        }
    }

    const resp= menu ? styles.navbarResponsive : styles.navbar

    return(
        <nav className={styles.mainContainer}>
            <div className={styles.btnResponsive}>
                <button id={styles.btn} onClick={updateMenu}> 
                    <span className={styles.threeBar}></span>
                    <span className={styles.threeBar}></span>
                    <span className={styles.threeBar}></span>
                </button>
            </div>
            <div className={resp}>
                {
                    nav.map((element,index)=>{
                        return(
                        
                            <Link 
                                onClick={hideMenu}
                                className={styles.link} 
                                to={routes[element as keyof RoutesNav]}
                                key={index}
                            >
                                {element}
                            </Link>
                        
                        )
                    })
                }
            </div>
        </nav>
    )
}