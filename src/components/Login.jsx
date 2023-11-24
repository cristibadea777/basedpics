import { useState } from "react"

const Login = ({setLogin}) => {

    const [credentiale, setCredentiale] = useState({
        username : '',
        password : '',
    })

    return(
        <div style={{width: "100vw", height: "100vh", backgroundColor: "#282c34", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
            <div style={{width: "33%", height: "33%", backgroundColor: "#333", border: "2px solid black", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
                <div style={{width: "100%", display: "flex", flexDirection: "row", marginRight: "7%", marginBottom: "5%"}}>
                    <label htmlFor="username" style={{width: "100%", textAlign: "center"}}>Username</label>
                    <input id="username"></input>
                </div>
                <div style={{width: "100%", display: "flex", flexDirection: "row", marginRight: "7%"}}>
                    <label htmlFor="password" style={{width: "100%", textAlign: "center"}}>Password</label>
                    <input id="password"></input>
                </div>
                <div style={{width: "100%", display: "flex", flexDirection: "row", marginRight: "7%", marginTop: "7%", justifyContent: "flex-end", textAlign: "center"}}>
                    <button>Login</button>
                </div>
            </div>
        </div>
    )
}
export default Login