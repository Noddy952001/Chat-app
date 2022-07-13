import React from "react";
import {Moment} from "react-moment"
import "../style/message.css"


export const UserMsg = ({msg}) => {
    return(
        <div className="msg_wrapper">
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