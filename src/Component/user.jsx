import React from "react";
import Img from "../vikas.jpg"
import "../style/user.css"
import { useState } from "react";
import { useEffect } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";


export const User = ({user ,selectUser , user1}) => {

    const user2 = user?.uid
    const [data ,setData] = useState("")

    useEffect(() => {
        const id  = user1 > user2 ? `${user1+user2}` : `${user2+user1}`
        let unsub = onSnapshot(doc(db, "lastMsg" , id ) , (doc) => {
            setData(doc.data());
        })
        return () => unsub()
    },[])
    
    // console.log(data)
    return(
        <div className="user_wrapper"
            onClick={() => selectUser(user)}
        >
            <div className="user_info">
                <div className="user_detail">
                    <img src={user.avatar || Img} alt="Not found"  className="avatar"/>
                    <h4>{user.name}</h4>
                    {data?.from !== user1  && data?.unread && (
                        <small className="unread"> New </small>
                    )}
                </div>
                <div 
                    className={`user_status  ${user.isOnline ? "online" : "offline" }`}>
                 
                </div>

            </div>
        </div>
    )
}