import styles from "./NotFound.module.css"

export const NotFound=()=>{
    return(
        <div className={styles.mainContainer}>
            <h1>404 Not Found</h1>
            <img 
                src="NotFound.jpg" 
            />
        </div>
    )
}