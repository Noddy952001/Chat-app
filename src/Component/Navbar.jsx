import React , {useContext} from "react";
import { Link } from "react-router-dom";
import "../style/chat.css"
import { db , auth } from "../firebase";
import {signOut} from "firebase/auth"
import {updateDoc,doc} from "firebase/firestore"
import { AuthContext } from "../context/auth";
import { useNavigate } from "react-router-dom";


export  const Chat = () => {

        const Navigate = useNavigate()
    // const {user} = useContext(AuthContext);
    const handelSignOut = async () => {
        await updateDoc(doc(db , "users" , auth.currentUser.uid ), {
            isOnline : false,
        });
        await signOut(auth);
        Navigate("/login")
    }

    return(
        <nav className="main_div">
            <h3 id="Messenger">
             <Link to={"/"}>
                Messenger
                
                </Link> 
            </h3>

            <div className="sec_div">   
                { auth.currentUser ? (
                    <>
                        <Link to={"/messenger"}>Profile</Link> 
                        <button
                            onClick={handelSignOut}
                        > 
                            Logout    
                        </button>
                    </>
                ) : (
                    <>
                        <Link to={"/register"}>Register</Link> 
                        <Link to={"/login"}>Login</Link> 
                    </>
                ) }
            </div>
        </nav>
    )
}