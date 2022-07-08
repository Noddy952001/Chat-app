import React, { useState } from "react"
import { Link } from "react-router-dom"
import { createUserWithEmailAndPassword } from "firebase/auth"
import {setDoc , doc , Timestamp} from "firebase/firestore"
import { auth , db } from "../firebase"
import { useNavigate } from "react-router-dom";

 
export const Register = () => {

    const navigate = useNavigate();

    const [data , setData] = useState({
        name : "",
        email : "",
        password : "",
        error : null,
        loading : false
    })
    const {name , email , password , error , loading }  = data

    const hadelSubmit = async (event) => {
        event.preventDefault()

        setData({...data , error:null , loading:true});
        if(!name || !email || !password){
          setData({...data , error : "All fields are required ?"})
        }
        try{
            const result = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            )
            console.log(result.user)  

            await setDoc(doc(db , 'users' , result.user.uid),{
                 uid : result.user.uid,
                 name,
                 email,
                 createdAt:Timestamp.fromDate(new Date()),
                 isOnline : true,
            });

            setData({
                name: "" ,
                email: "" , 
                password: "" , 
                error: null , 
                loading:false
            });

            navigate("/");
            
        }catch(err){
            setData({...data , error : err.message , loading:false});
        }
    }

    const HandelChange = (e) => {
        setData({...data, [e.target.name]  : e.target.value})
    }

    return(
        <div>

            <div style={{
                    margin : "auto",
                    backgroundColor : "black",
                    width : "450px",
                    height : "400px",
                    borderRadius : "10px"
                }}>

                <h1 
                    style={{
                        color : "white" , 
                        textAlign : "center"
                    }}>
                    Create An account
                </h1>

                <form action="">
                    <label 
                        style={{
                            color : "white" , 
                            marginLeft :"40px"
                        }}> User name 
                    </label> <br />

                    <input 
                        style={{
                            backgroundColor : "black" ,
                            color:"white" , 
                            borderColor : "white" , 
                            borderRadius : "10px" , 
                            width : "80%" ,
                            height:"30px",
                            marginLeft :"40px"
                        }} 
                        type="text" 
                        placeholder="Enter name" 
                        name="name"
                        value={name}
                        onChange={HandelChange}

                    /> <br /><br />

                    <label 
                        style={{
                            color : "white" , 
                            marginLeft :"40px"
                        }}> 
                        User e-mail 
                    </label> <br />

                    <input 
                        style={{
                            backgroundColor : "black" ,
                            color:"white" , 
                            borderColor : "white" , 
                            borderRadius : "10px" , 
                            width : "80%" ,
                            height:"30px",
                            marginLeft:"40px"
                        }} 
                        type="text" 
                        placeholder="enter email" 
                        name="email"
                        value={email}
                        onChange={HandelChange}
                        /> <br /><br />

                        <label 
                            style={{
                                color : "white" , 
                                marginLeft :"40px"
                            }}>User password 
                        </label> <br />
                        <input 
                            style={{
                                backgroundColor : "black" ,
                                color:"white" , 
                                borderColor : "white" , 
                                borderRadius : "10px" , 
                                width : "80%" ,
                                height:"30px",
                                marginLeft:"40px"
                            }} 
                            type="text" 
                            placeholder="enter password" 
                            name="password"
                            value={password}
                            onChange={HandelChange}
                        /><br /><br />

                        <>
                      {error ? <p className="error_div"> {error }</p> : null}    
                       </>

                            
                    <button 
                        style={{
                            backgroundColor : "green" ,
                            borderColor : "none" ,  
                            color : "white" , 
                            borderRadius : "10px" , 
                            width : "20%" ,
                            height:"30px",
                            marginLeft:"40%"
                        }}
                        onClick={hadelSubmit}
                    >
                    {loading ? "Creating..." : "Register"}

                    </button>

                        
                </form>

                
            </div>

            
        </div>
    )
}


