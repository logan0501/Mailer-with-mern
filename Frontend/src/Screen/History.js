import React, { useEffect, useState } from 'react'
import '../Styles/Home.css'
import Navbar from '../Components/Navbar'
import { useHistory } from 'react-router-dom'
import home from '../Assets/home.svg'
import history from '../Assets/history.svg'
import DOMPurify from 'dompurify';
function History() {
    const his = useHistory()
    const [data, setdata] = useState([])
    const createMarkup = (html) => {
        return  {
          __html: DOMPurify.sanitize(html)
        }
      }
    useEffect(() => {
        var mail = JSON.parse(localStorage.getItem("user")).user.mail
        fetch('/mails', {
            method: "POST",
            headers: {
                "content-type": "application/json"
            }
            , body: JSON.stringify({
                mailer: mail
            })
        }).then(res => res.json()).then(data => {
            console.log(data)
            setdata(data.msg)
        }).catch(err => {
            alert(err.message)
        })
    }, [])
    return (
        <div >
            <Navbar />
            <nav class="sidebar">

                <img src={home} height={20} width={20} onClick={() => his.push("/")} />
                <img src={history} height={20} width={20} />
            </nav>
            <div className="card">
                <div className="text-title">
                    History
                </div>

                <div className="cards">
                    {data.length > 0 &&
                        data.map(datum => {
                            return (
                                <div className="card-min">
                                    <div >
                                        Recipients:{datum.to.join(",")}
                    </div>
                                    <div>
                                        CC:{datum.cc}
                    </div>
                                    <div>
                                        SS:
                    </div>
                                    <div>
                                        Subject:{datum.subject}
                    </div>
                                    <div style={{fontSize:"24px" }}>Body</div>
                                    <div style={{padding:"10px"}}dangerouslySetInnerHTML={createMarkup(datum.html)}>
                                        
                    </div>
                                    <div class="bottom-bar">
                                        {!datum.instant && <div>Scheduled:</div>}
                                        
                                    </div>
                                </div>
                            )

                        })
                    }
                </div>

            </div>

        </div>
    )
}

export default History
