import { Logout } from "./Logout"
import { Board } from "./Board"

export const Dashboard=()=>{
    return(
        <div className="main-container">
            <Logout />
            <Board />
        </div>
    )
}