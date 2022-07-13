import { addDoc, collection, doc, onSnapshot, query, Timestamp, where  , orderBy} from "firebase/firestore";
import React,{useEffect} from "react";
import { useState } from "react";
import { auth, db , storage} from "../firebase";
import {User} from "../Component/user"
import "../style/home.css"
import {Message} from "../Component/messageForm"
import { ref , getDownloadURL , uploadBytes } from "firebase/storage"
import {UserMsg} from "../Component/messages"

export const Home = () => {

    const [users , setUsers] = useState([])
    const [chat , setChat] = useState("")
    const [text , setText] = useState("")
    const [img , setImage] = useState("")
    const [msgs , setMsgs] = useState([])
 
    const user1 = auth.currentUser.uid

    useEffect(() => {

        const userRef = collection(db , "users")
        // query object

        const q = query(userRef, where("uid" , "not-in" , [user1]))
        const unsub = onSnapshot(q, querySnapshot => {
            let users = []
            querySnapshot.forEach(doc => {
                users.push(doc.data())
            })
            setUsers(users)
        })

    },[])

    console.log(users)

    const selectUser = (user) => {
        setChat(user)

        const user2 = user.uid
        const id = user1 > user2 ? `${user1+user2}` : `${user2+user1}`;

        const msgRef = collection(db, "message" , id, "chat")
        const q = query(msgRef ,orderBy("createdAt" , "asc"))

        onSnapshot(q , querySnapshot => {
            let msgs =[]
            querySnapshot.forEach(doc => {
                msgs.push(doc.data())
            })
            setMsgs(msgs)
        })
    }   
    console.log("message" , msgs)

    const handelSubmit = async (e) => {
        e.preventDefault()

        const user2 = chat.uid;

        const id = user1 > user2 ? `${user1+user2}` : `${user2+user1}`;

        let url;

        if(img){
            const imgRef = ref(
                storage , 
                `images/${new Date().getTime()} - ${img.name}`
            );
            const snap = await uploadBytes(imgRef , img)
            const dlurl = await getDownloadURL(ref(storage , snap.ref.fullPath))
            url = dlurl    
        }
   

        

        await addDoc(collection(db , "messages", id , "chat"), {
            text,
            from : user1,
            to: user2,
            createdAt: Timestamp.fromDate(new Date()), 
            media: url || "",
        }); 
        setText("")
    }

    return(
        <div className="home_div">
            <div className="users_div">
                {users.map(user => <User Key={user.uid} user={user} selectUser={selectUser} />)}

            </div>

            <div className="message_div">
                {chat ? 
                    (
                        <>
                            <div className="user_message">
                                <h3>
                                    {chat.name}
                                </h3>
                            </div>

                            <div className="messages">
                                {msgs.length ? msgs.map((msg, i) => <UserMsg  key={i}  msg={msg}/>): null}
                            </div>

                            <Message  
                             handelSubmit={handelSubmit} 
                             text={text}
                             setText={setText}   
                             setImage={setImage}
                            />
                        </>
                    ) : (
                        <h3 className="no_con">Select a user start conversation </h3>
                    )    
                }
            </div>
          
        </div>
    )
}