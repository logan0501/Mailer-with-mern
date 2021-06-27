import React from 'react'
import Navbar from '../Components/Navbar'
import '../Styles/Home.css'
import deletes from '../Assets/delete.svg';
import home from '../Assets/home.svg'
import history from '../Assets/history.svg'
import { useState, useEffect } from 'react'
import {useHistory} from 'react-router-dom'
import logout from '../Assets/logout.svg'
import Editorq from './Editorq'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Home() {
    const his=useHistory()
    const [from, setfrom] = useState("")

    const [cc, setcc] = useState("")
    const [subject, setsubject] = useState("")
    const [type, settype] = useState("")
    const [recurringflag, setrecurringflag] = useState(true)
    const [weeklyflag, setweeklyflag] = useState(true)
    const [monthlyflag, setmonthlyflag] = useState(true)
    const [yearlyflag, setyearlyflag] = useState(true)
    const [recipients, setrecipients] = useState([])
    const [body,setbody]=useState("")
    const [ss,setss]=useState("")
    const [rece, setrece] = useState("")
    const [recurinterval,setrecurinterval]=useState(0)
    const [recurrunning,setrecurrunning]=useState(false)
    const [weeklyday,setweeklyday]=useState(1)
    const [weeklytime,setweeklytime]=useState("")
    const [monthdate,setmonthdate]=useState(1)
    const [monthtime,setmonthtime]=useState("")
    const [yearlydate,setyearlydate]=useState("")
    const [yearlymonth,setyearlymonth]=useState("")
    const [yearlytime,setyearlytime]=useState("")
    useEffect(() => {
        if (type == "recurring") {
            setrecurringflag(false)
            setweeklyflag(true)
            setmonthlyflag(true)
            setyearlyflag(true)
        }
        if (type == "weekly") {
            setrecurringflag(true)
            setweeklyflag(false)
            setmonthlyflag(true)
            setyearlyflag(true)
        }
        if (type == "monthly") {
            setrecurringflag(true)
            setweeklyflag(true)
            setmonthlyflag(false)
            setyearlyflag(true)
        }
        if (type == "yearly") {
            setrecurringflag(true)
            setweeklyflag(true)
            setmonthlyflag(true)
            setyearlyflag(false)
        }

    }, [type])

    function stoprecur(){
        fetch("/stop",{
            method:"GET"
        }).then(res=>{
            setrecurrunning(false)
        })
    }
    async function send() {
        console.log(body)
        var instant=false;
        if(type===""){
            instant=true
        }
        if(recipients.length==0){
            return alert("Recipients cant be empty")
        }
        if(!subject && !body){
            return alert("Have some subject or content")
        }

        var data={
            "from":"nmailer66@gmail.com",
            "to":[],
            "body":"Hello world",
            
            "instant":false,
            "recursive":{
                "flag":false,

            },
            "weekschedule":{
                "flag":false,

            },
            "monthschedule":{
                "flag":false,

        
            },
            "yearschedule":{
                "flag":false,

            }
        
        }
        var recursive={
            flag:false
        }
        var weekschedule={
            flag:false
        }
        if(type=="weekly"){
            if(weeklytime==""){
                return alert("Enter a valid time")
            }
            weekschedule={
                flag:true,
                day:parseInt(weeklyday),
                time:weeklytime
            }
        }
        var monthschedule={
            flag:false
        }
        if(type=="monthly"){
            if(monthtime==""){
                return alert("Enter a valid time")
            }
            monthschedule={
                flag:true,
                date:parseInt(monthdate),
                time:monthtime
            }
        }
        var yearschedule={
            flag:false
        }
        if(type=="yearly"){
            if(!yearlydate || !yearlytime || !yearlytime){
                return alert("Fill all the time fields")
            } 
            yearschedule={
                flag:true,
                date:parseInt(yearlydate),
                month:yearlymonth,
                time:yearlytime
            }
        }
        if(type=="recurring"){
            setrecurrunning(true)
            if(recurinterval==0){
                return alert("Enter a valid time")
            }
             recursive={
                flag:true,
                interval:recurinterval

            };
        }
        data={
            ...data,
            cc,
            ss,
            frommail:JSON.parse(localStorage.getItem('user')).user.mail,
            instant,
            subject:subject,
            html:body,
            to:recipients,
            recursive,
            weekschedule,
            monthschedule,
            yearschedule
        }
        var res=await fetch('/sendmail',{
            method:"POST",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify(data)
        })
        res=await res.json()
        if(res.err){
            toast.error("Check the recipients mail id")
        }
        toast.success("Sent")
        
    }
    return (
        <div>
            <Navbar />
            <ToastContainer hideProgressBar />
            <nav class="sidebar">
                <img src={home} height={20} width={20} />
                
                <img src={history} height={20} width={20} onClick={()=>his.push("/history")}/>
                <img src={logout} height={20} width={20} onClick={()=>{
                    const value=window.confirm("Are you sure?")
                    if(value){
                        his.replace("/Login")
                        localStorage.clear();
                    }
                    }}/>
            </nav>

            <div class="body-div" style={{ marginTop: "100px" }}>
                <section class="mail-form">

                    <label for="">CC:</label>
                    <input type="text" name="cc" id="cc" value={cc} onChange={(e) => setcc(e.target.value)} />
                    <label for="">SS:</label>
                    <input type="text" name="cc" id="ss" value={ss} onChange={(e) => setss(e.target.value)} />
                    <label for="">Subject:</label>
                    <input type="text" name="sub" id="sub" value={subject} onChange={(e) => setsubject(e.target.value)} />
                    <label for="">Time schedule</label>
                    <div class="dateandtime">
                        <form class="check-recuring" name="check-recuring">
                            <div>
                                <input type="radio" name="timing" id="recurring" value="recurring" onChange={(e) => {
                                    settype(e.target.value)

                                }} />
                                <label for="recurring">Recurring </label>

                            </div>
                            <div>
                                <input type="radio" name="timing" id="weekly" value="weekly" onChange={(e) => settype(e.target.value)} />
                                <label for="weekly">Weekly </label>
                            </div>
                            <div>
                                <input type="radio" name="timing" id="monthly" value="monthly" onChange={(e) => settype(e.target.value)} />
                                <label for="monthly">Monthly</label>

                            </div>
                            <div>
                                <input type="radio" name="timing" id="yearly" value="yearly" onChange={(e) => settype(e.target.value)} />
                                <label for="yearly">Yearly </label>

                            </div>
                        </form>

                    </div>


                    <div id="reocurring-dis" class="dis" hidden={recurringflag}>
                        <label for="time">Time(in secs)</label>
                        <input type="text" name="time" id="time" value={recurinterval} onChange={(e)=>setrecurinterval(e.target.value)}/>
                    </div>

                    <div id="weekly-dis" class="dis" hidden={weeklyflag}>
                        <label for="week-days">Week Days</label>
                        <select name="week-days" id="week-days" onChange={(e)=>setweeklyday(e.target.value)} value={weeklyday}>
                            <option value="7">Sunday</option>
                            <option value="1">Monday</option>
                            <option value="2">Tuesday</option>
                            <option value="3">Wednesday</option>
                            <option value="4">Thursday</option>
                            <option value="5">Friday</option>
                            <option value="6">Saturday</option>
                        </select>
                        <label for="time">Time</label>
                        <input type="time" id="week-clock" onChange={(e)=>setweeklytime(e.target.value)} value={weeklytime}/>
                    </div>

                    <div id="monthly-dis" class="dis" hidden={monthlyflag}>
                        <label for="day">Date(1-30)</label>
                        <input type="number" name="day" id="day"  value={monthdate} onChange={(e)=>setmonthdate(e.target.value)} />
                        <label for="time">Time</label>
                        <input type="time" id="month-clock" value={monthtime} onChange={e=>setmonthtime(e.target.value)}/>

                    </div>

                    <div id="year-dis" class="dis" hidden={yearlyflag}>
                        <label for="date">Date:</label>
                        <input type="text" id="date" name="date" value={yearlydate} onChange={(e)=>setyearlydate(e.target.value)} />
                        <label for="date">Month:</label>
                        <input type="text" id="date" name="date" value={yearlymonth} onChange={(e)=>setyearlymonth(e.target.value)}/>
                        <label for="time">Time</label>
                        <input type="time" id="year-clock" value={yearlytime} onChange={e=>setyearlytime(e.target.value)} />
                    </div>

                                <Editorq handlechange={setbody}/>
                   <button id="send" onClick={send}>Send Mail</button>
                    {recurrunning &&
                    <button id="send" onClick={stoprecur} >Stop</button>
                    }

                    
                    
                </section>


                <section class="mail-form recipient">
                    <div className="recipient-name">Recipients</div>
                    <div className="line"></div>
                    <div>
                        {
                            recipients.map(data => {
                                return (
                                    <div className="list-items">
                                        <div className="text-list">
                                            {data}
                                        </div>
                                        <div>
                                            <img src={deletes} width={20} height={20} onClick={
                                                ()=>{
                                                    console.log(data)
                                                    setrecipients(recipients.filter((d)=>d!=data))
                                                }
                                            }
                                                 />
                                        </div>
                                    </div>
                                )
                            })
                        }



                    </div>
                    <div class="addnew">
                        <input type="email" value={rece} onChange={e => setrece(e.target.value)} name="addnew" id="addtext" required pattern="[-a-zA-Z0-9~!$%^&amp;*_=+}{'?]+(\.[-a-zA-Z0-9~!$%^&amp;*_=+}{'?]+)*@([a-zA-Z0-9_][-a-zA-Z0-9_]*(\.[-a-zA-Z0-9_]+)*\.([cC][oO][mM]))(:[0-9]{1,5})?" placeholder="Recipient" />
                        <button id="btnaddnew" onClick={() => {
                            if (rece != "") {
                                setrecipients([...recipients, rece])
                                setrece("")
                            }

                        }}>+</button>
                    </div>


                    <div class="rec-dis">
                        <form id="recips" name="recips">
                        </form>

                    </div>


                </section>

            </div>
            
        </div>
    )
}

export default Home
