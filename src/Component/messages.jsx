import React, {useRef , useEffect} from "react";
import Moment from "react-moment"
import "../style/userMsg.css"



export const UserMsg = ({msg , user1}) => {

    const scroll = useRef();

    useEffect(() => {


        scroll.current?.scrollIntoView({ behavior: "smooth" });
    },[msg])

    return(
        <div className= {`msg_wrapper ${msg.from === user1  ? "own" : "" }`} 
             ref={scroll} >
            <p className={msg.from === user1 ? "me" : "friend"}>
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

