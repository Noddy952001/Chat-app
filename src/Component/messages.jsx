import React from "react";
import Moment from "react-moment"
import "../style/userMsg.css"


export const UserMsg = ({msg , user1}) => {

    return(
        <div className= {`msg_wrapper ${msg.from === user1} `}  >

            <h1>  vikasd</h1>
            <p>
                {msg.media ? <img src={msg.media} alt={msg.text} /> : null}
                {msg.text}
                <br />
                <small>
                    <Moment fromNow>{msg.createdAt.toDate()}</Moment>
                </small>

              
            </p>
        </div>
    )
}