import React from 'react'
import svg from '../Assets/mail-box.png'
import {useState,useEffect }from 'react'
function Navbar() {
    const [name,setName]=useState("")
    useEffect(()=>{
        try {
            var x=JSON.parse(localStorage.getItem('user')).user.name 
        if(x){
            setName(x)
        }
        else{
            setName("")
        }
        } catch (error) {
            
        }
        
    },[])
    return (
        <nav className="nav">
            <div className="icon">
                <img src={svg} width={24} height={24}/>
                <span className="brand-name">Mailer</span>
            </div>
            <div className="profile-name">
                {name || ""}
            </div>
        </nav>

    )
}

export default Navbar
