const router = require('express').Router()
const {sendMail,Instant}=require('../Functions/mailer')
const CronJob=require('cron').CronJob
const mongoose=require('mongoose')
const nodemailer=require('nodemailer')
const mail=mongoose.model("mail")
var recinterval;
router.get("/stop",(req,res)=>{
    clearInterval(recinterval)
    res.json({
        "msg":"Done"
    })
})
router.post('/mails',(req,res)=>{
    console.log("frtching mails")
    const {mailer}=req.body
    console.log(mailer)
    mail.find({"sender":mailer}).then(data=>{
        console.log(data)
        res.json({
            "msg":data
        })
    })
    
})
router.post('/sendmail',async (req,res)=>{
    
    console.log("Running")
    var details=req.body
    details.password="8870499146"
    var mailoptions={
        from:"nodemailer66@gmail.com",
        to:details.to,
        cc:details.cc,
        text:details.body,
        subject:details.subject,
        html:details.html
                
    }
    console.log(details.frommail)
    var dbdata={...mailoptions,
        sender:details.frommail}
    var data=new mail(dbdata)
    data.save()

    var transporter=nodemailer.createTransport({
        service:"gmail",
        auth:{
            user : details.from,
            pass : details.password
        }
    })
    if(details.yearschedule.flag){
        console.log("year")
        var day=details.yearschedule.date
        var time=details.yearschedule.time;
        var month=details.yearschedule.month
        console.log(time)
        var hour=parseInt(time[0]+time[1])
        var min=parseInt(time[3]+time[4])
        console.log(hour,min)
        var format=`${min} ${hour} ${day} ${month} *`
        console.log(format)
        var job=new CronJob("25 21 25 06 *",()=>{
            console.log(mailoptions)
            transporter.sendMail(mailoptions,(err,info)=>{
                if(err){
                    console.log("error")
                    return "error"
                }
                console.log("returned")
                return "Sent successfully"
            })
        },null,true)
        job.start()
        res.json({
            "msg":"scheduled successfully"
        })
    }
    if(details.monthschedule.flag){
        console.log("month")
        var date=details.monthschedule.date
        var time=details.monthschedule.time;
        console.log(time)
        var hour=parseInt(time[0]+time[1])
        var min=parseInt(time[3]+time[4])
        console.log(hour,min)
        var format=`${min} ${hour} ${date} * *`
        console.log(format)
        var job=new CronJob(format,()=>{
            console.log(mailoptions)
            transporter.sendMail(mailoptions,(err,info)=>{
                if(err){
                    console.log("error")
                    return "error"
                }
                console.log("returned")
                return "Sent successfully"
            })
        },null,true)
        job.start()
        res.json({
            "msg":"scheduled successfully"
        })
    }
    if(details.weekschedule.flag){
        console.log("week")
        var day=details.weekschedule.day
        var time=details.weekschedule.time;
        console.log(time)
        var hour=parseInt(time[0]+time[1])
        var min=parseInt(time[3]+time[4])
        console.log(hour,min)
        var format=`${min} ${hour} * * ${day}`
        console.log(format)
        var job=new CronJob(format,()=>{
            console.log(mailoptions)
            transporter.sendMail(mailoptions,(err,info)=>{
                if(err){
                    console.log("error")
                    return "error"
                }
                console.log("returned")
                return "Sent successfully"
            })
        },null,true)
        job.start()
        res.json({
            "msg":"scheduled successfully"
        })
        
    }
    if(details.recursive.flag){
        recinterval=await setInterval(()=>{
            
            transporter.sendMail(mailoptions,(err,info)=>{
                if(err){
                    console.log("error")
                    return "error"
                }
                return "Sent successfully"
            })
        },details.recursive.interval*1000)  
        res.json({
            "msg":"Successfully started"
        })
              
    }
    if(details.instant){
        Instant(details).then(()=>{
            return res.json({
                "msg":"Mail sent successfully"
            })
        }).catch(err=>{
            return res.json({
                "err":"An error occured while sending a mail"
            })
        }),{scheduled:false}
    }
    
})

module.exports=router