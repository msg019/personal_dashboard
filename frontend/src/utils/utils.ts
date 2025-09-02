import Cookies from "js-cookie"


export const getCookie=()=>{
    return Cookies.get("csrf-token") 
}
