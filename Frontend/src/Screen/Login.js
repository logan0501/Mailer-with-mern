import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import image from '../Assets/Mail.svg'
import '../Styles/Auth.css'
import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Login() {
    const his=useHistory()
    const [mail, setMail] = useState("")
    const [password, setPassword] = useState("")
    const login = async () => {
        if (password.length < 7) {
            alert("Password must be longer than 7 characters")
        }
        console.log(mail)
        console.log(password)
        await fetch("/login", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                mail,
                password 
            })
        }).then(res=>res.json()).then(data=>{
            if(data.err){
                return toast.error(data.err)
            }
            console.log(data)
            toast.success("Login successfull")
            localStorage.setItem('user',JSON.stringify(data))
            his.replace("/")
        }).catch(err=>{
            alert(err.message)
        })
        
    }
    return (
        <div className="body">
            <ToastContainer  hideProgressBar/>
            <div class="plain-bg" style={{ marginTop: "90px" }}>
                <img src={image} alt="icon" />
                <div class="form">
                    <form loginform>
                        <h3>Login</h3>
                        <div>
                            <label for="username">UserName/Email</label>
                            <input type="email" name="mail" login-mail spellcheck="false" onChange={(e) => setMail(e.target.value)} value={mail} />
                            <label for="">Password</label>
                            <input type="password" name="password" login-password spellcheck="false" onChange={(e) => setPassword(e.target.value)} value={password} />
                            <button type="button" onClick={login}>Login</button>
                        </div>
                        <p >New to mailer? <span><Link to="/Signup">Register here</Link></span></p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
