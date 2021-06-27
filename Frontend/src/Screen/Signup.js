import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import icon from '../Assets/Mail.svg'
import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Signup() {
    const his=useHistory()
    const [name, setName] = useState("")
    const [mail, setMail] = useState("")
    const [password, setPassword] = useState("")
    const signup = async () => {
        if (password.length < 7) {
            alert("Password must be longer than 7 characters")
        }
        console.log(mail)
        console.log(password)
       await fetch("/signup", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                username:name,
                mail,
                password
            })
        }).then(res=>res.json()).then(data=>{
            if(data.err){
                return toast.error(data.err)
            }
            toast.success("Signup successfull")
            console.log(data)
            his.replace("/Login")
        }).catch(err=>{
            alert(err.message)
        })

    }
    return (
        <div class="body">
            <ToastContainer hideProgressBar />
            <div class="plain-bg">
                <img src={icon} alt="svg" />
                <div class="form">
                    <form signupform>
                        <h3>Signup</h3>
                        <div>
                            <label for="username">UserName</label>
                            <input type="text" name="username" signupname spellcheck="false" placeholder="User1234" onChange={(e) => setName(e.target.value)} value={name} />
                            <label for="email">Email</label>
                            <input type="email" name="email" signupmail spellcheck="false" placeholder="example@gmail.com" onChange={(e) => setMail(e.target.value)} value={mail} />
                            <label for="">Password</label>
                            <input type="password" name="password" signuppassword spellcheck="false" onChange={(e) => setPassword(e.target.value)} value={password} />
                            <button type="button" onClick={signup}>Signup</button>
                        </div>
                        <p >Already Have an Account? <span><Link to="/Login">Login</Link></span></p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signup
