export const Logout=()=>{
    const logout=()=>{
         fetch("http://localhost:5000/api/logout",{
            method: "GET",
            credentials: "include",    
        })
        .then(res=> res.json()
            .then(data=>{
                if(!res.ok) throw new Error(data.error)
                    console.log(data.message)
                    window.location.href="/"
            })
        )
        .catch(error=>console.log(error))
    }
    return(
        <>
            <button style={{width: "fit-content"}} onClick={logout}>Logout</button>
        </>
    )
}