import { Routes,Route } from "react-router-dom"
import { Home } from "../components/Home/Home"
import { Register } from "../components//Register/Register"
import { PrivateRoutes } from "../components/PrivateRoutes"
import { Dashboard } from "../components/Dashboard/Dashboard"
import { NotFound } from "../components/NotFound/NotFound"
import { Login } from "../components/Login/Login"

export const Router=()=>{
    return(
        <>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/dashboard" element={<PrivateRoutes />}>
                    <Route path="" element={<Dashboard />}/>
                </Route>
                <Route path="/register" element={<Register />}/>
                <Route path="/login" element={<Login />}/>
                <Route path="*" element={<NotFound />}/>
                <Route path="/test" element={<Dashboard />}/>
            </Routes>
        </>
    )
}