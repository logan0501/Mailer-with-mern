const nodemailer=require('nodemailer')
const cron=require('node-cron')

function Instant(details){
    return new Promise((resolve,reject)=>{
        let mailoptions={
            from:details.from,
            to:details.to,
            text:details.body,
            subject:details.subject,
            html:details.html        
        }
        console.log(mailoptions)
        let transporter=nodemailer.createTransport({
            service:"gmail",
            auth:{
                user : details.from,
                pass : details.password
            }
        })
        transporter.sendMail(mailoptions,(err,info)=>{
            if(err){
                console.log("error")
                reject(err)
            }
            resolve("Sent successfully")
        })
    })
}
function sendMail(details){
    cron.schedule("* * * * *",()=>{
        return new Promise((resolve, reject)=>{
            let mailoptions={
                from:details.from,
                to:details.to,
                text:details.body,
                subject:details.subject,
                html:details.html        
            }
            console.log(mailoptions)
            let transporter=nodemailer.createTransport({
                service:"gmail",
                auth:{
                    user : details.from,
                    pass : details.password
                }
            })
        
            transporter.sendMail(mailoptions,(err,info)=>{
                if(err){
                    console.log("error")
                    reject(err)
                }
                resolve("Sent successfully")
            })
        })
    })
   

}

module.exports={
    Instant,sendMail
}